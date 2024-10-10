import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/postModel.js";
import { User } from "../models/userModel.js";
import { Comment } from "../models/commentModel.js";
import sharp from "sharp";
import { getReciverSocketId, io } from "../socket/socket.js";

export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;
    if (!image) {
      return res.status(401).json({
        message: "Image is required!",
      });
    }

    // image upload

    const imageBufferValue = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    //buffer convert data uri

    const fileUri = `data:image/jpeg;base64,${imageBufferValue.toString(
      "base64"
    )}`;
    
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      // image: "https://i.ebayimg.com/images/g/Au0AAOSwg2ZjVLgr/s-l1200.jpg",
      image: cloudResponse.secure_url,
      author: authorId,
    });
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }
    await post.populate({ path: "author", select: "-password" });
    return res.status(200).json({
      message: "Post is created!",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "userName profilePicture" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "userName profilePicture",
        },
      });
    if (posts) {
      return res.status(200).json({
        message: "Get all post!",
        success: true,
        posts,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "userName profilePicture",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "userName profilePicture",
        },
      });
    if (posts) {
      return res.status(200).json({
        message: "Get all post!",
        success: true,
        posts,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const likeKarnewalaUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        message: "Post not found!",
        success: true,
      });
    }
    // start like logic
    await post.updateOne({ $addToSet: { likes: likeKarnewalaUser } });
    await post.save();

    // implement socket io
    const user = await User.findById(likeKarnewalaUser).select(
      "userName profilePicture"
    );
    const postAutherId = post.author.toString();
    if (postAutherId !== likeKarnewalaUser) {
      // notification
      const notification = {
        type: "like",
        userId: likeKarnewalaUser,
        userDetails: user,
        postId,
        message: "Youre Post Is Liked",
      };

      const postOwnerSocketId = getReciverSocketId(postAutherId);
      if (postOwnerSocketId) {
        io.to(postOwnerSocketId).emit("notification", notification);
      }
    }
    return res.status(200).json({
      message: "Like added successfull!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const dislikeKarnewalaUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(200).json({
        message: "Post not found!",
        success: true,
      });
    }
    // start like logic
    await post.updateOne({ $pull: { likes: dislikeKarnewalaUser } });
    await post.save();

    // implement socket io
    const user = await User.findById(dislikeKarnewalaUser).select(
      "userName profilePicture"
    );
    const postAutherId = post.author.toString();
    if (postAutherId !== dislikeKarnewalaUser) {
      // notification
      const notification = {
        type: "dislike",
        userId: dislikeKarnewalaUser,
        userDetails: user,
        postId,
        message: "Youre Post Is Disliked",
      };

      const postOwnerSocketId = getReciverSocketId(postAutherId);
      if (postOwnerSocketId) {
        io.to(postOwnerSocketId).emit("notification", notification);
      }
    }

    return res.status(200).json({
      message: "Like remove successfull!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const kisneCommentKiyaHai = req.id;
    const { text } = req.body;

    const post = await Post.findById(postId);
    if (!text) {
      return res.status(400).json({
        message: "Text is required!",
        success: true,
      });
    }
    const comment = await Comment.create({
      text,
      author: kisneCommentKiyaHai,
      post: postId,
    });
    await comment.populate([
      { path: "author", select: "userName profilePicture" },
    ]);
    post.comments.push(comment._id);
    await post.save();
    return res.status(200).json({
      message: "Comment added successfull!",
      success: true,
      comment,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const authorId = req.id;
    console.log(commentId);
    const comment = await Comment.findById(commentId).populate({
      path: "author",
    });
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found!",
        success: false,
      });
    }
    if (comment.author[0]._id.toString() != authorId) {
      return res.status(403).json({
        message: "Please delete youre comments!",
        success: false,
      });
    }
    await Comment.findByIdAndDelete(commentId);
    // remove cooment id post document
    let post = await Post.findById(comment?.post.toString());

    post.comments = post.comments.filter((id) => id.toString() != commentId);
    await post.save();
    return res.status(200).json({
      message: "comment deleted!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const authorId = req.id;
    const { text } = req.body;
    const comment = await Comment.findById(commentId).populate({
      path: "author",
    });
    if (!text) {
      return res.status(401).json({
        message: "comment is required",
        success: false,
      });
    }
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found!",
        success: false,
      });
    }
    if (comment.author[0]._id.toString() != authorId) {
      return res.status(403).json({
        message: "Please update youre comments!",
        success: false,
      });
    }
    await Comment.findByIdAndUpdate(commentId, { text: text });
    return res.status(200).json({
      message: "comment update!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate({
      path: "author",
      select: "userName profilePicture",
    });
    if (!comments) {
      return res.status(200).json({
        message: "No comments found!",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Get post comments!",
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
        success: false,
      });
    }
    if (post.author.toString() != authorId) {
      return res.status(403).json({
        message: "Unauthorised User!",
        success: false,
      });
    }
    await Post.findByIdAndDelete(postId);
    // remove post id from user post
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() != postId);
    await user.save();
    // delete user all comment
    await Comment.deleteMany({ post: postId });
    return res.status(200).json({
      message: "Post deleted!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addAndRemoveBookmarkPost = async (req, res) => {
  try {
    const authorId = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
        success: false,
      });
    }
    const user = await User.findById(authorId);
    if (user.bookMarks.includes(post._id)) {
      // already bookmark => remove bookmark
      await user.updateOne({ $pull: { bookMarks: post._id } });
      await user.save();
      return res.status(200).json({
        message: "Remove bookmark!",
        success: true,
        type: "unsaved",
      });
    } else {
      // bookmark => add bookmark
      await user.updateOne({ $addToSet: { bookMarks: post._id } });
      await user.save();
      return res.status(200).json({
        message: "Add bookmark!",
        success: true,
        type: "saved",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
