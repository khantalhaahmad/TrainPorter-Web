const mongoose = require("mongoose");

const porterSchema = new mongoose.Schema(
  {
    // ==========================
    // User Reference
    // ==========================

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PorterApplication",
      required: true,
      unique: true,
    },

    // ==========================
    // Basic Details
    // ==========================

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },

    profilePhoto: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    // ==========================
    // Station Details
    // ==========================

    preferredStation: {
      type: String,
      required: true,
      trim: true,
    },

    stationCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    // ==========================
    // Working Status
    // ==========================

    availabilityStatus: {
      type: String,
      enum: [
        "online",
        "offline",
        "busy",
      ],
      default: "offline",
    },

    isAvailable: {
      type: Boolean,
      default: false,
    },

    // ==========================
    // Performance
    // ==========================

    totalBookings: {
      type: Number,
      default: 0,
    },

    completedBookings: {
      type: Number,
      default: 0,
    },

    cancelledBookings: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    // ==========================
    // Earnings
    // ==========================

    walletBalance: {
      type: Number,
      default: 0,
    },

    lifetimeEarnings: {
      type: Number,
      default: 0,
    },

    todayEarnings: {
      type: Number,
      default: 0,
    },

    // ==========================
    // Current Booking
    // ==========================

    currentBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },

    // ==========================
    // Verification
    // ==========================

    isVerified: {
      type: Boolean,
      default: true,
    },

    // ==========================
    // Location
    // ==========================

    currentLatitude: {
      type: Number,
      default: null,
    },

    currentLongitude: {
      type: Number,
      default: null,
    },

    lastSeenAt: {
      type: Date,
      default: Date.now,
    },

    // ==========================
    // Device
    // ==========================

    deviceToken: {
      type: String,
      default: "",
    },

    // ==========================
    // Account Status
    // ==========================

    accountStatus: {
      type: String,
      enum: [
        "active",
        "inactive",
        "suspended",
      ],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// ==========================
// Indexes
// ==========================

porterSchema.index({
  stationCode: 1,
});

porterSchema.index({
  availabilityStatus: 1,
});

porterSchema.index({
  accountStatus: 1,
});

porterSchema.index({
  averageRating: -1,
});

porterSchema.index({
  currentLatitude: 1,
  currentLongitude: 1,
});

module.exports = mongoose.model(
  "Porter",
  porterSchema
);