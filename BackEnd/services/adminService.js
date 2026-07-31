const User = require("../models/User");
const Booking = require("../models/Booking");
const PorterApplication = require("../models/PorterApplication");
const Activity = require("../models/Activity");

const getDashboardData = async () => {
  // ==========================
  // Date Range
  // ==========================

  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  // ==========================
  // User Statistics
  // ==========================

  const totalUsers = await User.countDocuments({
    role: "user",
  });

  const totalPorters = await User.countDocuments({
    role: "porter",
  });

  const totalAdmins = await User.countDocuments({
    role: "admin",
  });

  // ==========================
  // Porter Application Stats
  // ==========================

  const pendingPorters =
    await PorterApplication.countDocuments({
      status: "pending",
    });

  const approvedPorters =
    await PorterApplication.countDocuments({
      status: "approved",
    });

  const rejectedPorters =
    await PorterApplication.countDocuments({
      status: "rejected",
    });

  // ==========================
  // Booking Stats
  // ==========================

  const totalBookings =
    await Booking.countDocuments();

  const todayBookings =
    await Booking.countDocuments({
      createdAt: {
        $gte: startOfDay,
      },
    });

  const completedBookings =
    await Booking.countDocuments({
      status: "completed",
    });

  const cancelledBookings =
    await Booking.countDocuments({
      status: "cancelled",
    });

  const pendingBookings =
    await Booking.countDocuments({
      status: "pending",
    });

  const assignedBookings =
    await Booking.countDocuments({
      status: "assigned",
    });

  const acceptedBookings =
    await Booking.countDocuments({
      status: "accepted",
    });

  const arrivedBookings =
    await Booking.countDocuments({
      status: "arrived",
    });

  const inProgressBookings =
    await Booking.countDocuments({
      status: "in_progress",
    });

  // ==========================
  // Revenue
  // ==========================

  const todayRevenueResult =
    await Booking.aggregate([
      {
        $match: {
          status: "completed",
          createdAt: {
  $gte: startOfDay,
},
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

  const monthRevenueResult =
    await Booking.aggregate([
      {
        $match: {
          status: "completed",
         createdAt: {
  $gte: startOfMonth,
},
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

  const totalRevenueResult =
    await Booking.aggregate([
      {
        $match: {
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

  const todayRevenue =
    todayRevenueResult[0]?.total || 0;

  const monthlyRevenue =
    monthRevenueResult[0]?.total || 0;

  const totalRevenue =
    totalRevenueResult[0]?.total || 0;

  // ==========================
  // Recent Bookings
  // ==========================

  const recentBookings =
    await Booking.find()
      .populate("userId", "name phone")
      .populate("porterId", "name phone")
      .sort({
        createdAt: -1,
      })
      .limit(10);

  // ==========================
  // Recent Activities
  // ==========================

  const recentActivities =
    await Activity.find()
      .populate("userId", "name phone")
      .sort({
        createdAt: -1,
      })
      .limit(10);

  // ==========================
  // Booking Trend (Last 7 Days)
  // ==========================

  const bookingTrend =
    await Booking.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          bookings: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $limit: 7,
      },
    ]);

  // ==========================
  // Revenue Trend
  // ==========================

  const revenueTrend =
    await Booking.aggregate([
      {
        $match: {
          status: "completed",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          revenue: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
        $limit: 7,
      },
    ]);

  // ==========================
  // Return Dashboard
  // ==========================

  return {
    stats: {
      totalUsers,
      totalPorters,
      totalAdmins,

      totalBookings,
      todayBookings,

      completedBookings,
      cancelledBookings,

      pendingPorters,
      approvedPorters,
      rejectedPorters,

      todayRevenue,
      monthlyRevenue,
      totalRevenue,
    },

    bookingStatus: {
      pending: pendingBookings,
      assigned: assignedBookings,
      accepted: acceptedBookings,
      arrived: arrivedBookings,
      inProgress: inProgressBookings,
      completed: completedBookings,
      cancelled: cancelledBookings,
    },

    bookingTrend,

    revenueTrend,

    recentBookings,

    recentActivities,

    pendingActions: {
      pendingPorters,
      pendingBookings,
    },

    notifications: [],
  };
};

module.exports = {
  getDashboardData,
};