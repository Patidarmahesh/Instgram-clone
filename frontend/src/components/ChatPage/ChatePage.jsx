import React from "react";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMicOutline } from "react-icons/io5";
import { RiGalleryLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import ChatCard from "./ChatCard";
import { GetRequest, postRequest } from "@/apiHandler/apiHandler";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/authSlice";
import { setShowSuggestedUser } from "@/redux/chatSlice";
import Message from "./Message";
import { Search } from "@mui/icons-material";

const ChatePage = () => {
  const [suggested, setSuggested] = React.useState([]);
  const [textMessage, SetTextMessage] = React.useState("");
  const [messages, SetMessages] = React.useState([]);
  const dispatch = useDispatch();
  const { selectedUser, user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socketIo);
  const { online, showSuggestedUser } = useSelector(
    (state) => state.onlineUsers
  );

  const getAllPost = async () => {
    const allPost = await GetRequest("/api/v1/user/suggested", {
      withCredentials: true,
    });
    const { success, users } = allPost?.data;
    if (success) {
      setSuggested(users);
    } else {
    }
  };

  const getAllMessage = async () => {
    const response = await GetRequest(
      `/api/v1/message/get/${selectedUser._id}`,
      {
        withCredentials: true,
      }
    );
    const { success, messages: userMessage } = response?.data;
    if (success) {
      SetMessages(userMessage);
    } else {
    }
  };

  const messageSendHandler = async (reciverId) => {
    try {
      const response = await postRequest(
        `/api/v1/message/send/${reciverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { success } = response?.data;
      if (success) {
        getAllMessage();
        SetTextMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    socket?.on("newmessage", (newmessage) => {
      SetMessages([...messages, newmessage]);
    });
  }, [messages]);

  React.useEffect(() => {
    getAllPost();
  }, []);

  React.useEffect(() => {
    getAllMessage();
  }, []);

  React.useEffect(() => {
    return () => {
      dispatch(setShowSuggestedUser(false));
    };
  }, []);

  return (
    <div className="md:max-w-[84%] w-full md:ml-[16%] flex h-screen dark:bg-black">
      <div className="w-[40%] border border-gray-600">
        <div className="h-20 w-full z-10 flex items-center justify-between px-5">
          <h1 className="text-2xl font-bold text-white">
            {user && user.userName}
          </h1>
          <FaRegEdit className="text-3xl font-bold text-white" />
        </div>
        <div className="h-20 w-full z-10 p-4">
          <input
            type="text"
            className="p-2 pl-5 text-white focus:ring-1 ring-green-500 placeholder:text-green-600 text-xl border border-gray-600 bg-transparent focus:outline-none rounded-l-full rounded-r-full w-full"
            placeholder="Search here..........."
          />
        </div>
        <div className="flex justify-between text-xl text-white mx-4">
          <h1 className="font-bold text-2xl">Message</h1>
          <h5 className="underline text-blue-700 cursor-pointer">Requests</h5>
        </div>
        <div className="w-full h-full flex my-6 p-2 flex-col gap-4 max-h-[70%] overflow-auto scroll-smooth">
          {suggested.length > 0 &&
            suggested?.map((item) => {
              const isOnline = online.includes(item._id);
              return (
                <div
                  onClick={() => {
                    dispatch(setSelectedUser(item));
                    dispatch(setShowSuggestedUser(true));
                  }}
                  key={item._id}
                >
                  <ChatCard online={isOnline} item={item} />
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex-1 h-screen flex flex-col justify-between">
        <div className="border-b border-gray-600 px-4 flex justify-between h-28 p-4">
          {showSuggestedUser && (
            <>
              <div className="flex w-[24%] gap-3 justify-center items-center">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={
                    selectedUser?.profilePicture
                      ? selectedUser?.profilePicture
                      : "https://scontent.fidr4-2.fna.fbcdn.net/v/t1.30497-1/115870214_694925034696967_1870022665148339563_n.jpg?stp=dst-jpg_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=7565cd&_nc_ohc=cCyDYVsZ-VsQ7kNvgEiJn_4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fidr4-2.fna&oh=00_AYAv3G5AMRHK6M7p31bSA7WVnGTYTbdNnXVPOLxN_rfD5w&oe=66F38522"
                  }
                />
                <h4 className="text-white text-xl">{selectedUser?.userName}</h4>
              </div>
              <div className="w-[18%] text-white flex items-center justify-center gap-3 text-3xl">
                <IoCallOutline />
                <CiVideoOn />
                <MdErrorOutline />
              </div>
            </>
          )}
        </div>
        <div
          className={`overflow-auto text-white flex flex-col gap-6 max-h-screen scroll-smooth ${
            !showSuggestedUser && "flex justify-center items-center h-[100%]"
          }`}
        >
          {showSuggestedUser ? (
            <>
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="mx-auto">
                  <img
                    className="h-28 w-28 rounded-full object-cover"
                    src={
                      selectedUser?.profilePicture
                        ? selectedUser?.profilePicture
                        : "https://scontent.fidr4-2.fna.fbcdn.net/v/t1.30497-1/115870214_694925034696967_1870022665148339563_n.jpg?stp=dst-jpg_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=7565cd&_nc_ohc=cCyDYVsZ-VsQ7kNvgEiJn_4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fidr4-2.fna&oh=00_AYAv3G5AMRHK6M7p31bSA7WVnGTYTbdNnXVPOLxN_rfD5w&oe=66F38522"
                    }
                  />
                </div>
                <h4 className="text-white text-xl text-center">
                  {selectedUser?.userName}
                </h4>
                <button className="bg-gray-500 hover:bg-gray-600 duration-200 text-white text-xl p-2 w-44 rounded-md">
                  View Profile
                </button>
              </div>
              <Message messages={messages} />
            </>
          ) : (
            <div className="flex flex-col text-center">
              <div className="mx-auto">
                <img
                  className="h-28 w-28 rounded-full object-cover"
                  src="https://wallpapers.com/images/hd/instagram-black-background-nqta6l3vrpci1oft.jpg"
                />
              </div>
              <h4 className="text-white text-xl">Your messages</h4>
              <h4 className="text-gray-400 text-xl my-2">
                Send private photos and messages to a friend or group.
              </h4>
              <div className="flex justify-center">
                <button className="bg-blue-500 hover:blue-600 duration-200 text-white text-xl p-2 w-56 rounded-md">
                  Send message
                </button>
              </div>
            </div>
          )}
        </div>
        {showSuggestedUser && (
          <div className="w-full flex border my-4 rounded-l-full rounded-r-full">
            <div className="w-16 flex justify-end p-3 items-center text-3xl text-white">
              <HiOutlineEmojiHappy />
            </div>
            <input
              type="text"
              value={textMessage}
              onChange={(e) => SetTextMessage(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-xl p-3 text-white"
              placeholder="Enter message here....."
            />
            {textMessage ? (
              <div className="w-40 p-3 text-white gap-2 flex justify-center text-2xl font-bold">
                <span
                  onClick={() => messageSendHandler(selectedUser?._id)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  Send
                </span>
              </div>
            ) : (
              <div className="w-40 p-3 text-white gap-2 flex justify-center text-3xl">
                <IoMicOutline className="cursor-pointer" />
                <RiGalleryLine className="cursor-pointer" />
                <CiHeart className="cursor-pointer" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatePage;
