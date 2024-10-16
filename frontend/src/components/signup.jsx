import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signupSchema } from "@/schema/userSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const signupHandler = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        toast(response?.data?.message);
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex justify-center bg-white items-center h-screen w-full md:gap-2">
      <div className="w-[26%] hidden md:block relative">
        <img src="src/assets/home-phones-2x.png" className="w-full h-30" />
        <img
          src="src/assets/login2.png"
          className="absolute z-10 top-6 w-[54%] h-[86%] left-[33.4%]"
        />
      </div>
      <form
        onSubmit={handleSubmit(signupHandler)}
        className={`shadow-lg border border-gray-100 rounded-md  flex flex-col p-6 ${
          errors?.userName || errors?.email || errors?.password
            ? "gap-4"
            : "gap-8"
        } md:w-[26%]`}
      >
        <div className="md:my-4 my-1">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img
              className="h-12 w-12 object-cover"
              src="https://www.seekpng.com/png/detail/472-4727621_instagram-logo-png-format-click-here-to-download.png"
            />
            <h4 className="text-xl capitalize font-bold underline">
              Instagram
            </h4>
          </div>
          <p className="font-bold text-md text-slate-500 text-center">
            Signup, to see photo & videos from youre friends!
          </p>
        </div>
        <TextField
          className="w-full"
          id="outlined-search"
          label="Username"
          name="userName"
          {...register("userName")}
          error={!!errors?.userName}
        />
        {errors?.userName && (
          <span className="mt-[-14px] text-red-500">
            {errors?.userName?.message}
          </span>
        )}
        <TextField
          className="w-full"
          id="outlined-search"
          label="Email."
          name="email"
          {...register("email")}
          error={!!errors?.email}
        />
        {errors?.email && (
          <span className="mt-[-14px] text-red-500">
            {errors?.email?.message}
          </span>
        )}
        <FormControl className="w-full" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            {...register("password")}
            error={!!errors?.password}
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
            label="Password"
          />
        </FormControl>
        {errors?.password && (
          <span className="mt-[-14px] text-red-500">
            {errors?.password?.message}
          </span>
        )}
        {loading ? (
          <button
            type="submit"
            className="bg-slate-800 flex justify-center items-center text-white p-3 rounded-md"
          >
            <CircularProgress className="p-2 animate-spin" />
            Please wait
          </button>
        ) : (
          <button
            type="submit"
            className="bg-slate-800 text-white p-3 rounded-md"
          >
            Signup
          </button>
        )}

        <span className="text-center text-md text-slate-400">
          Already have an account?{" "}
          <Link className="text-blue-600" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
