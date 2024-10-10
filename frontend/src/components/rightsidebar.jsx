import React from "react";
import CommenProfileCard from "./CommenProfileCard";
import { GetRequest } from "@/apiHandler/apiHandler";
import { useSelector } from "react-redux";

const Rightsidebar = () => {
  const [suggestedUser, setSuggestedUser] = React.useState([]);
  const {user} = useSelector((state)=>state.auth)
  console.log(user)

  const getAllPost = async () => {
    const allPost = await GetRequest("/api/v1/user/suggested", {
      withCredentials: true,
    });
    const { success, users } = allPost?.data;
    if (success) {
      setSuggestedUser(users);
    } else {
    }
  };

  React.useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="">
      <CommenProfileCard user={user}/>
      <div className="flex justify-between items-center text-white p-1 my-5">
        <h1 className="text-xl text-gray-400">Suggested for you</h1>
        <h1 className="text-xl cursor-pointer hover:text-slate-300">See All</h1>
      </div>
      <div className="flex flex-col gap-4">
        {suggestedUser?.map((user) => (
          <CommenProfileCard user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

export default Rightsidebar;
