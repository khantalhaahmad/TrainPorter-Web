const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },

userCode: {
  type: String,
  unique: true,
  sparse: true,
  index: true,
},

    name: {
      type: String,
      default: "",
    },
coins: {
  type: Number,
  default: 100
},

membership: {
  type: String,
  enum: [
    "Bronze",
    "Silver",
    "Gold",
    "Platinum"
  ],
  default: "Bronze"
},
    role: {
      type: String,
      enum: [
        "user",
        "porter",
        "admin",
      ],
      default: "user",
    },

email: {
  type: String,
  unique: true,
  sparse: true,
  lowercase: true,
  trim: true,
  default: undefined,
},

password: {
  type: String,
  default: null,
},

    isVerified: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },

    lastActiveAt: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);