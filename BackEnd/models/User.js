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

    role: {
      type: String,
      enum: [
        "user",
        "porter",
        "admin",
      ],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: true,
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