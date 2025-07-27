import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid video Id")
    }

    const comments = await Comment.aggregate([
        {
            $match:{
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup:{
                from: "videos",
                localField:"video",
                foreignField:"_id",
                as: "commentedOnVideo"
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"commentOwner"
            }
        },
        {
            $project:{
                content:1,
                owner: {
                    $first: "$commentOwner"
                },
                video:{
                    $first: "$commentedOnVideo"
                },
                createdAt:1
            }
        },
        {
            $skip: (page-1) * parseInt(limit)
        },
        {
            $limit:parseInt(limit)
        }
    ])

    if(!comments.length){
        throw new ApiError(404, "comments are not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        comments,
        "comments fetched successfully"
    ))
})


const addComment = asyncHandler(async(req, res)=>{
    const {videoId} = req.params
    const {content} = req.body

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid video Id")
    }

    if(!content?.trim()){
        throw new ApiError(400, "comment content is reqired")
    }

    const comment = await Comment.create(
        {
            content,
            video: videoId,
            owner: req.user?._id
        }
    )

    if(!comment){
        throw new ApiError(400, "can't add comment")
    }

    return res
    .status(201)
    .json(new ApiResponse(
        201,
        comment,
        "successfully added comment"
    ))
})

const updateComment = asyncHandler(async(req, res)=>{
    const {commentId} = req.params
    const {content} = req.body

    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid comment Id")
    }

    if(!content?.trim()){
        throw new ApiError(400, "content is required to update")
    }

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set :{
                content
            }
        },
        {
            new:true
        }
    )

    if(!updatedComment){
        throw new ApiError(404, "no comment found or can't update")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200, 
        updatedComment,
        "comment updated successfully"
    ))
})

const deleteComment = asyncHandler(async(req, res)=>{
    const {commentId} = req.params

    if(!isValidObjectId(commentId)){
        throw new ApiResponse(400, "Invalid comment Id")
    }

    const deleted = await Comment.findByIdAndDelete(commentId)
    if(!deleted){
        throw new ApiError(404, "no comment found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        {},
        "comment delted successfully"
    ))
})


export {getVideoComments, addComment, updateComment, deleteComment}