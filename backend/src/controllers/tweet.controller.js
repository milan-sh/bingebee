import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.modle.js";

const createTweet = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { content } = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  if (!content?.trim()) {
    throw new ApiError(400, "content is required");
  }

  const tweet = await Tweet.create({
    content,
    owner: userId,
  });

  if (!tweet) {
    throw new ApiError(400, "can't tweet now");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, tweet, "tweet create successully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }

  if (!content?.trim()) {
    throw new ApiError(400, "content is required");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedTweet) {
    throw new ApiError(404, "No tweet found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTweet, "tweet updated successfullly"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid tweet Id");
  }

  const tweet = await Tweet.findByIdAndDelete(tweetId);

  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "tweet delted successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid userId");
  }

  const userTweets = await Tweet.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "TweetOwner",
      },
    },
    {
      $unwind: "$TweetOwner",
    },
    {
      $project: {
        content: 1,
        owner: {
          _id: "$TweetOwner._id",
          fullName:"$TweetOwner.fullName",
          username: "$TweetOwner.username",
          avatar: "$TweetOwner.avatar"
        },
        createdAt:1,
        updatedAt:1
      },
    },
  ]);

  if (!userTweets.length) {
    throw new ApiError(404, "No tweets found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, userTweets, "user's tweets fetched successfully")
    );
});

export { createTweet, updateTweet, deleteTweet, getUserTweets };
