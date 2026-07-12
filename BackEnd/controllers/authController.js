const User = require("../models/User");
const { verifyOTP } = require("../services/otpService");
const PorterApplication = require("../models/PorterApplication");

const generateJWT = require("../utils/generateJWT");

const {
  successResponse,
  errorResponse,
} = require("../utils/responseHandler");


// Send OTP

const sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return errorResponse(
        res,
        "Phone number is required"
      );
    }

    console.log(
      `Dummy OTP for ${phone}: 123456`
    );

    return successResponse(
      res,
      "OTP sent successfully"
    );

  } catch (error) {

    return errorResponse(
      res,
      error.message,
      500
    );

  }
};


// Verify OTP

const verifyUserOTP = async (
  req,
  res
) => {
  try {

    const {
      phone,
      otp,
    } = req.body;

    if (!phone || !otp) {
      return errorResponse(
        res,
        "Phone and OTP are required"
      );
    }

    const isValid =
      await verifyOTP(phone, otp);

    if (!isValid) {
      return errorResponse(
        res,
        "Invalid OTP"
      );
    }

    let user =
      await User.findOne({
        phone,
      });

    if (!user) {
      user =
        await User.create({
          phone,
          isVerified: true,
        });
    }

const application =
  await PorterApplication.findOne({
    userId: user._id,
  });

const token = generateJWT(user);

return successResponse(
  res,
  "Login successful",
  {
    token,

    user,

    porterApplication: application
      ? {
          hasApplication: true,
          status: application.status,
        }
      : {
          hasApplication: false,
          status: null,
        },
  }
);

  } catch (error) {

    return errorResponse(
      res,
      error.message,
      500
    );

  }
};


// Current User

const getMe = async (
  req,
  res
) => {
  try {

    const user =
      await User.findById(
        req.user.id
      );

    return successResponse(
      res,
      "User fetched successfully",
      {
        user,
      }
    );

  } catch (error) {

    return errorResponse(
      res,
      error.message,
      500
    );

  }
};

module.exports = {
  sendOTP,
  verifyUserOTP,
  getMe,
};