import React, { useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { BiShoppingBag } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import { ImBlocked } from "react-icons/im";
import { MdOutlineHideSource } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import { CiInstagram } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { MdOutlineNoAccounts } from "react-icons/md";
import { MdOutlineNotificationsOff } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { LuHeartOff } from "react-icons/lu";
import { RiDownload2Line } from "react-icons/ri";
import { LiaLanguageSolid } from "react-icons/lia";
import { FaLaptop } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { userProfileSchema } from "@/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateRequestById } from "@/apiHandler/apiHandler";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [file, setFile] = React.useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const imageRef = useRef();
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userProfileSchema) });

  const data = [
    {
      text: "How you use Instagram",
      button: [
        {
          icon: <CgProfile />,
          buttonText: "Edit profile",
        },
        {
          icon: <IoIosNotifications />,
          buttonText: "Notifications",
        },
      ],
    },
    {
      text: "Who can see your content",
      button: [
        {
          icon: <BiShoppingBag />,
          buttonText: "Account privacy",
        },
        {
          icon: <RiCloseCircleLine />,
          buttonText: "Close friends",
        },
        {
          icon: <ImBlocked />,
          buttonText: "Blocked",
        },
        {
          icon: <MdOutlineHideSource />,
          buttonText: "Hide story and live",
        },
      ],
    },
    {
      text: "How others can interact with you",
      button: [
        {
          icon: <MdOutlineMessage />,
          buttonText: "Messages and story replies",
        },
        {
          icon: <CiInstagram />,
          buttonText: "Tag and mentions",
        },
        {
          icon: <TfiCommentsSmiley />,
          buttonText: "Comments",
        },
        {
          icon: <FaRegShareFromSquare />,
          buttonText: "Sharing",
        },
        {
          icon: <MdOutlineNoAccounts />,
          buttonText: "Restricted account",
        },
      ],
    },
    {
      text: "What you see",
      button: [
        {
          icon: <MdOutlineNotificationsOff />,
          buttonText: "Muted accounts",
        },
        {
          icon: <GrGallery />,
          buttonText: "Content prefrences",
        },
        {
          icon: <LuHeartOff />,
          buttonText: "Like and share counts",
        },
      ],
    },
    {
      text: "Your app and media",
      button: [
        {
          icon: <RiDownload2Line />,
          buttonText: "Archiving and downloading",
        },
        {
          icon: <LiaLanguageSolid />,
          buttonText: "Language",
        },
        {
          icon: <FaLaptop />,
          buttonText: "Website permission",
        },
      ],
    },
    {
      text: "For families",
      button: [
        {
          icon: <LiaLanguageSolid />,
          buttonText: "Supervision",
        },
      ],
    },
    {
      text: "For professionals",
      button: [
        {
          icon: <FaLaptop />,
          buttonText: "Account type and tools",
        },
      ],
    },
    {
      text: "More info and support",
      button: [
        {
          icon: <IoMdHelpCircleOutline />,
          buttonText: "Help",
        },
        {
          icon: <MdOutlinePrivacyTip />,
          buttonText: "Privacy center",
        },
        {
          icon: <FiUser />,
          buttonText: "Account status",
        },
      ],
    },
  ];

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  // const setDefaultHandler = () =>{
  //   setValue("bio",user?.bio)
  //   setValue("profilePicture",user?.profilePicture)
  // }

  const editFormHandler = async (form) => {
    const formData = new FormData();
    const { currentpassword, confirmPassword, gender, bio } = form;
    if (currentpassword) formData.append("currentpassword", currentpassword);
    if (confirmPassword) formData.append("confirmPassword", confirmPassword);
    if (gender) formData.append("gender", gender);
    if (bio) formData.append("bio", bio);
    if (file) formData.append("profilePicture", file);
    const response = await updateRequestById(
      `/api/v1/user/profile/edit`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    console.log(response);

    const { success, message, user } = response?.data;
    console.log(response?.data);
    if (success) {
      toast.success(message);
      dispatch(setAuthUser(user));
      setFile("");
      reset();
      // setDefaultHandler()
    }
  };

  return (
    <div className="md:max-w-[84%] h-screen text-white w-full md:ml-[16%]  flex dark:bg-black">
      <div className="w-[30%] p-14 overflow-auto scroll-smooth">
        <h1 className="text-white text-2xl font-bold">Settings</h1>
        <div className=" bg-gray-600 rounded-md h-56 my-5"></div>
        {data.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-2">
              <h2 className="text-gray-400 text-xl my-3">{item.text}</h2>
              {item.button.map(({ icon, buttonText }, index) => {
                return (
                  <div
                    key={index}
                    className="p-4 rounded-md hover:bg-slate-400 duration-400 cursor-pointer flex items-center gap-3"
                  >
                    <h1 className="text-5xl">{icon}</h1>
                    <h1 className="text-2xl">{buttonText}</h1>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <form
        onSubmit={handleSubmit(editFormHandler)}
        className="border w-[60%] flex flex-col max-h-screen overflow-auto scroll-smooth p-12 gap-5"
      >
        <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
        <div className="bg-[rgba(181,178,178,0.2)] shadow-lg h-32 flex items-center gap-8 px-8 rounded-md">
          <img
            className="h-24 w-24 rounded-full object-cover cursor-pointer"
            src={user?.profilePicture?user?.profilePicture:"https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy-800x789.png"}
          />
          <div>
            <h1 className="text-xl text-white font-semibold">
              {user?.userName}
            </h1>
            <h4 className="text-xl text-gray-400">ραтι∂αя мαнєѕн</h4>
          </div>
          <input
            onChange={fileChangeHandler}
            className="hidden"
            type="file"
            ref={imageRef}
          />
          <button
            onClick={() => imageRef.current.click()}
            className="p-4 bg-blue-600 rounded-md text-xl cursor-pointer hover:bg-blue-400 duration-200"
          >
            Chnage photo
          </button>
        </div>
        <h1 className="text-2xl font-bold text-white">Website</h1>
        <>
          <div className="bg-[rgba(181,178,178,0.2)] shadow-lg p-4 text-xl rounded-md">
            Website
          </div>
          <h4 className="text-sm text-gray-400 -mt-2">
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </h4>
        </>
        <h1 className="text-2xl font-bold text-white">Bio</h1>
        <div className="bg-[rgba(181,178,178,0.2)] text-white shadow-lg rounded-md p-1">
          <TextField
            inputProps={{ style: { color: "white", padding: "1px" } }}
            className="bg-transparent w-64 p-2 my-4"
            multiline
            variant="standard"
            color="info"
            rows={4}
            name="bio"
            {...register("bio")}
            defaultValue={user?.bio}
          />
        </div>
        <h1 className="text-2xl font-bold text-white">Gender</h1>
        <>
          <select
            name="gender"
            {...register("gender")}
            className="bg-[rgba(181,178,178,0.2)] text-xl cursor-pointer overflow-auto shadow-lg flex items-center rounded-md p-2"
          >
            <option value="male" className="bg-gray-500 cursor-pointer text-xl">Male</option>
            <option value="Female" className="bg-gray-500 cursor-pointer text-xl">
              Female
            </option>
          </select>
          <h4 className="text-sm text-gray-400 -mt-2">
            This won't be part of your public profile.
          </h4>
        </>
        <>
          <Typography sx={{ color: "#6c757d" }}>Current Password</Typography>
          <FormControl sx={{ fontSize: "20px" }} variant="outlined">
            <OutlinedInput
              type={showPassword ? "text" : "password"}
              name="currentpassword"
              placeholder="Current Password"
              className="bg-[rgba(181,178,178,0.2)]"
              inputProps={{ style: { color: "white" } }}
              {...register("currentpassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className="text-red-700 text-xl">
            {errors.currentpassword?.message}
          </div>
          <Typography sx={{ color: "#6c757d" }}>New Password</Typography>
          <FormControl sx={{ fontSize: "20px" }} variant="outlined">
            <OutlinedInput
              name="password"
              className="bg-[rgba(181,178,178,0.2)]"
              placeholder="New Password"
              {...register("password")}
              inputProps={{ style: { color: "white" } }}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className="text-red-700 text-xl">{errors.password?.message}</div>
          <Typography sx={{ color: "#6c757d" }}>
            Confirm New Password
          </Typography>
          <FormControl sx={{ fontSize: "20px" }} variant="outlined">
            <OutlinedInput
              name="confirmPassword"
              inputProps={{ style: { color: "white" } }}
              className="bg-[rgba(181,178,178,0.2)]"
              placeholder="Confirm New Password"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className="text-red-700 text-xl">
            {errors.confirmPassword?.message}
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-xl p-2 rounded-md hover:bg-blue-400 duration-200"
          >
            save
          </button>
        </>
      </form>
    </div>
  );
};

export default EditProfile;
