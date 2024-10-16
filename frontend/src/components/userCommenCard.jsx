import React from "react";

const UserCommenCard = ({ likeNotification }) => {
  return (
    <>
      {likeNotification?.map(({ postId, userDetails }) => (
        <div
          key={postId}
          className="flex mb-2 p-2 items-center gap-3 cursor-pointer text-white hover:text-white hover:bg-[#212121] duration-600 rounded-md px-2"
        >
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={
              userDetails.profilePicture
                ? userDetails.profilePicture
                : "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy-800x789.png"
            }
          />
          <div>
            <h1 className="text-xl font-semibold">{userDetails.userName}</h1>
            <h4 className="text-[18px] text-gray-500 flex gap-2">
              pictrure liked by {userDetails.userName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserCommenCard;
