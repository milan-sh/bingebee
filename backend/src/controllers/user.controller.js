import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose, { isValidObjectId } from "mongoose";
import { deleteFromCloudinary } from "../utils/destroyCloudinaryUrl.js";
const generateAcessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAcessToken();
    const refreshToken = user.generateRefreshToken();

    //entering refreshToken in user object
    user.refreshToken = refreshToken;
    //saving into db
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

//this will be main controlled realted to user
//controller means functionality
const regsiterUser = asyncHandler(async (req, res) => {
  //logic
  //get user details form frontend
  //validation not empty
  //check if user already exists: username, email
  //check for images, check for avatar
  //upload then to cloudinar, avatar
  //create a user object - create entry in db
  //remove passowrd and refresh token field from response
  //check for user creation
  //return res

  const { username, email, fullName, password } = req.body;

  //using advance mehtod for checking if any filed is empty
  if (
    //some check for all values if there any field matches the condition it returns true otherwise returns false
    [username, fullName, email, password].some((field) => field?.trim() === "")
  ) {
    //using ApiError class for sending the standard error message
    throw new ApiError(400, "All feilds are required");
  }

  const existedUser = await User.findOne({
    //syntax for filtering with multiple values
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //getting the paths of images form server
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //uploading files on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Something went wrong while uploading avatar");
  }

  //making an entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", //because coverImage is optional
    email,
    password,
    username: username.toLowerCase(),
  });

  //refining data and removing password and refreshtoken so they not to send on frontend
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  //finally sending response with standard response class
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

//login user functionality
const loginUser = asyncHandler(async (req, res) => {
  //req -> data
  //username or email
  //find the user
  //password check
  //access and refresh token
  //send cookie

  const { username, email, password } = req.body;

  //checking the fields
  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  //optional if we want to take any one parameter
  // if(!username || !email){
  //     throw new ApiError(400, "username or email is required");
  // }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  //if no user found
  if (!user) {
    throw new ApiError(404, "user does not exists");
  }

  //checking password is correct or not
  const isPasswordValid = await user.isPasswordCorrect(password);

  // User - This is an object of mongoose and like findOne methods are available only on User
  // user - This is, we're taking from db(instance) so isPasswordCorrect will be available in user as this is our own created method

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAcessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //sending option whether user from frontend can change cookies or not
  const options = {
    httpOnly: true, //security measures to prevent XSS attacks
    secure: true, //ensures cookies are only sent over HTTPS(important for production)
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged In successfully"
      )
    );
});

//logging out user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    //as we have used middlware and there we have added founded user in req so here we can access
    req.user._id,
    {
      $unset: {
        refreshToken: 1, //removes the refreshToken from document
      },
    },
    {
      new: true, //returns the updated document
    }
  );

  const options = {
    httpOnly: true, //security measures to prevent XSS attacks
    secure: true, //ensures cookies are only sent over HTTPS(important for production)
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout successfully"));
});

//generating a new refreshtoken
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expires or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAcessAndRefreshTokens(user?._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Acess token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

//change password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  //can get user because we have used middleware which inject user in request
  const user = await User.findById(req.user?._id);
  //checking the password
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  //updating the password of user object
  user.password = newPassword;
  //removing validate
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

//getting the user
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      //sending user object
      req.user,
      "user fetched successfully"
    )
  );
});

//udpate account details
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

//updating user avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar");
  }

  //deleting existed avatar image from cloudinary
  const existedUser = await User.findById(req.user?._id);
  await deleteFromCloudinary(existedUser?.avatar);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

//updating cover
const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover Image file is missing");
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading cover image");
  }

  //deleting existed cover image from cloudinary
  const existedUser = await User.findById(req.user?._id);
  await deleteFromCloudinary(existedUser?.coverImage);

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully"));
});

//getting userChannelProfile
const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "User name is missing");
  }

  const channel = await User.aggregate([
    {
      $match: { username: username?.toLowerCase() }, //filetring users collection to find requested username
    },
    {
      $lookup: {
        from: "subscriptions", //remember converts into lowercase plural
        localField: "_id",
        foreignField: "channel", //we'll get subscribers from channels
        as: "subscribers",
      },
      //joins with subscriptions collection
      // Finds all doucuments where current user is the channel(gets subscriber)
      //stores result in subscribers array
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber", //we'll get channel from selecting the subscriber
        as: "subscribedTo",
        //joins with subscriptions collection
        //Finds all doucuments where current user is subscriber(get channel they follow)
      },
    },
    {
      $addFields: {
        //calculating subscriber count using array size
        subscribersCount: {
          $size: "$subscribers", //using $ because subscribers is now a field
        },
        //calculating channel subscription count
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
        },
        //deterniming if requesting user subscribed using conditional check
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] }, //checking on subscribers document
            then: true,
            else: false,
          },
        },
      },
    },
    {
      //selecting the fields
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if (!channel?.length) {
    throw new ApiError(404, "channel does not exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "user channel fetched successfully")
    );
});

const addVideoToWatchHistory = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid videoId");
  }

  // Remove if exists
  await User.findByIdAndUpdate(req.user?._id, {
    $pull: { watchHistory: videoId },
  });

  //add to beginning (most recent first)
  await User.findByIdAndUpdate(req.user?._id, {
    $push: {
      watchHistory: { $each: [videoId], $position: 0 },
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "video added to watch history successfully")
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id), //modern approach
        //Always remember we get the _id in string format
        // _id : new mongoose.Types.ObjectId(req.user._id) //deprecated
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        //joins with videos collection using watchHistory array
        //Matches video IDs from user's watchHistory with video_id fields
        //contains a nested pipeline to video processing
        pipeline: [
          {
            //owner lookup for each video
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  //project only specific details
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
          //converts the owner array (from lookup) to a single object
          //take first element since owner llokup should return exactly one user
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "watch history fetched succesfully"
      )
    );
});

export {
  regsiterUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  addVideoToWatchHistory,
  getWatchHistory,
};
