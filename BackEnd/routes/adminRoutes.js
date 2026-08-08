const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getDashboard,
  getPorterApplications,
  getPorterApplication,
  approvePorter,
  rejectPorter,

  // ==========================
  // Bookings
  // ==========================
  getBookings,
  getBooking,
  updateBookingStatus,

} = require("../controllers/adminController");

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getDashboard
);
router.get(
  "/porters",
  authMiddleware,
  adminMiddleware,
  getPorterApplications
);

router.get(
  "/porters/:id",
  authMiddleware,
  adminMiddleware,
  getPorterApplication
);

router.put(
  "/porters/:id/approve",
  authMiddleware,
  adminMiddleware,
  approvePorter
);

router.put(
  "/porters/:id/reject",
  authMiddleware,
  adminMiddleware,
  rejectPorter
);

/* ==========================================================
   BOOKINGS
========================================================== */

router.get(
  "/bookings",
  authMiddleware,
  adminMiddleware,
  getBookings
);

router.get(
  "/bookings/:id",
  authMiddleware,
  adminMiddleware,
  getBooking
);

router.put(
  "/bookings/:id/status",
  authMiddleware,
  adminMiddleware,
  updateBookingStatus
);

module.exports = router;