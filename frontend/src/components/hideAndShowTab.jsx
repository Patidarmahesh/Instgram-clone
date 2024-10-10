import { GetRequest } from "@/apiHandler/apiHandler";
import {
  clearAllSearchData,
  setFilterSearchData,
  setSearchData,
} from "@/redux/bookMarkSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";
import UserCommenCard from "./userCommenCard";

const HideAndShowTab = ({ keyword, setKeyword, showLeftTab }) => {
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.bookMarkPost);
  const { likeNotification } = useSelector((state) => state.appNotification);
  const fetchUser = async (e) => {
    e.preventDefault();
    const response = await GetRequest(`/api/v1/user/search/${keyword}`, {
      withCredentials: true,
    });
    if (response?.data?.success) {
      dispatch(setSearchData(response?.data?.user[0]));
      toast.success(response?.data?.message);
      setKeyword("");
    }
  };

  return (
    <div className="w-[76%] flex flex-col absolute top-10 left-[24%]">
      {showLeftTab === "Search" && (
        <>
          <form onSubmit={fetchUser}>
            <input
              type="text"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
              className="w-[94%] p-3 text-white bg-gray-600 focus:outline-0 text-xl rounded-lg"
              placeholder="Search here........"
            />
            <button type="submit" className="opacity-0">
              submit
            </button>
          </form>
          <div className="gap-8 flex flex-col scroll-smooth max-h-screen overflow-auto p-1">
            <div className="flex justify-between mx-2">
              <h4 className="text-2xl text-white font-semibold">Recent</h4>
              <h4
                onClick={() => dispatch(clearAllSearchData([]))}
                className="text-2xl cursor-pointer text-blue-600 font-semibold hover:text-white"
              >
                Clear All
              </h4>
            </div>
            <div className="w-full border-t border-gray-600"></div>
            {searchData?.length > 0 &&
              searchData?.map(({ bio, userName, profilePicture, _id }) => {
                return (
                  <div
                    key={_id}
                    className="flex mb-2 items-center gap-3 cursor-pointer text-white hover:text-white hover:bg-[#212121] duration-700 rounded-md p-2 px-2"
                  >
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={
                        profilePicture
                          ? profilePicture
                          : "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy-800x789.png"
                      }
                    />
                    <div>
                      <h1 className="text-xl font-semibold">{userName}</h1>
                      <h4 className="text-[18px] text-gray-500 flex gap-2">
                        {bio ? bio.substring(0,20) : "nothing bio"}
                        <h1 className="text-xl font-semibold">Following</h1>
                      </h4>
                    </div>
                    <div className="flex justify-end flex-1">
                      <RxCross2
                        className="text-2xl"
                        onClick={() => dispatch(setFilterSearchData(_id))}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          {/* <div className="w-full border-t border-gray-600"></div> */}
        </>
      )}
      {showLeftTab === "Notifications" && (
        <>
          <div className="gap-1 border-gray-600 border-l">
            <div className="h-36 w-full p-2 flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-white">Notifications</h1>
              <div className="bg-gray-800 text-white w-full h-28 rounded-md flex items-center">
                <h4 className="text-xl mx-2">Follow Request</h4>
              </div>
            </div>
            <div className="w-full border-t h-36 border-b border-gray-600"></div>
            <div className="max-h-[450px] w-full scroll-smooth overflow-auto flex flex-col gap-3 p-1">
              <h1 className="text-2xl text-white font-semibold ml-2 my-2">
                Earlier
              </h1>
              <UserCommenCard likeNotification={likeNotification} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HideAndShowTab;
