import { Router } from "express";
import {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  getPublicVideos,
  addVideoView,
  getcahnnelVideos
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Public route (no verifyJWT)
router.route("/videos").get(getPublicVideos);

// Protected routes (with verifyJWT)
router.route("/").get(verifyJWT, getAllVideos);
router.route("/").post(
  verifyJWT,
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.route("/:videoId").get(verifyJWT, getVideoById);
router.route("/videos/:channelId").get(verifyJWT, getcahnnelVideos)
router.route("/addView/:videoId").patch(verifyJWT, addVideoView)
router.route("/:videoId").patch(verifyJWT, upload.single("thumbnail"), updateVideo);
router.route("/:videoId").delete(verifyJWT, deleteVideo);
router.route("/toggle/publish/:videoId").patch(verifyJWT, togglePublishStatus);

export default router;