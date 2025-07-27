import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { deleteFromCloudinary } from "../utils/destroyCloudinaryUrl.js";

const getPublicVideos = asyncHandler(async(req, res)=>{
  const videos = await Video.find({
    isPublished:true
  }).sort('-createdAt') // Newest first
  .populate({
    path: 'owner',
    select: 'username avatar' // Only include necessary owner fields
  })
  .lean(); // Convert to plain JS objects for better performance

  if(!videos.length){
    throw new ApiError(404, "No video found")
  }

  return res 
  .status(200)
  .json(new ApiResponse(
    200,
    videos,
    "fetched all public videos"
  ))
})

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
  } = req.query;

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    throw new ApiError(400, "Invalid page or limit value");
  }

  if (!req.user) {
    throw new ApiError(401, "Unauthorized Access");
  }
  const userId = req.user?._id;
  const match = {
    ...(query ? { title: { $regex: query, $options: "i" } } : {}), //If query exists, match titles that contain the search term (case-insensitive)
    ...(userId ? { owner: new mongoose.Types.ObjectId(userId) } : {}), //If userId exists, filter videos by that owner
    //spread the filter in the condition is true
  };
  const videos = await Video.aggregate([
    {
      $match: match,
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "videosOwner",
      },
    },
    {
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
        isPublished: 1,
        createdAt:1,
        owner: {
          $first: "$videosOwner", // Extracts the first user object from the array
        },
      },
    },
    {
      $sort: {
        [sortBy]: sortType === "desc" ? -1 : 1, //taking the dynamic field name on which we are sorting
        //and if sortType is desc then make it in descending otherwise is ascending order
      },
    },
    {
      $skip: (page - 1) * parseInt(limit), //skipping records for pagination
    },
    {
      $limit: parseInt(limit), //limits the number of results per page
    },
  ]);

  if (!videos.length) {
    throw new ApiError(404, "No videos found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "All videos fetched successfully"));
});

const publishAVideo = asyncHandler(async(req, res)=>{

    //logic
    //getting all the required info
    //checking if these fields are not empty
    //taking out the video and thumbnail local url
    //uploading them to cloudinary
    //taking the duration from cloudinary of video
    //creating an entry into db
    //sending res
    
    const { title, description} = req.body

    if(!title?.trim() && !description?.trim()){
        throw new ApiError(400, "title and description is required")
    }

    const videoFileLocalPath = req.files?.videoFile[0]?.path

    if(!videoFileLocalPath){
        throw new ApiError(400, "video file is required")
    }

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    if(!thumbnailLocalPath){
        throw new ApiError(400, "thumbail file is required")
    }

    const videoFile = await uploadOnCloudinary(videoFileLocalPath)
    if(!videoFile){
        throw new ApiError(400, "error when uploading video")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    if(!thumbnail){
        throw new ApiError(400, "error when uploading thumbnail")
    }

    const duration = await videoFile.duration

    const video = await Video.create({
      videoFile:videoFile.url,
      thumbnail: thumbnail.url,
      title,
      description:description,
      duration: duration,
      views:0,
      isPublished:true,
      owner: req.user?._id
    })

    if(!video){
      throw new ApiError(500, "something went wrong while creating video")
    }

    return res
    .status(201)
    .json(new ApiResponse(
      200,
      video,
      "Video pulished succesfully"
    ))

})

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if(!videoId){
    throw new ApiError(400, "No video found")
  }

  const video = await Video.findById(videoId)

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    video,
    "Video fetched successfully"
  ))

})

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params
  const {title, description} = req.body
  
  if(!videoId){
    throw new ApiError(400, "no video found")
  }
  
  if(!title.trim() || !description.trim()){
    throw new ApiError(400, "title or description required")
  }

  const thumbnailLocalPath = req.file?.path
  if(!thumbnailLocalPath){
    throw new ApiError(400, "Thumbnail file is required")
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

  if(!thumbnail.url){
    throw new ApiError(400, "Error while uploading thumbnail")
  }

  const existedVideoThumbnail = await Video.findById(videoId)
  await deleteFromCloudinary(existedVideoThumbnail?.thumbnail)

    
  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set:{
        title,
        description,
        thumbnail: thumbnail.url
      }
    },
    {
      new:true
    }
  )

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    video,
    "Video updated succcessfully"
  ))
})

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if(!videoId){
    throw new ApiError(400, "no video found")
  }
  const video = await Video.findById(videoId)
  if(!video){
    throw new ApiError(404, "no video found")
  }
  await deleteFromCloudinary(video?.videoFile)  //deleting video from cloudinary
  await deleteFromCloudinary(video?.thumbnail) //deleting thumbnail from cloudinary 

  await Video.findByIdAndDelete(videoId) //deleting video from db
  return res
  .status(200)
  .json(new ApiResponse(
    200,
    {},
    "Video deleted successfully"
  ))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params

  if(!videoId){
    throw new ApiError(400, "No vide found")
  }

  const video = await Video.findByIdAndUpdate(
    videoId,
    [
      {
        $set: {
          isPublished: { $not: "$isPublished" }
        }
      }
    ],
    { new: true }
  );
  

  if(!video){
    throw new ApiError(404, "No video found")
  }

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    video,
    "video publish toggle succesfully"
  ))

  


})

export { getAllVideos,publishAVideo, getVideoById, updateVideo, deleteVideo, togglePublishStatus, getPublicVideos };
