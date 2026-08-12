const mongoose = require('mongoose');

/**
 * @module SeatSchema
 * @description Defines the structure for individual seats within a specific cinema screen.
 * Manages seat categorization, pricing, and availability status.
 */
const seatSchema = new mongoose.Schema(
  {
    
    screen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Screen',
      required: [true, 'A seat must belong to a specific screen'],
    },
    /**
     * Row identifier (e.g., 'A', 'B', 'C')
     */
    row: {
      type: String,
      required: [true, 'Row letter is required'],
      uppercase: true,
      trim: true,
    },
    /**
     * Seat number within the row (e.g., 1, 2, 3)
     */
    number: {
      type: Number,
      required: [true, 'Seat number is required'],
      min: [1, 'Seat number must be at least 1'],
    },
    /**
     * Combined alphanumeric label (e.g., 'A1', 'C8')
     */
    seatLabel: {
      type: String,
      required: [true, 'Seat label is required (e.g., A1)'],
      trim: true,
    },
    /**
     * Seat tier category determining physical type and base pricing.
     */
    category: {
      type: String,
      enum: {
        values: ['Silver', 'Gold', 'Platinum', 'Recliner'],
        message: '{VALUE} is not a valid seat category'
      },
      default: 'Silver',
      required: [true, 'Seat category is required'],
    },
    /**
     * Cost for this specific seat tier.
     */
    price: {
      type: Number,
      required: [true, 'Seat price is required'],
      min: [0, 'Price cannot be negative'],
    },
    /**
     * Current reservation status.
     * Crucial for concurrency control to prevent double-booking.
     */
    status: {
      type: String,
      enum: {
        values: ['Available', 'Reserved', 'Booked', 'Blocked'],
        message: '{VALUE} is not a valid reservation status'
      },
      default: 'Available',
    },
  },
  {
    timestamps: true, // Automatically generates 'createdAt' and 'updatedAt' fields
  }
);

/**
 * @description Compound Database Index
 * Guarantees data integrity by ensuring no duplicate seat labels (e.g., two "A1" seats)
 * can ever be created within the exact same screen.
 */
seatSchema.index({ screen: 1, seatLabel: 1 }, { unique: true });

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;