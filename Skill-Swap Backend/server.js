import chatRoutes from "./routes/chatRoutes.js";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import barterRoutes from "./routes/barterRoutes.js";
import http from "http";
import { Server } from "socket.io";
import connect_DB from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

connect_DB();

const app = express();
// app.use(cors());
const allowedOrigins = [
  "http://localhost:5173",
  "*", // for local testing
];
app.use(express.json());

// app.use(cors({
//   origin: '*',
//   credentials: true, // Allow cookies or auth headers
//   allowedHeaders: ["Content-Type", "Authorization"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// }));

app.use(
  cors({
    origin: "http://localhost:5173", // no wildcard
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(cookieParser());

const server = http.createServer(app); // <---- this creates the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    transports: ["websocket", "polling"],
  },
  path: "/socket.io",
});

const userSocketMap = {};

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/skill", skillRoutes);
app.use("/api/barter", barterRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("API is running............");
});
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  console.log(`New client connected: ${socket.id}`);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    io.to(data.roomId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
