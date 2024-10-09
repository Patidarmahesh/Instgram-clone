import React, { useRef } from "react";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { readFileAsDataUri } from "@/helper/utils";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPost } from "@/redux/postSlice";
import { GetRequest } from "@/apiHandler/apiHandler";

const CreatePostModal = ({ open, handleClose }) => {
  const imageRef = useRef();
  const [file, setFile] = React.useState("");
  const [selectedImagePrev, setSelectedImagePrev] = React.useState("");
  const [nextButton, setNextButton] = React.useState(false);
  const [caption, setCaption] = React.useState("");
  const dispatch = useDispatch();
  const addEmoji = (emoji) => () => setCaption(`${text}${emoji}`);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUri = await readFileAsDataUri(file);
      setSelectedImagePrev(dataUri);
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

  const postHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      if (selectedImagePrev) {
        formData.append("image", file);
      }
      const response = await axios.post(
        "http://localhost:8000/api/v1/post/createpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        toast(response?.data?.message);
        getAllPost()
        setFile("");
        setNextButton("");
        setSelectedImagePrev("");
        setCaption("");
        handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex justify-center items-center border-none rounded-md"
    >
      <div className="md:w-[46%] w-[94%] md:min-h-[450px] bg-gray-600 flex flex-col rounded-md">
        {selectedImagePrev ? (
          <div className="flex justify-between border-slate-400 py-5 border-b px-2">
            <h1
              onClick={() => {
                setNextButton(false);
                setSelectedImagePrev("");
              }}
              className="text-blue-500 text-xl font-semibold cursor-pointer hover:text-blue-700 duration-200"
            >
              Prev
            </h1>
            <h1 className="text-white text-2xl text-center font-medium">
              Create new post
            </h1>
            <h1
              onClick={() => setNextButton(true)}
              className="text-blue-500 text-xl font-semibold cursor-pointer hover:text-blue-700 duration-200"
            >
              Next
            </h1>
          </div>
        ) : (
          <h1 className="text-white text-2xl text-center border-slate-400 py-5 border-b font-medium">
            Create new post
          </h1>
        )}
        <div className="text-white gap-y-5 md:h-[450px] h-[300px] w-full">
          {selectedImagePrev ? (
            nextButton ? (
              <div className="flex flex-col gap-2">
                <div className="h-24 w-full border-slate-400 border-b"></div>
                <Textarea
                  placeholder={`Share youre thought ${"mayank"} .......`}
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  minRows={8}
                  maxRows={8}
                  startDecorator={
                    <Box sx={{ display: "flex", gap: 0.5, flex: 1 }}>
                      <IconButton
                        variant="outlined"
                        color="neutral"
                        onClick={addEmoji("👍")}
                      >
                        👍
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        color="neutral"
                        onClick={addEmoji("🏖")}
                      >
                        🏖
                      </IconButton>
                      <IconButton
                        variant="outlined"
                        color="neutral"
                        onClick={addEmoji("😍")}
                      >
                        😍
                      </IconButton>
                      <Button
                        variant="outlined"
                        color="neutral"
                        sx={{ ml: "auto" }}
                      >
                        See all
                      </Button>
                    </Box>
                  }
                  endDecorator={
                    <Typography level="body-xs" sx={{ ml: "auto" }}>
                      {caption.length} character(s)
                    </Typography>
                  }
                  sx={{ minWidth: 300 }}
                />
                <button
                  onClick={postHandler}
                  className="bg-blue-300 p-4 w-[98%] mx-2 hover:bg-blue-800 duration-200 text-xl text-center rounded-md"
                >
                  Create Post
                </button>
              </div>
            ) : (
              <img
                className="md:object-contain object-cover rounded-b-md md:h-[450px] h-[300px] w-full"
                src={selectedImagePrev}
              />
            )
          ) : (
            <div className="justify-center items-center w-full h-full flex flex-col gap-y-5">
              <img
                className="w-[28%] rounded-md"
                src={"src/assets/wp2120811-removebg-preview.png"}
              />
              <input
                type="file"
                ref={imageRef}
                onChange={fileChangeHandler}
                className="hidden"
              />
              <h1 className="text-2xl">Drag photos and videos here</h1>
              <button
                onClick={() => imageRef.current.click()}
                className="bg-blue-500 p-4 rounded-md text-xl hover:bg-blue-800 duration-200"
              >
                Select From Computer
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
