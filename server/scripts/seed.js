const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Booking = require('../models/Booking');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    
    await User.deleteMany();
    await Booking.deleteMany();

    const createdUser = await User.create({
      name: 'Alex Rivera',
      email: 'alex.rivera@cinevault.demo',
      phone: '+1 (415) 555-0148',
      address: 'San Francisco, CA',
      role: 'Member',
      avatarUrl: '',
      joinedDate: '2024-03-12',
    });

    await Booking.insertMany([
      {
        user: createdUser._id,
        filmTitle: 'Neon Frontier',
        genre: 'Sci-Fi',
        theater: 'CinéVault Downtown — Hall 3',
        showDate: '2026-08-02',
        showTime: '19:30',
        seats: ['G4', 'G5'],
        amount: 24.0,
        status: 'confirmed',
      },
      {
        user: createdUser._id,
        filmTitle: 'The Venetian Heist',
        genre: 'Thriller',
        theater: 'CinéVault Riverside — Hall 1',
        showDate: '2026-06-14',
        showTime: '21:00',
        seats: ['D2'],
        amount: 13.5,
        status: 'completed',
      },
    ]);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
