const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    theatreName: {
      type: String,
      required: true,
    },

    screenName: {
      type: String,
      required: true,
    },

    showDate: {
      type: Date,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Show", showSchema);