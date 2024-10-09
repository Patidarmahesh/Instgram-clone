import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import Leftsidebar from "./leftsidebar";
import Mobilenavbar from "./mobileNavbar";
import CreatePostModal from "./createPostModal";

const Mainlayout = () => {
  const [open, setOpen] = React.useState(false);
  const [showLeftTab, setShowLeftTab] = React.useState("");
  const [showTab, setShowTab] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchAndNoticationHandler = () => setShowTab(!showTab);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sidebarItem = [
    {
      icon: <IoHome />,
      name: "Home",
    },
    {
      icon: <CiSearch />,
      name: "Search",
    },
    {
      icon: <MdOutlineExplore />,
      name: "Explore",
    },
    {
      icon: <AiFillMessage />,
      name: "Messages",
    },
    {
      icon: <CiHeart />,
      name: "Notifications",
    },
    {
      icon: <CiSquarePlus />,
      name: "Create",
    },
    {
      icon: (
        <Avatar
          alt="Travis Howard"
          src="https://tse1.mm.bing.net/th?id=OIP.boU1BWqg7BrJ7TiacMTcUQHaJ4&pid=Api&P=0&h=220"
        />
      ),
      name: "Profile",
    },
    {
      icon: <IoIosMenu />,
      name: "Logout",
    },
  ];

  const logoutHandler = async () => {
    console.log("logout");
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/logout",
        { withCredentials: true }
      );
      const { success, message } = response?.data;
      if (success) {
        dispatch(setAuthUser(null));
        toast.success(message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  const sidebarClickHandler = (textType) => {
    setShowLeftTab(textType);
    if (textType === "Home") {
      navigate("/");
    } else if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      handleOpen();
    } else if (textType === "Profile") {
      navigate(`/profile/${user._id}`);
    } else if (textType === "Search") {
      searchAndNoticationHandler();
    } else if (textType === "Notifications") {
      searchAndNoticationHandler();
    } else if (textType === "Messages") {
      navigate("/chat")
    }else if (textType === "Explore") {
      navigate("/explore")
    }
  };
  return (
    <div>
      <Leftsidebar
        sidebarItem={sidebarItem}
        sidebarClickHandler={sidebarClickHandler}
        showTab={showTab}
        showLeftTab={showLeftTab}
        setShowLeftTab={setShowLeftTab}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <CreatePostModal open={open} handleClose={handleClose} />
      <div className="md:block hidden">
        <Outlet />
      </div>
      <Mobilenavbar sidebarItem={sidebarItem} />
    </div>
  );
};

export default Mainlayout;
