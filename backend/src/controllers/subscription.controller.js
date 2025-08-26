import { isValidObjectId } from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel Id");
  }

  const userId = req.user?._id;

  if (channelId.toString() === userId.toString()) {
    throw new ApiError(400, "you can't subscribe to your own channel");
  }

  const isSubscriber = await Subscription.findOne({
    subscriber: userId,
    channel: channelId,
  });

  console.log(isSubscriber);
  if (isSubscriber) {
    await Subscription.findByIdAndDelete(isSubscriber._id);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "channel unsubscribe successfully"));
  }

  await Subscription.create({
    subscriber: userId,
    channel: channelId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "channel subscribe successfully"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid channel id");
  }

  const subscribers = await Subscription.find({
    channel: channelId,
  }).populate("subscriber", "_id fullName email");

  if (!subscribers) {
    throw new ApiError(400, "channel does not exists");
  }

  if (subscribers.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "No subscriber found."));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers, "subscribers list fetched successfully")
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  if (!isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  const channels = await Subscription.find({
    subscriber: subscriberId,
  }).populate("channel", "_id fullName email");

  if (channels.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "no subscribed channel"));
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        channels,
        "subscriber channel list fetched successfully"
      )
    );
});

const isSubscribed = asyncHandler(async(req, res)=>{
  const {channelId} = req.params;
  const userId = req?.user?._id;

  if (channelId.toString() === userId.toString()) {
    throw new ApiError(400, "you can't subscribe to your own channel");
  }

  const isSubscriber = await Subscription.findOne({
    subscriber: userId,
    channel: channelId,
  });

  if(isSubscriber){
    return res
    .status(200)
    .json(new ApiResponse(
      200,
      {status:true},
      "Subscribed status fetched successfully"
    ))
  }

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    {status:false}
  ))

})

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels, isSubscribed };
