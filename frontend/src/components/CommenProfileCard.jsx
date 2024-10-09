import React from "react";

const CommenProfileCard = ({ user }) => {
  const { userName, profilePicture, bio } = user;
  return (
    <div className="flex mb-2 items-center gap-3 p-2 cursor-pointer text-white hover:text-white hover:bg-[#212121] duration-700 rounded-md px-2">
      <img
        className="h-16 w-16 rounded-full object-cover"
        src={
          profilePicture
            ? profilePicture
            : "https://scontent.fidr4-2.fna.fbcdn.net/v/t1.30497-1/115870214_694925034696967_1870022665148339563_n.jpg?stp=dst-jpg_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=7565cd&_nc_ohc=oN3WJRrI1j4Q7kNvgHH5ota&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fidr4-2.fna&_nc_gid=AoSHG9fW9jsVsxQv5JHallV&oh=00_AYA_r-ZR-HdYd032-AfO7Nrd-v3FwatCvubRxj3E_8qfUw&oe=66F70922"
        }
      />
      <div>
        <h1 className="text-xl font-semibold">{userName}</h1>
        <h4 className="text-[18px] text-gray-500 flex gap-2">{bio}</h4>
      </div>
      <div className="flex justify-end flex-1">
        <h1 className="text-xl font-semibold text-blue-600">Following</h1>
      </div>
    </div>
  );
};

export default CommenProfileCard;
