const Activity = require("../models/Activity");

const getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createActivity = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
    } = req.body;

    const activity =
      await Activity.create({
        userId: req.user.id,
        title,
        description,
        type,
      });

    res.status(201).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMyActivities,
  createActivity,
};