const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    rows: {
      type: Number,
      required: true,
    },

    seatsPerRow: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },
    
  },
  {
    timestamps: true,
  }
);

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;