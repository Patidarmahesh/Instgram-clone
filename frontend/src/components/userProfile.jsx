import React from "react";
import { BiUserPlus } from "react-icons/bi";
import { SiTrustedshops } from "react-icons/si";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { FaComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetRequest, postRequest } from "@/apiHandler/apiHandler";
import { setAuthUser } from "@/redux/authSlice";
import CarousalModal from "./CarousalModal";

const Taps = ({ handleOpen, activeTab, handleTabChangeler, data }) => {
  return (
    <div className="border-t border-gray-600">
      <div className="flex md:justify-center justify-between text-xl items-center md:gap-10 gap-8">
        <span
          className={`py-2 cursor-pointer flex items-center h-14 p-3 gap-2 ${
            activeTab === "posts"
              ? "text-white font-medium border-t-2 border-white"
              : "text-gray-400"
          }`}
          onClick={() => handleTabChangeler("posts")}
        >
          <CiBookmark className="text-2xl" />
          Posts
        </span>
        <span
          className={`py-2 cursor-pointer flex items-center duration-200 h-14 p-3 gap-2 ${
            activeTab === "saved"
              ? "text-white font-medium border-t-2 border-white"
              : "text-gray-400"
          }`}
          onClick={() => handleTabChangeler("saved")}
        >
          <CiBookmark className="text-2xl" />
          Saved
        </span>
        <span className="py-2 cursor-pointer text-gray-400 h-14 p-3 flex items-center gap-2">
          <CiBookmark className="text-2xl" /> Reels
        </span>
        <span className="py-2 cursor-pointer md:opacity-100 opacity-0 text-gray-400 h-14 p-3 flex items-center gap-2">
          <CiBookmark className="text-2xl" /> Tagged
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {activeTab === "posts" &&
          data?.posts.map((item,index) => {
            return (
              <div key={item._id} className="group relative cursor-pointer">
                <img
                  className="w-full h-56 md:h-96 object-cover"
                  src={item.image}
                />
                <div
                  onClick={() => handleOpen(index)}
                  className="absolute inset-0 flex justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center gap-8"
                >
                  <h1 className="text-2xl text-white items-center flex gap-2 hover:text-gray-500">
                    <FaHeart /> {item.likes.length}
                  </h1>
                  <h1 className="text-white text-2xl items-center flex gap-2 hover:text-gray-500">
                    <FaComment /> {item.comments.length}
                  </h1>
                </div>
              </div>
            );
          })}
        {activeTab === "saved" &&
          data?.bookMarks.map(({ likes, comments, _id, image }) => {
            return (
              <div key={_id} className="group relative cursor-pointer">
                <img
                  className="w-full h-56 md:h-full object-cover"
                  src={image}
                />
                <div className="absolute inset-0 flex justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center gap-8">
                  <h1 className="text-2xl text-white items-center flex gap-2 hover:text-gray-500">
                    <FaHeart /> {likes.length}
                  </h1>
                  <h1 className="text-white text-2xl items-center flex gap-2 hover:text-gray-500">
                    <FaComment /> {comments.length}
                  </h1>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export const Avatar = ({ className, profilePicture }) => {
  return (
    <div className={className}>
      <img
        className="w-full h-full object-cover rounded-full"
        src={
          profilePicture
            ? profilePicture
            : "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy-800x789.png"
        }
      />
    </div>
  );
};

const UserProfile = () => {
  const [activeTab, setActiveTab] = React.useState("posts");
  const [data, setData] = React.useState([]);
  const [carousalData, setCarousalData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const loogedinUser = user._id === data._id;
  const followCheck = user?.following?.includes(data?._id) || false;
  const { _id: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = (index) => {
    let dataChangeValue = data;
    const sliceResult = dataChangeValue.posts.slice(index);
    setCarousalData(sliceResult);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChangeler = (tab) => {
    setActiveTab(tab);
  };

  const followAndUnFollow = async (_id, id) => {
    const response = await postRequest(
      `/api/v1/user/followunfollow/${_id}`,
      { text: "mayank" },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { message, success } = response?.data;
    if (success) {
      toast.success(message);
      !followCheck;
      fetchUser();
      const userData = await GetRequest(`/api/v1/user/${id}/profile`, {
        withCredentials: true,
      });
      const { success: successData, user } = userData?.data;
      if (successData) {
        dispatch(setAuthUser(user));
      }
    }
  };

  const fetchUser = async () => {
    const response = await GetRequest(`/api/v1/user/${id}/profile`, {
      withCredentials: true,
    });
    if (response?.data.success) {
      setData(response?.data?.user);
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, [id]);

  const {
    bio,
    bookMarks,
    followers,
    following,
    posts,
    profilePicture,
    userName,
  } = data;

  return (
    <>
      <CarousalModal
        carousalData={carousalData}
        open={open}
        handleClose={handleClose}
      />
      <div className={`md:max-w-[84%] w-full md:ml-[16%] md:p-10 bg-black`}>
        <div className={"flex-grow grid grid-cols-1 gap-8"}>
          <div className="flex gap-16 md:p-4 p-0 mt-5">
            <div className="md:block hidden w-[26%]">
              <div className="w-full h-full flex justify-center">
                <Avatar
                  className="rounded-full border-2 h-60 bg-green-500 p-1 w-60"
                  profilePicture={profilePicture}
                />
              </div>
            </div>
            <div className="w-full h-full gap-3 flex flex-col">
              <div className="flex gap-3 text-white items-center p-2">
                <h1 className="text-2xl font-medium">{userName}</h1>
                <>
                  {loogedinUser ? (
                    <>
                      <button
                        onClick={() => navigate("/account/edit")}
                        className="w-36 bg-gray-600 hover:bg-gray-800 duration-300 font-medium text-xl rounded-md p-2"
                      >
                        Edit Profile
                      </button>
                      <button className="w-36 bg-gray-600  hover:bg-gray-800 duration-300 font-medium text-xl rounded-md p-2">
                        View archive
                      </button>
                      <IoIosAddCircleOutline className="text-5xl cursor-pointer" />
                    </>
                  ) : (
                    <>
                      {followCheck ? (
                        <button
                          onClick={() => followAndUnFollow(id, user?._id)}
                          className="w-36 bg-gray-600 hover:bg-gray-800 duration-300 font-medium text-xl rounded-md p-2"
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          onClick={() => followAndUnFollow(id, user?._id)}
                          className="w-36 bg-blue-600 hover:bg-gray-800 duration-300 font-medium text-xl rounded-md p-2"
                        >
                          Follow
                        </button>
                      )}
                      <button
                        onClick={() => navigate("/chat")}
                        className="w-36 bg-gray-600  hover:bg-gray-800 duration-300 font-medium text-xl rounded-md p-2"
                      >
                        Message
                      </button>
                      <button className="text-white p-3 hover:bg-gray-800 duration-300 bg-gray-600 font-medium text-[20px] rounded-md">
                        <BiUserPlus />
                      </button>
                      <IoEllipsisHorizontalSharp className="text-2xl cursor-pointer" />
                    </>
                  )}
                </>
              </div>
              <div className="text-white flex gap-10 p-2">
                <h1 className="text-2xl">{posts?.length} posts</h1>
                <h1 className="text-2xl">{followers?.length} followers</h1>
                <h1 className="text-2xl">{following?.length} following</h1>
              </div>
              <h1 className="text-2xl text-white leading-8 p-2">
                {userName} <br />
                {bio} 🤍
              </h1>
              <h1 className="text-xl text-slate-400 p-2 mt-[-14px]">
                Followed by{" "}
                <span className="text-white">prem_jaya18, kimi_dwi</span> and 5
                more
              </h1>
            </div>
          </div>
          {followCheck || loogedinUser ? (
            <>
              <div className="md:block hidden">
                <div className="flex justify-between mb-6">
                  {Array(7)
                    .fill(7)
                    .map((i, index) => (
                      <Avatar
                        key={index}
                        profilePicture={profilePicture}
                        className="rounded-full border-2 bg-green-500 h-40 w-40 p-1"
                      />
                    ))}
                </div>
              </div>
              <Taps
                handleOpen={handleOpen}
                activeTab={activeTab}
                data={data}
                handleTabChangeler={handleTabChangeler}
              />
            </>
          ) : (
            <div className="border-t border-gray-700">
              <div className="flex items-center justify-center gap-3 my-10">
                <div>
                  <SiTrustedshops className="text-7xl text-white" />
                </div>
                <div>
                  <h1 className="text-2xl text-white">
                    This account is private
                  </h1>
                  <h3 className="text-xl text-gray-400">
                    Follow to see their photos and videos.
                  </h3>
                </div>
              </div>
              <div className="h-72 grid grid-cols-6 gap-4">
                {Array(6)
                  .fill(10)
                  .map((p, index) => {
                    return (
                      <div
                        key={index}
                        className="border border-gray-700 flex flex-col justify-end"
                      >
                        <div className="h-full flex justify-center items-center flex-col gap-2">
                          <img
                            className="h-24 w-24 rounded-full object-cover"
                            src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/f0484897-beb3-457f-93d9-818c489cee6f/width=450/5241486.jpeg"
                          />
                          <h1 className="text-xl font-semibold text-white">
                            _shraddhaa_.30_
                          </h1>
                        </div>
                        <div className="border-t border-gray-700 h-20 flex justify-center items-center">
                          <h1 className="text-blue-600 text-xl font-semibold hover:text-blue-400 duration-200 cursor-pointer">
                            Follow
                          </h1>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
