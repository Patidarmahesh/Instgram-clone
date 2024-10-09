import React from "react";
import Feed from "./feed";
import Rightsidebar from "./rightsidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="md:max-w-[84%] w-full md:ml-[16%] md:p-5 flex dark:bg-black">
      <div className="w-[100%] md:w-[72%]">
        <Feed />
        <Outlet />
      </div>
      <div className="hidden md:block md:w-[28%]">
        <Rightsidebar />
      </div>
    </div>
  );
};

export default Home;
