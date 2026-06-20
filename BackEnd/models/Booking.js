const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    porterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    trainNumber: {
      type: String,
      required: true,
    },

    trainName: {
      type: String,
      required: true,
    },

    station: {
      type: String,
      required: true,
    },

    coach: {
      type: String,
      required: true,
    },

    seatNumber: {
      type: String,
      required: true,
    },

    luggageCount: {
      type: Number,
      default: 1,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "in_progress",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);