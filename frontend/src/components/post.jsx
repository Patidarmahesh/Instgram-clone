import React from "react";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoMdBookmark } from "react-icons/io";
import { TbLocationShare } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentModal from "./commentModal";
import EmojiPicker from "./emoji";
import {
  deleteRequestById,
  GetRequest,
  postRequest,
} from "@/apiHandler/apiHandler";
import { setPost } from "@/redux/postSlice";
import { setSaved } from "@/redux/bookMarkSlice";
import ShareModal from "./ShareModal";
import { setAuthUser } from "@/redux/authSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
  backgroundColor: "gray",
};

const Post = ({ setIsHovered, isHovered, item }) => {
  const [open, setOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);
  const [commentModal, setCommentModal] = React.useState(false);
  const [text, setText] = React.useState("");
  const [showPicker, setShowPicker] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const { saved } = useSelector((state) => state.bookMarkPost);
  const { userName, profilePicture, _id } = item.author;
  const { image, likes, comments, caption, createdAt, _id: id } = item;
  const [like, disLike] = React.useState(
    item?.likes?.includes(user?._id) || false
  );
  const [followAndUnFollow, setFollowAndUnFollow] = React.useState(
    user?.following?.includes(_id) || false
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleShareOpen = () => setShareOpen(true);
  const handleShareClose = () => setShareOpen(false);
  const handleCommentOpen = () => setCommentModal(true);
  const handleCommentClose = () => setCommentModal(false);

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    // year: "numeric",
    month: "long",
    day: "numeric",
  });

  const changeTextHandler = (event) => {
    const inputText = event.target.value;
    if (inputText.trim()) {
      setText(inputText);
      showPicker ? setShowPicker(false) : "";
    } else if (text === "") {
      setShowPicker(false);
    } else {
      setText("");
    }
  };

  const DeleteCardHandler = async () => {
    const response = await deleteRequestById(`/api/v1/post/deletePost/${id}`);
    const { success, message } = response?.data;
    if (success) {
      toast.success(message);
      handleClose();
      const allPost = await GetRequest("/api/v1/post/getallpost", {
        withCredentials: true,
      });
      const { success: successData, posts } = allPost?.data;
      if (successData) {
        dispatch(setPost(posts));
      }
    }
  };

  const likeDislikeHandler = async () => {
    try {
      const action = like ? "dislike" : "like";
      const response = await GetRequest(`/api/v1/post/${id}/${action}`, {
        withCredentials: true,
      });
      const { success, message } = response?.data;
      if (success) {
        disLike(!like);
        toast.success(message);
        const allPost = await GetRequest("/api/v1/post/getallpost", {
          withCredentials: true,
        });
        const { success: successData, posts } = allPost?.data;
        if (successData) {
          dispatch(setPost(posts));
        }
      }
    } catch (error) {}
  };

  const followAndUnFollowHandler = async (_id, id) => {
    const response = await postRequest(
      `/api/v1/user/followunfollow/${_id}`,
      { text: "mayank" },
      {
        Headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { message, success } = response?.data;
    if (success) {
      setFollowAndUnFollow(!followAndUnFollow);
      toast.success(message);
      const userData = await GetRequest(`/api/v1/user/${id}/profile`, {
        withCredentials: true,
      });
      const { success: successData, user } = userData?.data;
      if (successData) {
        dispatch(setAuthUser(user));
      }
    }
  };

  const addComment = async () => {
    const response = await postRequest(
      `/api/v1/post/${id}/addcomment`,
      { text: text },
      {
        Headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { success, message } = response?.data;
    if (success) {
      toast.success(message);
      setShowPicker(false);
      setText("");
      const allPost = await GetRequest("/api/v1/post/getallpost", {
        withCredentials: true,
      });
      const { success: successData, posts } = allPost?.data;
      if (successData) {
        dispatch(setPost(posts));
      }
    }
  };

  const addAndRemoveBookmarkPost = async (id) => {
    const response = await postRequest(
      `/api/v1/post/${id}/bookmark`,
      { text: "text" },
      {
        Headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { success, type, message } = response?.data;
    console.log(response?.data);
    if (success) {
      toast.success(message);
      dispatch(setSaved(type));
    }
  };

  const cardHeaderHandler = async (event) => {
    if (event === "Unfollow" || event === "Follow") {
      followAndUnFollowHandler(_id, user?._id);
    }
    if (event === "Message") {
      navigate("/chat");
    }
    if (event === "Delete") {
      DeleteCardHandler();
    }
    if (event === "Report") {
    }
  };

  const addEmoji = (event) => {
    const emj = event?.unified?.split("_");

    const emojiArray = [];
    emj.forEach((element) => {
      emojiArray.push("0x" + element);
    });
    let emoji = String.fromCodePoint(...emojiArray);
    setText(text + emoji);
  };

  let emojiAndInputData = (
    <>
      <input
        value={text}
        onChange={changeTextHandler}
        className="outline-0 text-s w-full dark:bg-black dark:text-white"
        type="text"
        placeholder="Add comment....."
      />
      {text && <button onClick={() => setShowPicker(!showPicker)}>😀</button>}
      {text && (
        <div className="absolute top-11 md:right-0 left-1 right-0 z-10">
          <EmojiPicker showPicker={showPicker} addEmoji={addEmoji} />
        </div>
      )}
      {text && (
        <span
          onClick={addComment}
          className="text-blue-700 font-bold text-lg cursor-pointer"
        >
          Post
        </span>
      )}
    </>
  );

  const hoverCard = (
    <div className="relative w-[80%] md:block hidden">
      {isHovered && (
        <div
          className={`w-full absolute rounded-md bg-black top-[60px] left-14 z-10 mt-2 ease-in-out ${
            isHovered
              ? "opacity-100 shadow-xl shadow-white duration-300"
              : "opacity-0"
          }`}
        >
          <div className="h-24 flex items-center px-4 gap-4 mb-2">
            <div className="bg-white rounded-full border-2 border-gray-500 p-1 h-20 w-20">
              <img
                className="w-full h-full object-cover rounded-full"
                src="https://teqip.in/wp-content/uploads/2022/12/9e9b8d7df4bb1940d9a1db4f65fceceb.jpg"
              />
            </div>
            <h1 className="text-white text-2xl font-semibold">shraddhaa_.30</h1>
          </div>
          <div className="text-white flex justify-evenly mb-3">
            <h1 className="text-2xl font-normal flex flex-col justify-center items-center lowercase">
              10<span className="text-gray-400"> Post</span>
            </h1>
            <h1 className="text-2xl font-normal flex flex-col justify-center items-center lowercase">
              10<span className="text-gray-400"> Followers</span>
            </h1>
            <h1 className="text-2xl font-normal flex flex-col justify-center items-center lowercase">
              10<span className="text-gray-400"> Followers</span>
            </h1>
          </div>
          <div className="h-50 grid grid-cols-3 gap-2">
            <img
              src="https://www.filmibeat.com/ph-big/2019/02/taapse-pannu_155124602230.jpg"
              alt=""
              className="object-cover w-full h-full"
            />
            <img
              src="https://www.filmibeat.com/ph-big/2019/02/taapse-pannu_155124602230.jpg"
              alt=""
              className="object-cover w-full h-full"
            />
            <img
              src="https://www.filmibeat.com/ph-big/2019/02/taapse-pannu_155124602230.jpg"
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex items-center justify-center gap-2 p-5">
            <button className="bg-black border border-white p-2 text-xl flex-1 text-white rounded-md">
              Message
            </button>
            <button className="bg-black border border-white p-2 text-xl flex-1 text-white rounded-md">
              Follow
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={"w-full mb-4 md:max-w-xl mx-auto border-b border-gray-300"}>
      {hoverCard}
      <div className="flex items-center justify-between px-4 md:px-0">
        <div className="flex items-center gap-4 mb-3">
          <Avatar
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            alt="Travis Howard"
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              cursor: "pointer",
            }}
            src={
              profilePicture
                ? profilePicture
                : "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy-800x789.png"
            }
          />
          <h1
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/profile/${_id}`)}
            className="text-lg text-black font-bold dark:text-white cursor-pointer"
          >
            {userName}
          </h1>
          <span className="text-lg text-slate-400 dark:text-white">
            {formattedDate}
          </span>
          {user?._id === _id && (
            <button className="md:w-36 bg-gray-600 hover:bg-gray-800 text-white hover:text-white duration-300 font-medium text-xl rounded-md p-1">
              Author
            </button>
          )}
        </div>

        <IoEllipsisHorizontalSharp
          onClick={handleOpen}
          className="text-2xl cursor-pointer text-black dark:text-white"
        />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="flex flex-wrap gap-6">
            <>
              {followAndUnFollow ? (
                <button
                  onClick={() => cardHeaderHandler("Unfollow", id)}
                  className="bg-gray-600 w-36 hover:bg-gray-800 duration-300 font-medium text-xl rounded-md p-2"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={() => cardHeaderHandler("Follow", id)}
                  className="bg-blue-600 w-36 hover:bg-gray-800 duration-300 font-medium text-xl rounded-md p-2"
                >
                  Follow
                </button>
              )}
            </>
            {["Message", "Delete", "Report"].map((button, index) => {
              return (
                <>
                  {user && user._id !== _id && button === "Delete" ? (
                    ""
                  ) : (
                    <button
                      onClick={() => cardHeaderHandler(button)}
                      key={index}
                      className={`${
                        (user && user?._id !== _id && button === "Report") ||
                        (user && user._id === _id && button === "Report")
                          ? "w-[310px]"
                          : "w-36"
                      } bg-gray-600 hover:bg-gray-800 duration-300 font-medium text-xl rounded-md p-2`}
                    >
                      {button}
                    </button>
                  )}
                </>
              );
            })}
          </Box>
        </Modal>
      </div>
      <img
        className="w-full object-cover md:rounded-sm"
        src={image}
        alt="network error"
      />
      <div className=" text-black dark:text-white flex justify-between my-3 mx-2 md:mx-0">
        <div className=" flex flex-1 gap-5">
          {like ? (
            <FaHeart
              onClick={likeDislikeHandler}
              className="cursor-pointer text-[35px] text-red-800"
            />
          ) : (
            <FaRegHeart
              onClick={likeDislikeHandler}
              className="cursor-pointer text-[35px] hover:text-gray-400 duration-100"
            />
          )}
          <FaRegCommentDots
            onClick={handleCommentOpen}
            className="cursor-pointer text-[35px] hover:text-gray-400 duration-100"
          />
          <TbLocationShare
            onClick={handleShareOpen}
            className="cursor-pointer text-[35px] hover:text-gray-400 duration-100"
          />
        </div>

        {saved === "saved" ? (
          <IoMdBookmark
            onClick={() => addAndRemoveBookmarkPost(id)}
            className="cursor-pointer text-[35px] hover:text-gray-400 duration-100"
          />
        ) : (
          <FaRegBookmark
            onClick={() => addAndRemoveBookmarkPost(id)}
            className="cursor-pointer text-[35px] hover:text-gray-400 duration-100"
          />
        )}
      </div>
      <span className="font-medium mb-1 dark:text-white mx-2 md:mx-0 text-black cursor-pointer">
        {likes?.length} likes
      </span>
      <p>
        <span className="font-medium dark:text-white mr-2 mx-2 md:mx-0">
          {caption}
        </span>
        caption
      </p>
      <span
        className="text-gray-400 text-xl dark:text-white mx-2 md:mx-0 cursor-pointer"
        onClick={handleCommentOpen}
      >
        view all {comments?.length} comments
      </span>
      <CommentModal
        like={like}
        likeDislikeHandler={likeDislikeHandler}
        item={item}
        open={commentModal}
        handleClose={handleCommentClose}
        handleShareOpen={handleShareOpen}
      />
      <ShareModal
        style={style}
        shareOpen={shareOpen}
        handleShareClose={handleShareClose}
      />
      <div className="flex gap-4 mb-4 mx-2 md:mx-0 relative items-center">
        {emojiAndInputData}
      </div>
    </div>
  );
};

export default Post;
