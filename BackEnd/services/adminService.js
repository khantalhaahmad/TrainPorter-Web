const User = require("../models/User");
const Booking = require("../models/Booking");
const PorterApplication = require("../models/PorterApplication");
const Activity = require("../models/Activity");
const Porter = require("../models/Porter");

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
        paymentStatus: "paid",
        paidAt: {
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
        paymentStatus: "paid",
        paidAt: {
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
        paymentStatus: "paid",
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
        paymentStatus: "paid",
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$paidAt",
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

// ==========================================
// Get All Porter Applications
// ==========================================

const getPorterApplications = async () => {

  const applications = await PorterApplication.find()
    .populate("userId", "name phone email role")
    .sort({
      createdAt: -1,
    });

  return applications;

};
// ==========================================
// Get Single Porter Application
// ==========================================

const getPorterApplication = async (id) => {

  const application = await PorterApplication.findById(id)
    .populate("userId", "name phone email role");

  if (!application) {
    throw new Error("Porter application not found.");
  }

  return application;

};

// ==========================================
// Approve Porter
// ==========================================

// ==========================================
// Approve Porter
// ==========================================

const approvePorter = async (applicationId, adminId) => {

  console.log("========== SERVICE START ==========");
  console.log("Application ID:", applicationId);
  console.log("Admin ID:", adminId);

  // ==========================
  // Find Application
  // ==========================

  const application = await PorterApplication.findById(applicationId);

  console.log("STEP 1 - Application Found");

  if (!application) {
    throw new Error("Porter application not found.");
  }

  if (application.status === "approved") {
    throw new Error("Application already approved.");
  }

  // ==========================
  // Find User
  // ==========================

  const user = await User.findById(application.userId);

  console.log("STEP 2 - User Found");

  if (!user) {
    throw new Error("User not found.");
  }

  // ==========================
  // Update User Role
  // ==========================

  user.role = "porter";

  await user.save();

  console.log("STEP 3 - User Updated");

  // ==========================
  // Update Application
  // ==========================

  application.status = "approved";
  application.approvedBy = adminId;
  application.approvedAt = new Date();

  await application.save();

  console.log("STEP 4 - Application Updated");

  // ==========================
  // Existing Porter
  // ==========================

  const existingPorter = await Porter.findOne({
    userId: application.userId,
  });

  console.log("STEP 5 - Existing Porter Checked");

  if (!existingPorter) {

    console.log("========== BEFORE PORTER CREATE ==========");
    console.log("Porter Model:", Porter.modelName);
    console.log("Application:", application);
    console.log("=========================================");
const porter = await Porter.create({

  // ==========================
  // References
  // ==========================

  userId: application.userId,

  applicationId: application._id,

  // ==========================
  // Basic Details
  // ==========================

  fullName: application.fullName,

  phone: application.phone,

  email: application.email,

  profilePhoto: application.profilePhoto,

  // ==========================
  // Station
  // ==========================

  preferredStation: application.preferredStation,

  stationCode: application.stationCode,

  // ==========================
  // Working Status
  // ==========================

  availabilityStatus: "online",

  isAvailable: true,

  accountStatus: "active",

  // ==========================
  // Performance
  // ==========================

  totalBookings: 0,

  completedBookings: 0,

  cancelledBookings: 0,

  averageRating: 0,

  totalReviews: 0,

  // ==========================
  // Earnings
  // ==========================

  walletBalance: 0,

  lifetimeEarnings: 0,

  todayEarnings: 0,

  // ==========================
  // Current Booking
  // ==========================

  currentBooking: null,

});

    console.log("STEP 6 - Porter Created");
    console.log(porter);

  } else {

    console.log("STEP 6 - Porter Already Exists");

  }

  console.log("========== SERVICE END ==========");

  return {
    message: "Porter approved successfully.",
    application,
  };

};
// ==========================================
// Reject Porter
// ==========================================

const rejectPorter = async (
  applicationId,
  adminId,
  reason = ""
) => {

  console.log("========== REJECT SERVICE START ==========");

  const application =
    await PorterApplication.findById(applicationId);

  if (!application) {
    throw new Error("Porter application not found.");
  }

  if (application.status === "rejected") {
    throw new Error("Application already rejected.");
  }

  application.status = "rejected";

  application.rejectedBy = adminId;

  application.rejectedAt = new Date();

  application.rejectionReason = reason;

  await application.save();

  console.log("========== REJECT SERVICE END ==========");

  return {

    message: "Application rejected successfully.",

    application,

  };

};
// ==========================================
// Get All Bookings
// ==========================================

const getBookings = async () => {

  const bookings = await Booking.find()
    .populate("userId", "name phone")
  .populate(
  "porterId",
  "fullName phone preferredStation averageRating profilePhoto availabilityStatus"
)
    .sort({
      createdAt: -1,
    });

  return bookings;

};

// ==========================================
// Get Single Booking
// ==========================================

const getBooking = async (id) => {

  const booking = await Booking.findById(id)
    .populate("userId", "name phone")
    .populate(
  "porterId",
  "fullName phone preferredStation averageRating profilePhoto availabilityStatus"
)

  if (!booking) {

    throw new Error(
      "Booking not found."
    );

  }

  return booking;

};

// ==========================================
// Update Booking Status
// ==========================================

const updateBookingStatus = async (
  id,
  status
) => {

  const booking =
    await Booking.findById(id);

  if (!booking) {

    throw new Error(
      "Booking not found."
    );

  }

  booking.status = status;

  if (status === "completed") {

    booking.completedAt =
      new Date();

  }

  await booking.save();

  return booking;

};

module.exports = {
  getDashboardData,

  // Porter
  getPorterApplications,
  getPorterApplication,
  approvePorter,
  rejectPorter,

  // Booking
  getBookings,
  getBooking,
  updateBookingStatus,
};