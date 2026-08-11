import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import theaterRoutes from './routes/theaterRoutes.js';
import screenRoutes from './routes/screenRoutes.js';
import seatRoutes from './routes/seatRoutes.js';

import seatCategoryRoutes from './routes/seatCategoryRoutes.js';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/seat-categories', seatCategoryRoutes);

connectDB();

app.use('/api/theaters', theaterRoutes);
app.use('/api/screens', screenRoutes);
app.use('/api/seats', seatRoutes);

app.get('/', (req, res) => {
  res.send('🎬 CINEVAULT API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] 🚀 Express Application running on: http://localhost:${PORT}`);
});