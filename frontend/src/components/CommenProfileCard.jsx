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
            : "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy-800x789.png"
        }
      />
      <div>
        <h1 className="text-xl font-semibold">{userName}</h1>
        <h4 className="text-[18px] text-gray-500 flex gap-2">{bio.substring(0,22)}...</h4>
      </div>
      <div className="flex justify-end flex-1">
        <h1 className="text-xl font-semibold text-blue-600">Following</h1>
      </div>
    </div>
  );
};

export default CommenProfileCard;
