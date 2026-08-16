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
  ref: "Porter",
  default: null,
},

bookingId: {
  type: String,
  unique: true,
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
paymentStatus: {
  type: String,
  enum: [
    "pending",
    "paid",
    "failed",
    "refunded",
  ],
  default: "paid",
},

paymentMethod: {
  type: String,
  enum: [
    "UPI",
    "CARD",
    "NET_BANKING",
    "WALLET",
    "COD",
  ],
  default: "UPI",
},

transactionId: {
  type: String,
  default: "",
},

paidAt: {
  type: Date,
  default: Date.now,
},

// ==========================
// Payment Gateway
// ==========================

gateway: {
  type: String,
  enum: [
    "MANUAL",
    "RAZORPAY",
    "PHONEPE",
    "PAYTM",
    "STRIPE",
  ],
  default: "MANUAL",
},

gatewayTransactionId: {
  type: String,
  default: "",
},

gatewayResponse: {
  type: mongoose.Schema.Types.Mixed,
  default: {},
},

// ==========================
// Refund
// ==========================

refundAmount: {
  type: Number,
  default: 0,
},

refundReason: {
  type: String,
  default: "",
},

refundedAt: {
  type: Date,
  default: null,
},

// ==========================
// Failure
// ==========================

failureReason: {
  type: String,
  default: "",
},

assignedPorter: {

  porterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Porter",
    default: null,
  },

  name: {
    type: String,
    default: "",
    trim: true,
  },

  phone: {
    type: String,
    default: "",
    trim: true,
  },

  profilePhoto: {
    type: String,
    default: "",
  },

  station: {
    type: String,
    default: "",
    trim: true,
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

},

// ==========================
// Booking Status
// ==========================

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

// ==========================
// Payment Timeline
// ==========================

paymentTimeline: {

  bookingCreatedAt: {
    type: Date,
    default: Date.now,
  },

  paymentInitiatedAt: {
    type: Date,
    default: Date.now,
  },

  paymentCompletedAt: {
    type: Date,
    default: null,
  },

},

// ==========================
// Completion
// ==========================

completedAt: {
  type: Date,
  default: null,
},

},
{
  timestamps: true,
}
);

// ==========================
// Indexes
// ==========================

bookingSchema.index({
  paymentStatus: 1,
});

bookingSchema.index({
  paymentMethod: 1,
});

bookingSchema.index({
  transactionId: 1,
});

bookingSchema.index({
  paidAt: -1,
});

bookingSchema.index({
  createdAt: -1,
});

// ==========================
// Auto Generate Booking ID
// ==========================

bookingSchema.pre("save", async function () {

  if (this.bookingId) {
    return;
  }

  const Booking = mongoose.model("Booking");

  const count = await Booking.countDocuments();

  this.bookingId =
    `BK-${new Date().getFullYear()}-${String(count + 1).padStart(6, "0")}`;

});

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);