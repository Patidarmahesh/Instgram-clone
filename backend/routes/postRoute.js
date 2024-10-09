import express from 'express'
import userAuth from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';
import { addAndRemoveBookmarkPost, addComment, createPost, deleteComment, deletePost, dislikePost, getAllPost, getCommentOfPost, getUserPost, likePost, updateComment } from '../controllers/post.controller.js';

const postRoute = express.Router();

postRoute.route("/createpost").post(userAuth,upload.single("image"),createPost)
postRoute.route("/getallpost").get(userAuth,getAllPost)
postRoute.route("/userpost/all").get(userAuth,getUserPost)
postRoute.route("/:id/like").get(userAuth,likePost)
postRoute.route("/:id/dislike").get(userAuth,dislikePost)
postRoute.route("/:id/addcomment").post(userAuth,addComment)
postRoute.route("/:id/deletecomment").delete(userAuth,deleteComment)
postRoute.route("/:id/updatecomment").put(userAuth,updateComment)
postRoute.route("/:id/getcommentpost").get(userAuth,getCommentOfPost)
postRoute.route("/deletePost/:id").delete(userAuth,deletePost)
postRoute.route("/:id/bookmark").post(userAuth,addAndRemoveBookmarkPost)

export default postRoute