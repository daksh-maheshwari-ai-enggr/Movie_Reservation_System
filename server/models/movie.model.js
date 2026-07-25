const mongoose=require("mongoose")

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    genre: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    rating: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    director: {
      type: String,
      required: true,
    },

    cast: [
      {
        type: String,
      },
    ],

    poster: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports=Movie