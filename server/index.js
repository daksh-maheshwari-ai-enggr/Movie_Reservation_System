const express = require("express");
const app = express();

const connectDB = require("./config/db.js");

const movieRoutes = require("./routes/movies.routes.js");
const theaterRoutes = require("./routes/theater.routes.js");
const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});