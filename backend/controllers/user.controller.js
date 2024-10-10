import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie-parser";
import { User } from "../models/userModel.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/postModel.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log("hammm", req.body);

    if (!userName || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    const user = await User.findOne({ email })

    if (user) {
      return res.status(401).json({
        message: "Try different email, please!",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: "Account created successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email is not regetser please, try different email!",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Password is wrong, please check password!",
        success: false,
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const poplatePost = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post?.author?.equals(user._id)) {
          return post;
        }
        return null;
      })
    );
    const bookmarkPost = await Promise.all(
      user.bookMarks.map(async (postId) => {
        const bookmark = await Post.findById(postId);
        return bookmark;
      })
    );
    user = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: poplatePost,
      bookMarks: bookmarkPost || [],
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.userName}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    let user = await User.findById(id);
    if (user) {
      const poplatePost = await Promise.all(
        user.posts.map(async (postId) => {
          const post = await Post.findById(postId);
          if (post?.author?.equals(user._id)) {
            return post;
          }
          return null;
        })
      );
      const bookmarkPost = await Promise.all(
        user.bookMarks.map(async (postId) => {
          const bookmark = await Post.findById(postId);
          return bookmark;
        })
      );
      user = {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        posts: poplatePost,
        bookMarks: bookmarkPost || [],
      };
      return res.status(200).json({
        user,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender, currentpassword, confirmPassword } = req.body;
    const profilePicture = req.file;

    let cloudResponse;
    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (bio) user.bio = bio;
    // if (gender) user.gender = gender;
    if (currentpassword) {
      const comparePassword = await bcrypt.compare(
        currentpassword,
        user.password
      );
      if (!comparePassword) {
        return res.status(403).json({
          success: false,
          message: "Password dosent match",
        });
      }
      const hashedPassword = await bcrypt.hash(confirmPassword, 10);
      if (hashedPassword) {
        user.password = hashedPassword;
      }
    }
    if (profilePicture) user.profilePicture = cloudResponse?.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully!",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestedUser = async (req, res) => {
  try {
    const suggestUser = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );
    if (!suggestUser) {
      return res.status(400).json({
        message: "Currently user not found!",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      users: suggestUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const followAndUnfollow = async (req, res) => {
  try {
    const { _id: id } = req.params;
    const loggedInUser = req.id; // follow karne wala user
    const jiskoFollowKarega = id; // userFollowKarega another user ko
    if (loggedInUser === jiskoFollowKarega) {
      res.status(400).json({
        message: "You can not follow and, unfollow youreself!",
        success: false,
      });
    }
    const user = await User.findById(loggedInUser);
    const targetUser = await User.findById(jiskoFollowKarega);
    if (!user || !targetUser) {
      res.status(400).json({
        message: "User not found!",
        success: false,
      });
    }
    // check karunga maine already follow kar rakha hai ya nahi
    const isFollowing = user.following.includes(jiskoFollowKarega);
    if (isFollowing) {
      // unfollow
      await Promise.all([
        User.updateOne(
          { _id: loggedInUser },
          { $pull: { following: jiskoFollowKarega } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarega },
          { $pull: { followers: loggedInUser } }
        ),
      ]);
      res.status(200).json({
        message: "unfollow successfully!",
        success: true,
      });
    } else {
      // follow
      await Promise.all([
        User.updateOne(
          { _id: loggedInUser },
          { $push: { following: jiskoFollowKarega } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarega },
          { $push: { followers: loggedInUser } }
        ),
      ]);
      res.status(200).json({
        message: "follow successfully!",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchByKeyword = async (req, res) => {
  const { keyword } = req.params;
  try {
    const user = await User.find({
      $or: [{ userName: { $regex: keyword, $options: "i" } }],
    });
    if (!user) {
      return res.status(200).json({
        message: "user not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: `search by ${user ? user[0].userName : ""}`,
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
