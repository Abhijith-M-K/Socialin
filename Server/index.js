import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import ChatRoute from "./Routes/ChatRoute.js"
import MessageRoute from "./Routes/MessageRoute.js"
import CommentRoute from "./Routes/CommentRoute.js"
import { adminLogin, adminRegister, blockUser, getFullUsers, unBlockUser } from "./Controllers/AdminController.js";
// import {adminLogin,adminRegister,getFullUsers} from "./Routes/AdminRoute.js";



//Routes

const app = express();

//to serves images for public

app.use(express.static("public"));
app.use("/images", express.static("images"));

//Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin:["https://socialin.netlify.app"],
  credentials:true
}));
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

//usage of routes

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/chat",ChatRoute);
app.use('/comment', CommentRoute);
app.use("/message",MessageRoute);
app.post("/admin/register",adminRegister);
app.post("/admin/login",adminLogin);
app.get("/admin/get-users",getFullUsers)
app.post("/admin/block-user",blockUser)
app.post("/admin/unblock-user",unBlockUser)
            
