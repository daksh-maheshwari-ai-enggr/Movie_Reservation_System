import mongoose from 'mongoose';

/**
 * @module TheaterSchema
 * @description Defines the structure for physical cinema locations (Theaters).
 */
const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a theater name'],
      trim: true,
    },
    // --- NEW FIELDS TO MATCH FRONTEND FORM ---
    rows: {
      type: Number,
      required: true,
    },
    seatsPerRow: {
      type: Number,
      required: true,
    },
    totalCapacity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    // -----------------------------------------
    
    // Removed 'required: true' from city/address so the frontend doesn't fail
    city: {
      type: String,
      trim: true,
      default: 'Unspecified',
    },
    address: {
      type: String,
      trim: true,
      default: 'Unspecified',
    },
    contactNumber: {
      type: String,
      default: 'N/A',
      trim: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Theater = mongoose.model('Theater', theaterSchema);

export default Theater;