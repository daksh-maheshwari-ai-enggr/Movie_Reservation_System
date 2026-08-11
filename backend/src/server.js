import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import { api } from "./routes.js";
const port = Number(process.env.PORT || 5000)
const corsOptions = {
origin: true,
credentials: true,
};
const app = express(),
  server = createServer(app),
  io = new Server(server, { cors: corsOptions });
app.use(cors(corsOptions));
app.use(express.json());
app.set("io", io);
app.use("/api", api);
app.get("/api/health", (req, res) =>
  res.json({
    ok: true,
    database: mongoose.connection.readyState === 1 ? "connected" : "connecting",
  }),
);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});
io.on("connection", (s) =>
  s.on("showtime:join", (id) => s.join(`showtime:${id}`)),
);
if (!process.env.MONGODB_URI)
  throw new Error("MONGODB_URI is missing. Add it to backend/.env.");
mongoose
  .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() =>
    server.listen(port, () =>
      console.log(`API ready on http://localhost:${port}`),
    ),
  )
  .catch((error) => {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  });
