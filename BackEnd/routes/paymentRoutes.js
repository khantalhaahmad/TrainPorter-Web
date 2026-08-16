const express = require("express");

const router = express.Router();

// ==========================================================
// Middleware
// ==========================================================

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

// ==========================================================
// Controllers
// ==========================================================

const {
  paymentSummary,
  payments,
  paymentDetails,
  paymentAnalytics,
} = require("../controllers/paymentController");

// ==========================================================
// PAYMENT SUMMARY
// ==========================================================

router.get(
  "/summary",
  authMiddleware,
  adminMiddleware,
  paymentSummary
);

// ==========================================================
// ALL PAYMENTS
// ==========================================================

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  payments
);

// ==========================================================
// PAYMENT ANALYTICS
// ==========================================================

router.get(
  "/analytics",
  authMiddleware,
  adminMiddleware,
  paymentAnalytics
);

// ==========================================================
// PAYMENT DETAILS
// ==========================================================

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  paymentDetails
);

// ==========================================================
// EXPORT
// ==========================================================

module.exports = router;