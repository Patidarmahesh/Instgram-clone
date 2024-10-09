import React from "react";

const ChatCard = ({ online, item }) => {
  const { userName, profilePicture } = item;
  return (
    <div className="flex w-full hover:bg-[#212121] hover:text-white p-2 cursor-pointer duration-200 transition-all bg-gray-600 items-center rounded-md gap-4">
      <img
        className="h-20 w-20 rounded-full"
        src={
          profilePicture
            ? profilePicture
            : "https://scontent.fidr4-2.fna.fbcdn.net/v/t1.30497-1/115870214_694925034696967_1870022665148339563_n.jpg?stp=dst-jpg_s100x100&_nc_cat=1&ccb=1-7&_nc_sid=7565cd&_nc_ohc=cCyDYVsZ-VsQ7kNvgEiJn_4&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fidr4-2.fna&oh=00_AYAv3G5AMRHK6M7p31bSA7WVnGTYTbdNnXVPOLxN_rfD5w&oe=66F38522"
        }
        alt="error"
      />
      <div className="flex justify-start flex-col gap-1 text-xl">
        <h1 className="text-2xl font-semibold">__{userName}__</h1>
        {online ? (
          <h4 className="text-green-700 text-2xl font-bold">online</h4>
        ) : (
          <h4 className="text-red-700 text-2xl font-bold">offline</h4>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
