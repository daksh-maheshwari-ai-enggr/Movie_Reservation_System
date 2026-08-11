const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/User");
const Booking = require("../models/Booking");

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Booking.deleteMany();

    // Hash passwords
    const memberPassword = await bcrypt.hash("Alex@123", 10);
    const adminPassword = await bcrypt.hash("Admin@123", 10);

    // Create Member
    const member = await User.create({
      name: "Alex Rivera",
      email: "alex.rivera@cinevault.demo",
      password: memberPassword,
      phone: "+1 (415) 555-0148",
      address: "San Francisco, CA",
      role: "Member",
      avatarUrl: "",
      joinedDate: "2024-03-12",
    });

    // Create Admin
    await User.create({
      name: "Morgan Adeyemi",
      email: "morgan.adeyemi@cinevault.demo",
      password: adminPassword,
      phone: "+1 (415) 555-0188",
      address: "New York, NY",
      role: "Admin",
      avatarUrl: "",
      joinedDate: "2024-01-08",
    });

    // Seed bookings for Member
    await Booking.insertMany([
      {
        user: member._id,
        filmTitle: "Neon Frontier",
        genre: "Sci-Fi",
        theater: "CinéVault Downtown — Hall 3",
        showDate: "2026-08-02",
        showTime: "19:30",
        seats: ["G4", "G5"],
        amount: 24.0,
        status: "confirmed",
      },
      {
        user: member._id,
        filmTitle: "The Venetian Heist",
        genre: "Thriller",
        theater: "CinéVault Riverside — Hall 1",
        showDate: "2026-06-14",
        showTime: "21:00",
        seats: ["D2"],
        amount: 13.5,
        status: "completed",
      },
    ]);

    console.log("✅ Demo data imported successfully!");
    console.log("");
    console.log("Member Login");
    console.log("Email: alex.rivera@cinevault.demo");
    console.log("Password: Alex@123");
    console.log("");
    console.log("Admin Login");
    console.log("Email: morgan.adeyemi@cinevault.demo");
    console.log("Password: Admin@123");

    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error.message);
    process.exit(1);
  }
};

seedData();