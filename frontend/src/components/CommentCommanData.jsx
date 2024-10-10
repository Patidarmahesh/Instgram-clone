import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { TbLocationShare } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { Avatar } from "@mui/material";
import { CiHeart } from "react-icons/ci";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import dayjs from "dayjs";
import Action from "./Action";

const CommentCommanData = ({
  likeDislikeHandler,
  like,
  handleShareOpen,
  userName,
  likes,
  caption,
  createdAt,
  profilePicture,
  _id,
  text,
  comments,
  changeTextHandler,
  updateComment,
  deleteComment,
  onClickFocus,
  user,
  toogleButton,
  addComment,
  inputRef,
}) => {
  return (
    <div className="w-[60%] bg-black rounded-r-md flex flex-col justify-between">
      <div className=" w-full h-[16%] flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <Avatar
            alt="Travis Howard"
            sx={{ width: "50px", height: "50px", borderRadius: "100%" }}
            src="https://scontent.fidr4-2.fna.fbcdn.net/v/t1.30497-1/115870214_694925034696967_1870022665148339563_n.jpg?stp=dst-jpg_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=7565cd&_nc_ohc=oN3WJRrI1j4Q7kNvgHH5ota&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fidr4-2.fna&_nc_gid=AoSHG9fW9jsVsxQv5JHallV&oh=00_AYA_r-ZR-HdYd032-AfO7Nrd-v3FwatCvubRxj3E_8qfUw&oe=66F70922"
          />
          <h1 className="text-lg text-white font-bold">{userName}</h1>
          <span className="text-lg text-slate-400">
            {dayjs(createdAt).format("DD/MM/YYYY")}
          </span>
        </div>
        <IoEllipsisHorizontalSharp className="text-2xl cursor-pointer text-white" />
      </div>
      <div className="flex-1 text-white overflow-y-auto max-h-96 p-4 border-y border-gray-300">
        {comments.length > 0 ? (
          comments?.map((comment, i) => {
            const {
              userName,
              profilePicture,
              _id: showId,
            } = comment?.author[0];
            const { text, _id } = comment;
            return (
              <div
                key={i}
                className="flex items-center bg-slate-500 shadow-lg px-2 rounded-md gap-3 mb-8"
              >
                <Avatar
                  alt="Travis Howard"
                  sx={{
                    width: "55px",
                    height: "55px",
                    borderRadius: "100%",
                    border: "1px solid white",
                    cursor: "pointer",
                  }}
                  src={
                    profilePicture
                      ? profilePicture
                      : "https://scontent.fidr4-2.fna.fbcdn.net/v/t1.30497-1/115870214_694925034696967_1870022665148339563_n.jpg?stp=dst-jpg_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=7565cd&_nc_ohc=oN3WJRrI1j4Q7kNvgHH5ota&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fidr4-2.fna&_nc_gid=AoSHG9fW9jsVsxQv5JHallV&oh=00_AYA_r-ZR-HdYd032-AfO7Nrd-v3FwatCvubRxj3E_8qfUw&oe=66F70922"
                  }
                />
                <h2 className="cursor-pointer border-b-2 border-black">
                  {userName}
                </h2>
                <span
                  contentEditable={toogleButton}
                  suppressContentEditableWarning={toogleButton}
                  ref={inputRef}
                  style={{ wordWrap: "break-word" }}
                  className="w-[35%] p-2 focus:outline-none focus:ring-2 rounded-sm focus:ring-violet-300"
                >
                  {text}
                </span>
                <div
                  className={`flex ${
                    user._id === showId ? "justify-between" : "justify-end"
                  } flex-1 items-center text-white gap-1`}
                >
                  {user._id === showId && (
                    <>
                      {" "}
                      {!toogleButton && (
                        <Action
                          type="Delete"
                          handleClick={() => deleteComment(_id)}
                          className="bg-black text-center cursor-pointer hover:bg-opacity-30 transition-opacity duration-200 w-28 p-1 rounded-md text-white"
                        />
                      )}
                      <>
                        {toogleButton ? (
                          <>
                            <Action
                              className="bg-black cursor-pointer text-center hover:bg-opacity-30 transition-opacity duration-200 w-28 p-1 rounded-md text-white"
                              type="Save"
                              handleClick={() => updateComment(_id)}
                            />
                            <Action
                              className="bg-green-500 cursor-pointer text-center hover:bg-opacity-30 transition-opacity duration-200 w-28 p-1 rounded-md text-white"
                              type="Cancal"
                              handleClick={() => {
                                if (inputRef.current)
                                  inputRef.current.innerText = text;
                                onClickFocus();
                              }}
                            />
                          </>
                        ) : (
                          <Action
                            handleClick={onClickFocus}
                            type={"Edit"}
                            className="bg-black cursor-pointer text-center hover:bg-opacity-30 transition-opacity duration-200 w-28 p-1 rounded-md text-white"
                          />
                        )}
                      </>
                    </>
                  )}
                  <CiHeart className="text-xl cursor-pointer hover:text-gray-200" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-white flex justify-center items-center h-full text-2xl font-bold">
            Comment is empity
          </div>
        )}
      </div>
      <div className="w-full h-[30%] mt-4 p-2">
        <div className=" border-b border-gray-300 w-full flex flex-col gap-2">
          <div className=" flex gap-5 text-white">
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
            <FaRegCommentDots className="cursor-pointer text-[35px] hover:text-gray-400 duration-100" />
            <TbLocationShare
              onClick={handleShareOpen}
              className="cursor-pointer text-[35px] hover:text-gray-400 duration-100"
            />
            <div className=" flex-grow flex justify-end">
              <FaRegBookmark className="cursor-pointer text-[35px] hover:text-gray-400 duration-100" />
            </div>
          </div>
          <span className="font-medium mx-2 md:mx-0 text-white cursor-pointer mb-2">
            {likes.length} likes
            <div className="text-gray-400 text-sm font-0">1 day ago!</div>
          </span>
        </div>
        <div className="flex items-center px-4">
          <img
            className="h-6"
            src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/65532/happy-emoji-clipart-md.png"
          />
          <input
            value={text}
            onChange={changeTextHandler}
            placeholder="Add a comments....."
            className="flex-1 bg-black text-white p-4 text-md focus:outline-0"
          />
          {text && (
            <Action
              handleClick={addComment}
              type="Post"
              className="text-blue-700 text-center cursor-pointer font-bold text-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCommanData;
