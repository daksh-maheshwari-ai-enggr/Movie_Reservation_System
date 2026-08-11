const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    theater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theater",
      required: true,
    },

    startTime: {
      type: Date,
      required: true,
    },

    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },

  },
  {
    timestamps: true,
  }
);

const Showtime = mongoose.model("Showtime", showtimeSchema);

module.exports = Showtime;