const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} = require(
  "../controllers/bookingController"
);

router.post(
  "/",
  authMiddleware,
  createBooking
);

router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);

router.get(
  "/:id",
  authMiddleware,
  getBookingById
);

router.put(
  "/cancel/:id",
  authMiddleware,
  cancelBooking
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateBookingStatus
);

module.exports = router;