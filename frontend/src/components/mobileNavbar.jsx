import React from "react";
import { Outlet } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Mobilenavbar = ({ sidebarItem }) => {
  return (
    <div className="w-full  md:hidden block">
      <div className="w-full h-screen flex flex-col justify-between">
        <div className="h-20 bg-green-500 fixed top-0 left-0 right-0 z-10">
          <div className="flex w-full">
            {sidebarItem.map((item, index) => {
              return (
                <>
                  {item.name === "Search" || item.name === "Notifications" ? (
                    <div
                      key={index}
                      className="flex items-center w-full h-20 justify-center p-4 relative px-2"
                    >
                      {item.name === "Search"?<><input className="w-[280px] p-3 ml-3 rounded-md text-2xl focus:outline-0 pl-10 bg-gray-500 text-white" placeholder="search here..."/> <CiSearch className="absolute top-[31px] left-8 text-white text-2xl"/></>:<span className="text-[40px] font-bold">{item.icon}</span>}
                    </div>
                  
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className="w-full h-full overflow-auto mt-16">
          <Outlet />
        </div>
        <div className="h-20 bg-green-500 fixed left-0 right-0 bottom-0">
          <div className="flex h-full">
            {sidebarItem.map((item, index) => {
              return (
                <>
                  {item.name === "Search" || item.name === "Notifications" ? (
                    ""
                  ) : (
                    <div
                      key={index}
                      className="flex items-center justify-center h-[100%] w-full"
                    >
                      <span className="text-3xl text-black">{item.icon}</span>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobilenavbar;
