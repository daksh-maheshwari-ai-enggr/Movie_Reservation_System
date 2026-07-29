import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import theaterRoutes from './routes/theaterRoutes.js';
import screenRoutes from './routes/screenRoutes.js';
import seatRoutes from './routes/seatRoutes.js';

// Load environment variables from the .env file into process.env
dotenv.config();

/**
 * Initialize Express Application
 */
const app = express();

/**
 * ==========================================
 * Global Middleware Configuration
 * ==========================================
 */

// Enable Cross-Origin Resource Sharing (CORS) so the frontend can make API requests
app.use(cors());

// Built-in middleware to parse incoming JSON payloads in the request body
app.use(express.json());

/**
 * ==========================================
 * Database Initialization
 * ==========================================
 */
// Establishes connection to MongoDB Atlas
connectDB();

/**
 * ==========================================
 * API Route Mounting (Module 4)
 * ==========================================
 */
app.use('/api/theaters', theaterRoutes);
app.use('/api/screens', screenRoutes);
app.use('/api/seats', seatRoutes);

/**
 * @route   GET /
 * @desc    Root health-check endpoint to verify the API is alive
 * @access  Public
 */
app.get('/', (req, res) => {
  res.send('🎬 CINEVAULT API is running...');
});

/**
 * ==========================================
 * Server Initialization
 * ==========================================
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] 🚀 Express Application running on: http://localhost:${PORT}`);
});