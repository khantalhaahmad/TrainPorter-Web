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
    fareBreakdown: {
  baseFare: {
    type: Number,
    default: 0,
  },

  luggageCharge: {
    type: Number,
    default: 0,
  },

  peakCharge: {
    type: Number,
    default: 0,
  },

  nightCharge: {
    type: Number,
    default: 0,
  },
  platformFee: {
    type: Number,
    default: 0,
  },

  gst: {
    type: Number,
    default: 0,
  },

  total: {
    type: Number,
    default: 0,
  },
},
assignedPorter: {
  porterId: {
    type: String,
    default: "DUMMY_PORTER_001",
  },
  name: {
    type: String,
    default: "Dummy Porter",
  },
  phone: {
    type: String,
    default: "9999999999",
  },
},
    status: {
      type: String,
      enum: [
  "pending",
  "assigned",
  "accepted",
  "arrived",
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