const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  getMyActivities,
  createActivity,
} = require(
  "../controllers/activityController"
);

router.get(
  "/my-activities",
  authMiddleware,
  getMyActivities
);

router.post(
  "/",
  authMiddleware,
  createActivity
);

module.exports = router;