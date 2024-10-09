import React from "react";
import HideAndShowTab from "./hideAndShowTab";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const Leftsidebar = ({
  showTab,
  sidebarItem,
  sidebarClickHandler,
  setKeyword,
  showLeftTab,
  keyword,
}) => {
  const { likeNotification } = useSelector((state) => state.appNotification);

  return (
    <>
      <div
        className={`fixed left-0 bg-black top-0 border-r border-gray-600 ${
          showTab
            ? "w-[28%] z-10 duration-500 transition-all ease-linear"
            : "w-[16%] ease-linear duration-500 transition-all"
        } h-screen p-2 hidden md:block`}
      >
        <div
          className={`${
            showTab ? "h-12 mb-5 w-10 mt-8 ml-4" : "h-16 w-full mt-8"
          }`}
        >
          {!showTab ? (
            <img
              className="w-full h-full object-cover"
              src="/src/assets/pngtree-instagram-icon-png-image_3584859-removebg-preview.png"
            />
          ) : (
            <img
              className="w-full h-full object-cover"
              src="https://static01.nyt.com/images/2016/05/11/us/12xp-instagram/12xp-instagram-videoSixteenByNineJumbo1600-v2.jpg"
            />
          )}
        </div>
        <div className={`flex flex-col ${showTab && "w-16"} gap-6 pt-4 p-1`}>
          {sidebarItem.map((item, index) => {
            return (
              <div
                onClick={() => sidebarClickHandler(item.name)}
                key={index}
                className="text-2xl text-gray-500 p-3 flex items-center duration-200 gap-6 hover:bg-slate-500 hover:text-white rounded-md  cursor-pointer"
              >
                {item.name === "Notifications" &&
                likeNotification.length > 0 ? (
                  <>
                    <Badge
                      badgeContent={likeNotification.length}
                      color="primary"
                      className="text-3xl"
                    >
                      {item.icon}
                    </Badge>
                    {showTab ? "" : item.name}
                  </>
                ) : (
                  <>
                    <span className="text-3xl">{item.icon}</span>
                    {showTab ? "" : item.name}
                  </>
                )}
              </div>
            );
          })}
        </div>
        {showTab && (
          <HideAndShowTab
            showLeftTab={showLeftTab}
            keyword={keyword}
            setKeyword={setKeyword}
          />
        )}
      </div>
    </>
  );
};

export default Leftsidebar;
