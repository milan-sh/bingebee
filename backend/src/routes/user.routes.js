import { Router } from "express";
import {
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
  getWatchHistory,
  addVideoToWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

//all the user related will be here so main file won't be clumsy
const router = Router();

/*
.fields(fields)
Accept a mix of files, specified by fields. An object with arrays of files will be stored in req.files.

fields should be an array of objects with name and optionally a maxCount
*/
router.route("/register").post(
  //adding a middleware for handling files on this route
  upload.fields([
    {
      name: "avatar",
      maxCount: 1, //value of maximum files can user upload
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  regsiterUser
);

router.route("/login").post(loginUser);

//secured routes
// checking the user has JWT or not using we have created middlware
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

//.single(fieldname) -> Accept a single file with the name fieldname. The single file will be stored in req.file
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)
router.route("/history/:videoId").patch(verifyJWT, addVideoToWatchHistory)

export default router;
