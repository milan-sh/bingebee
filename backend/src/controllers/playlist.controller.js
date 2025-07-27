import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Playlist } from "../models/playlist.model.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name?.trim() && !description?.trim()) {
    throw new ApiError(400, "name and description required");
  }

  const playlist = await Playlist.create({
    name,
    description,
    owner: req.user?._id,
  });

  if (!playlist) {
    throw new ApiError(400, "Error when creating playlist");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, playlist, "playlist created succesfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlist Id");
  }

  const playlist = await Playlist.findById({
    _id: new mongoose.Types.ObjectId(playlistId),
  });

  if (!playlist.lenght === 0) {
    throw new ApiError(400, "No playlist found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "fetched playlsit successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid user Id");
  }

  const playlists = await Playlist.find({ owner: userId });

  if (!playlists && playlists.lenght === 0) {
    throw new ApiError(400, "No plyalist found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlists, "all plylists fetched succssfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!isValidObjectId(playlistId) && !isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid playlistId or videoId");
  }

  const updatedPlaylist = await Playlist.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(playlistId),
      },
    },
    {
      $addFields: {
        videos: {
          $setUnion: ["$videos", [new mongoose.Types.ObjectId(videoId)]], //ensure unique videos
        },
      },
    },
    {
      $merge: {
        into: "playlists", //update the existing playlist collection
      },
    },
  ]);

  if (!updatedPlaylist) {
    throw new ApiError(
      404,
      "Playlist not found or video is already in playlist"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPlaylist,
        "video added to playlist successfully"
      )
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  if(!isValidObjectId(videoId) && !isValidObjectId(playlistId)){
    throw new ApiError(400, "videoId or PlaylistId is not correct")
  }

  const removedVideoPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
        $pull:{
            videos : new mongoose.Types.ObjectId(videoId)
        }
    },
    {
        new: true
    }
  )

  if(!removedVideoPlaylist){
    throw new ApiError(400, "can't find video in playlist")
  }

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    removedVideoPlaylist,
    "video removed from playlist succesfully"
  ))
});

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params

    if(!isValidObjectId(playlistId)){
        throw new ApiError(400, "Invalid playlistId")
    }

    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)

    if(!deletedPlaylist){
        throw new ApiError(404, "No playlist found")
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        [],
        "palylist deleted successfully"
    ))
})

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if(!isValidObjectId(playlistId)){
    throw new ApiError(400, "Invalid playlist Id")
  }

  if(!name?.trim() && !description?.trim()){
    throw new ApiError(400, "name and description is required")
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
        $set:{
            name,
            description
        }
    },
    {
        new:true
    }
  )

  if(!updatedPlaylist){
    throw new ApiError(400, "playlist not found or can't update now")
  }

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    updatedPlaylist,
    "playlist update successfully"
  ))
});

export {
  createPlaylist,
  getPlaylistById,
  getUserPlaylists,
  addVideoToPlaylist,
  updatePlaylist,
  deletePlaylist,
  removeVideoFromPlaylist,
};
