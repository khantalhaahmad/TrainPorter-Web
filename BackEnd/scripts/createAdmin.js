require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");

const User = require("../models/User");

const createAdmin = async () => {
  try {

    await connectDB();

    const existingAdmin =
      await User.findOne({
        email: "admin@trainporter.com",
      });

    if (existingAdmin) {

      console.log("✅ Admin already exists.");

      process.exit();

    }

    const hashedPassword =
      await bcrypt.hash(
        "Admin@123",
        10
      );

    await User.create({

      name: "Super Admin",

      phone: "9999999999",

      email: "admin@trainporter.com",

      password: hashedPassword,

      role: "admin",

      isVerified: true,

    });

    console.log(
      "🎉 Admin created successfully!"
    );

    console.log("");

    console.log(
      "Email    : admin@trainporter.com"
    );

    console.log(
      "Password : Admin@123"
    );

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }
};

createAdmin();