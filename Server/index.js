dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./Config/db.js";
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
  origin:["https://socialin.netlify.app","http://localhost:3000"],
  credentials:true
}));
connectDB();

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
            
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["https://socialin.netlify.app:8800", "http://localhost:3000","https://socialin.netlify.app"],
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    // if user is not added previously
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    // send all active users to new user
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, console.log(`server up and running on ${PORT}`));
