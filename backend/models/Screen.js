import mongoose from 'mongoose';

/**
 * @module ScreenSchema
 * @description Defines the structure for cinema screens/auditoriums.
 * This schema acts as a child to the Theater model.
 */
const screenSchema = new mongoose.Schema(
  {
    /**
     * Relational Bridge: Connects this screen to a specific physical Theater building.
     * Uses MongoDB ObjectId to reference the parent Theater document.
     */
    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theater',
      required: [true, 'A screen must belong to a theater'],
    },
    name: {
      type: String,
      required: [true, 'Please provide a screen name (e.g., Grand Hall, Screen 1)'],
      trim: true,
    },
    projectionType: {
      type: String,
      enum: ['Standard 2D', '3D', 'IMAX', '4K Ultra HD'],
      default: 'Standard 2D',
    },
    soundSystem: {
      type: String,
      enum: ['Dolby Atmos', '7.1 Surround', '5.1 Surround', 'Standard'],
      default: 'Dolby Atmos',
    },
    totalRows: {
      type: Number,
      required: [true, 'Please specify the number of rows (e.g., 5)'],
      min: [1, 'Must have at least 1 row'],
    },
    seatsPerRow: {
      type: Number,
      required: [true, 'Please specify seats per row (e.g., 8)'],
      min: [1, 'Must have at least 1 seat per row'],
    },
    totalCapacity: {
      type: Number,
      required: [true, 'Total capacity is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically generates 'createdAt' and 'updatedAt' fields
  }
);

const Screen = mongoose.model('Screen', screenSchema);

export default Screen;