import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Like} from "../models/like.model.js"

const toggleVideoLike = asyncHandler(async(req, res)=>{
    const {videoId} = req.params

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid video Id")
    }

    const alreadyLiked = await Like.findOne({
        likedBy: req.user?._id,
        video: videoId
    })

    if(alreadyLiked){
        await Like.findByIdAndDelete(alreadyLiked._id)
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            "removed video like "
        ))
    }
    
    await Like.create({
        video: videoId,
        likedBy: req.user?._id
    })

    return res
    .status(201)
    .json(new ApiResponse(
        201,
        {},
        "video liked successfully"
    ))
})

const toggleCommentLike = asyncHandler(async(req, res)=>{
    const {commentId} = req.params

    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid comment Id")
    }

    const alreadyLiked = await Like.findOne({
        likedBy: req.user?._id,
        comment: commentId
    })

    if(alreadyLiked){
        await Like.findByIdAndDelete(alreadyLiked._id)
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            "removed comment like "
        ))
    }
    
    await Like.create({
        comment: commentId,
        likedBy: req.user?._id
    })

    return res
    .status(201)
    .json(new ApiResponse(
        201,
        {},
        "comment liked successfully"
    ))
})

const toggleTweetLike = asyncHandler(async(req, res)=>{
    const {tweetId} = req.params

    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "Invalid tweet Id")
    }

    const alreadyLiked = await Like.findOne({
        likedBy: req.user?._id,
        tweet: tweetId
    })

    if(alreadyLiked){
        await Like.findByIdAndDelete(alreadyLiked._id)
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {},
            "removed tweet like "
        ))
    }
    
    await Like.create({
        tweet: tweetId,
        likedBy: req.user?._id
    })

    return res
    .status(201)
    .json(new ApiResponse(
        201,
        {},
        "tweet liked successfully"
    ))
})

const getLikedVideos = asyncHandler(async(req, res)=>{

    const userId = req.user?._id
    if(!userId){
        throw new ApiError(401, "Unauthorized access")
    }

    const LikedVideosList = await Like.aggregate([
        {
            $match:{
                likedBy: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:"videos",
                localField:"video",
                foreignField:"_id",
                as:"LikedVideos"
            }
        },
        {
            $unwind:"$LikedVideos"
        },
        {
            $project:{
                _id: 1,
                thumbnail:"$LikedVideos.thumbnail", //access nested fields
                title:"$LikedVideos.title",
                videoFile:"$LikedVideos.videoFile",
                duration:"$LikedVideos.duration"
            }
        }
    ])

    if(!LikedVideosList.length){
        throw new ApiError(404, "No Liked videos found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200, 
        LikedVideosList,
        "Liked videos list fetched successfully"
    ))
})


export {toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos}