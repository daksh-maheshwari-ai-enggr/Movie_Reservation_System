const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    filmTitle: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    posterUrl: {
      type: String,
      default: '',
    },
    theater: {
      type: String,
    },
    showDate: {
      type: String, // format YYYY-MM-DD
    },
    showTime: {
      type: String, // format HH:MM
    },
    seats: {
      type: [String],
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id.toString();
  return object;
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
