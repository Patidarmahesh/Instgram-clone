import React from "react";
import { useSelector } from "react-redux";

const Message = ({ messages }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-4">
      {messages &&
        messages?.map(({ message, _id, senderId, createdAt }) => {
          const date = new Date(createdAt);
          const formattedDate = date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          });
          return (
            <>
              <h1
                className={`flex text-xl text-slate-500 px-5 ${
                  senderId === user?._id ? "justify-end" : "justify-start"
                }`}
              >
                {formattedDate}
              </h1>
              <div
                key={_id}
                className={`flex px-5 ${
                  senderId === user?._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    senderId === user?._id ? "bg-blue-600" : "bg-gray-500"
                  } text-xl p-2 rounded-tr-lg rounded-bl-lg`}
                >
                  {message}
                </div>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default Message;
