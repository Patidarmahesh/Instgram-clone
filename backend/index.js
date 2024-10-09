import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDataBase from "./connectDb/index.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import messageRoute from "./routes/messageRoute.js";
import { app,server } from "./socket/socket.js";
dotenv.config({});

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const PORT = process.env.PORT;

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption))
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  connectDataBase();
  console.log(`server listen at port ${PORT}`);
});
