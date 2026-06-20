const User = require("../models/User");
const Booking = require("../models/Booking");
const Activity = require("../models/Activity");
const Review = require("../models/Review");

const getDashboard = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const user =
      await User.findById(userId);

    const totalBookings =
      await Booking.countDocuments({
        userId,
      });

    const completedBookings =
      await Booking.countDocuments({
        userId,
        status: "completed",
      });

    const activeBooking =
      await Booking.findOne({
        userId,
        status: {
          $in: [
            "pending",
            "accepted",
            "in_progress",
          ],
        },
      });

    const reviews =
      await Review.find({
        userId,
      });

    const avgRating =
      reviews.length > 0
        ? (
            reviews.reduce(
              (sum, review) =>
                sum + review.rating,
              0
            ) / reviews.length
          ).toFixed(1)
        : 0;

    const recentActivities =
      await Activity.find({
        userId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(5);

    const successRate =
      totalBookings > 0
        ? Math.round(
            (completedBookings /
              totalBookings) *
              100
          )
        : 0;

    const moneySaved =
      completedBookings * 20;

    res.json({
      success: true,
      data: {
        user,
        totalBookings,
        activeBooking,
        avgRating,
        successRate,
        moneySaved,
        recentActivities,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};