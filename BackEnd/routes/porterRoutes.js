const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  porterDocumentsUpload,
} = require("../middleware/upload");

const validatePorterApplication = require(
  "../middleware/validatePorterApplication"
);

const {
  applyPorter,
  getMyApplication,
  getApplicationStatus,
  updateApplication,
} = require("../controllers/porterController");

// =========================================
// Apply Porter
// =========================================

router.post(
  "/apply",
  authMiddleware,
  porterDocumentsUpload,
  validatePorterApplication,
  applyPorter
);

// =========================================
// My Application
// =========================================

router.get(
  "/my-application",
  authMiddleware,
  getMyApplication
);

// =========================================
// Application Status
// =========================================

router.get(
  "/status",
  authMiddleware,
  getApplicationStatus
);

// =========================================
// Update Application
// =========================================

router.put(
  "/update",
  authMiddleware,
  porterDocumentsUpload,
  validatePorterApplication,
  updateApplication
);

module.exports = router;