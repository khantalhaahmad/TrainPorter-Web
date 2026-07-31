const express = require("express");

const router =
  express.Router();

const {
  sendOTP,
  verifyUserOTP,
  getMe,
  adminLogin,
} = require("../controllers/authController");

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

router.post(
  "/admin/login",
  adminLogin
);

module.exports = router;