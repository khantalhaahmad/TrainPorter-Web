const express = require("express");

const router =
  express.Router();

const {
  sendOTP,
  verifyUserOTP,
  getMe,
} = require(
  "../controllers/authController"
);

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );


// Auth Routes

router.post(
  "/send-otp",
  sendOTP
);

router.post(
  "/verify-otp",
  verifyUserOTP
);

router.get(
  "/me",
  authMiddleware,
  getMe
);

module.exports = router;