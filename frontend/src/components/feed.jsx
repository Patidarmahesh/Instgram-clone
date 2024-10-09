import React, { useState } from "react";
import Post from "./post";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAddDarkMode, setRemoveDarkMode } from "@/redux/darkAndWhiteSlice";
import { setPost } from "@/redux/postSlice";
import { GetRequest } from "@/apiHandler/apiHandler";

const Feed = () => {
  const { post } = useSelector((state) => state.allPost);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  const { dark } = useSelector((store) => store.darkMode);
  const toogleDarkMode = () => {
    if (dark === "white") {
      dispatch(setAddDarkMode("dark"));
    } else if (dark === "dark") {
      dispatch(setRemoveDarkMode("white"));
    }
  };

  const getAllPost = async () => {
    const allPost = await GetRequest("/api/v1/post/getallpost", {
      withCredentials: true,
    });
    const { success, posts } = allPost?.data;
    if (success) {
      dispatch(setPost(posts));
    } else {
    }
  };

  React.useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* <div>
        <Button
          onClick={toogleDarkMode}
          variant="outlined"
          sx={{ background: "red", color: "black" }}
        >
          darkMode
        </Button>
      </div> */}
      {post?.map((item) => {
        return (
          <Post
            key={item._id}
            item={item}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
          />
        );
      })}
    </div>
  );
};

export default Feed;
