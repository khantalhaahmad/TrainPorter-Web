const mongoose = require("mongoose");

const porterApplicationSchema = new mongoose.Schema(
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

    // ==========================
    // Personal Details
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
      trim: true,
      lowercase: true,
    },

    gender: {
      type: String,
      enum: [
        "Male",
        "Female",
        "Other",
      ],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    // ==========================
    // Address
    // ==========================

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
  type: String,
  required: true,
  trim: true,
},

    pincode: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================
    // Railway Details
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

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    languages: [
      {
        type: String,
      },
    ],

    // ==========================
    // Aadhaar
    // ==========================

    aadhaarNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // ==========================
    // Bank Details
    // ==========================

    accountHolder: {
      type: String,
      required: true,
      trim: true,
    },

    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },

    ifscCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    upiId: {
      type: String,
      default: "",
      trim: true,
    },
bankName: {
  type: String,
  required: true,
  trim: true,
},
    // ==========================
    // Emergency Contact
    // ==========================

    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================
    // Cloudinary Documents
    // ==========================

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

    aadhaarFront: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    aadhaarBack: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    railwayLicense: {
      publicId: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },

    policeVerification: {
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
    // Verification
    // ==========================

    isPhoneVerified: {
      type: Boolean,
      default: true,
    },

    isDocumentVerified: {
      type: Boolean,
      default: false,
    },

    // ==========================
    // Application Status
    // ==========================

    status: {
      type: String,
      enum: [
        "pending",
        "under_review",
        "approved",
        "rejected",
      ],
      default: "pending",
    },

    rejectionReason: {
      type: String,
      default: "",
    },

    adminRemarks: {
      type: String,
      default: "",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    approvedAt: {
      type: Date,
      default: null,
    },

    // ==========================
    // Agreement
    // ==========================

    termsAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ==========================
// Indexes
// ==========================

porterApplicationSchema.index({
  phone: 1,
});

porterApplicationSchema.index({
  aadhaarNumber: 1,
});

porterApplicationSchema.index({
  status: 1,
});

porterApplicationSchema.index({
  preferredStation: 1,
});

module.exports = mongoose.model(
  "PorterApplication",
  porterApplicationSchema
);