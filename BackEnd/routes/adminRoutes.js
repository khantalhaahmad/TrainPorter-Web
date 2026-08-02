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

module.exports = router;