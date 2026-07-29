const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const seatRoutes = require("./routes/seatRoutes");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/seats", seatRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🎬 Movie Reservation Backend Running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});