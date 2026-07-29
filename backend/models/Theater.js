import mongoose from 'mongoose';

/**
 * @module TheaterSchema
 * @description Defines the structure for physical cinema locations (Theaters).
 * Serves as the top-level parent document for all Screens and Seats in the database.
 */
const theaterSchema = new mongoose.Schema(
  {
    /**
     * The official name of the theater branch (e.g., "CineVault Downtown").
     */
    name: {
      type: String,
      required: [true, 'Please provide a theater name'],
      trim: true,
    },
    /**
     * The city where the theater is located for geographical filtering.
     */
    city: {
      type: String,
      required: [true, 'Please provide the city'],
      trim: true,
    },
    /**
     * The full physical street address of the theater.
     */
    address: {
      type: String,
      required: [true, 'Please provide the physical address'],
      trim: true,
    },
    /**
     * Customer service contact number for this specific location.
     */
    contactNumber: {
      type: String,
      default: 'N/A',
      trim: true,
    },
    /**
     * List of facilities available at this location.
     * Example: ["Valet Parking", "Food Court", "Wheelchair Accessible"]
     */
    amenities: {
      type: [String],
      default: [],
    },
    /**
     * Operational status of the theater.
     * Allows admins to temporarily hide a theater (e.g., for renovations) without deleting it.
     */
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically generates 'createdAt' and 'updatedAt' fields
  }
);

const Theater = mongoose.model('Theater', theaterSchema);

export default Theater;