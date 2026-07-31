const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
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
  lowercase: true,
  trim: true,
  default: null,
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
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  userSchema
);