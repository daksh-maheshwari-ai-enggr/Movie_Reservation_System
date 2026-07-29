const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },

    seatNumber: {
      type: String,
      required: true,
    },

    row: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["Silver", "Gold", "Platinum", "Recliner"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "locked", "booked"],
      default: "available",
    },

    lockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    lockedUntil: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Seat", seatSchema);