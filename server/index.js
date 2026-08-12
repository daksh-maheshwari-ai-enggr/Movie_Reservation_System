const express = require("express");
const app = express();

const connectDB = require("./config/db.js");

const movieRoutes = require("./routes/movies.routes.js");
const theaterRoutes = require("./routes/theater.routes.js");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
// Theater Screen and Seat Management Routes
const screenRoutes = require("./routes/screenRoutes.js");
const seatCategoryRoutes = require("./routes/seatCategoryRoutes.js");
const seatRoutes = require("./routes/seatRoutes.js");
const pranayTheaterRoutes = require("./routes/theaterRoutes.js");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

// Authentication
app.use("/api/auth", authRoutes);

// Admin APIs
app.use("/api/admin", movieRoutes);
app.use("/api/admin", theaterRoutes);

// User APIs
app.use("/api/users", userRoutes);

// Theater Screen and Seat Management APIs
app.use("/api/screens", screenRoutes);
app.use("/api/seat-categories", seatCategoryRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/pranay-theaters", pranayTheaterRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});