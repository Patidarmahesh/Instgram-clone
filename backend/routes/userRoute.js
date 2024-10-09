import express from "express";
import {
  editProfile,
  followAndUnfollow,
  getProfile,
  getSuggestedUser,
  login,
  logout,
  register,
  searchByKeyword,
} from "../controllers/user.controller.js";
import userAuth from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";

const userRoute = express.Router();

userRoute.route("/register").post(register);
userRoute.route("/login").post(login);
userRoute.route("/logout").get(logout);
userRoute.route("/:id/profile").get(userAuth, getProfile);
userRoute.route("/profile/edit").put(userAuth, upload.single("profilePicture"), editProfile);
userRoute.route("/suggested").get(userAuth, getSuggestedUser);
userRoute.route("/followunfollow/:_id").post(userAuth, followAndUnfollow);
userRoute.route("/search/:keyword").get(userAuth, searchByKeyword);

export default userRoute;
