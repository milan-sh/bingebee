import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Comment } from "../models/comment.model.js";
import { Tweet } from "../models/tweet.modle.js";

const getChannelStats = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }

  const totalVideoLikes = await Like.countDocuments({
    video: {
      $in: await Video.find({ owner: userId }).distinct("_id"),
    },
  });

  if (totalVideoLikes === null || totalVideoLikes === undefined) {
    throw new ApiError(
      500,
      "something went wrong when showing total video lies"
    );
  }

  const totalVideoViews = await Video.aggregate([
    {
      $match: {
        owner: userId,
      },
    },
    {
      $group: {
        _id: null,
        totalViews: { $sum: "$views" },
      },
    },
  ]);

  if (totalVideoViews === null || totalVideoViews === undefined) {
    throw new ApiResponse(
      500,
      "something went wrong when dispalying total video views"
    );
  }

  const totalSubscribers = await Subscription.countDocuments({
    channel: userId,
  });

  if (totalSubscribers === null || totalSubscribers === undefined) {
    throw new ApiError(
      500,
      "something went wrong when showing total subscribers"
    );
  }

  const totalVideos = await Video.countDocuments({
    owner: userId,
  });

  if (totalVideos === null || totalVideos === undefined) {
    throw new ApiError(
      500,
      "something went wrong when dispalying total videos"
    );
  }

  const totalCommentLike = await Like.countDocuments({
    comment: {
      $in: await Comment.find({ owner: userId }).distinct("_id"),
    },
  });

  if (totalCommentLike === null || totalCommentLike === undefined) {
    throw new ApiError(
      500,
      "something went wrong when dispalying total comment likes"
    );
  }

  const totalTweetLike = await Like.countDocuments({
    tweet: {
      $in: await Tweet.find({ owner: userId }).distinct("_id"), //distinct is used when we need just unique values from one filed rather than entire field
    },
  });

  if (totalTweetLike === null || totalTweetLike === undefined) {
    throw new ApiError(
      500,
      "something went wrong when dispalying total Tweet likes"
    );
  }

  return res.status(200).json(
    new ApiResponse(200, {
      totalCommentLike,
      totalVideoLikes,
      totalTweetLike,
      totalVideos,
      totalSubscribers,
      toatalViews: totalVideoViews[0]?.totalViews || 0, //showing 0 if no views are found
    })
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized access");
  }
  const videosList = await Video.find({
    owner: userId,
  }).sort({
    createdAt: -1,
  });

  if (!videosList || videosList.length === 0) {
    throw new ApiError(404, "No videos uploaded from this channel");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        videosList,
        "channel video list fetched successfully"
      )
    );
});

export { getChannelStats, getChannelVideos };
