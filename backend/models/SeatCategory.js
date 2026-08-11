import mongoose from 'mongoose';

const seatCategorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    enum: ['Silver', 'Gold', 'Platinum', 'Recliner'], 
    required: true,
    unique: true 
  },
  price: { 
    type: Number, 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model('SeatCategory', seatCategorySchema);