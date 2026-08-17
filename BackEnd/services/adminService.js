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

// ==========================================================
// USERS
// ==========================================================

// ==========================
// User Statistics
// ==========================

const getUserStats = async () => {
  try {
    const now = new Date();

    // Active = active within last 30 days
    const activeSince = new Date(now);
    activeSince.setDate(
      activeSince.getDate() - 30
    );

    const [
      totalUsers,
      activeUsers,
      newUsers,
      verifiedUsers,
      blockedUsers,
    ] = await Promise.all([
      // Total Users
      User.countDocuments({
        role: "user",
      }),

      // Active Users
      User.countDocuments({
        role: "user",
        isBlocked: false,
        lastActiveAt: {
          $gte: activeSince,
        },
      }),

      // New Users - current month
      User.countDocuments({
        role: "user",
        createdAt: {
          $gte: new Date(
            now.getFullYear(),
            now.getMonth(),
            1
          ),
        },
      }),

      // Verified Users
      User.countDocuments({
        role: "user",
        isVerified: true,
      }),

      // Blocked Users
      User.countDocuments({
        role: "user",
        isBlocked: true,
      }),
    ]);

    return {
      totalUsers,
      activeUsers,
      newUsers,
      verifiedUsers,
      blockedUsers,
    };

  } catch (error) {

    console.error(
      "GET USER STATS ERROR:",
      error
    );

    throw error;
  }
};


// ==========================
// Get All Users
// ==========================

const getUsers = async (query = {}) => {
  try {

    const page =
      Math.max(
        parseInt(query.page) || 1,
        1
      );

    const limit =
      Math.min(
        Math.max(
          parseInt(query.limit) || 5,
          1
        ),
        100
      );

    const skip =
      (page - 1) * limit;

    const filter = {
      role: "user",
    };

    // ==========================
    // Search
    // ==========================

    if (query.search?.trim()) {

      const search =
        query.search.trim();

      filter.$or = [
        {
          userCode: {
            $regex: search,
            $options: "i",
          },
        },
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // ==========================
    // Membership Filter
    // ==========================

    if (
      query.membership &&
      query.membership !== "all"
    ) {
      filter.membership =
        query.membership;
    }

    // ==========================
    // Verification Filter
    // ==========================

    if (
      query.verification &&
      query.verification !== "all"
    ) {

      if (
        query.verification === "verified"
      ) {
        filter.isVerified = true;
      }

      if (
        query.verification === "unverified"
      ) {
        filter.isVerified = false;
      }
    }

    // ==========================
    // Status Filter
    // ==========================

    if (
      query.status &&
      query.status !== "all"
    ) {

      const now = new Date();

      const activeSince =
        new Date(now);

      activeSince.setDate(
        activeSince.getDate() - 30
      );

      if (
        query.status === "blocked"
      ) {

        filter.isBlocked = true;

      } else if (
        query.status === "active"
      ) {

        filter.isBlocked = false;

        filter.lastActiveAt = {
          $gte: activeSince,
        };

      } else if (
        query.status === "inactive"
      ) {

        filter.isBlocked = false;

        filter.$or = [
          {
            lastActiveAt: {
              $lt: activeSince,
            },
          },
          {
            lastActiveAt: null,
          },
        ];
      }
    }

    // ==========================
    // Date Filter
    // ==========================

    if (
      query.from ||
      query.to
    ) {

      filter.createdAt = {};

      if (query.from) {
        filter.createdAt.$gte =
          new Date(query.from);
      }

      if (query.to) {

        const endDate =
          new Date(query.to);

        endDate.setHours(
          23,
          59,
          59,
          999
        );

        filter.createdAt.$lte =
          endDate;
      }
    }

    // ==========================
    // Total Users
    // ==========================

    const total =
      await User.countDocuments(
        filter
      );

    // ==========================
    // Users
    // ==========================

    const users =
      await User.find(filter)
        .select(
          "userCode name phone email membership coins isVerified isBlocked createdAt lastActiveAt"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .lean();

    // ==========================
    // Booking + Spending Summary
    // ==========================

    const userIds =
      users.map(
        (user) => user._id
      );

    const bookingSummary =
      await Booking.aggregate([
        {
          $match: {
            userId: {
              $in: userIds,
            },
          },
        },

        {
          $group: {
            _id: "$userId",

            totalBookings: {
              $sum: 1,
            },

            totalSpent: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$paymentStatus",
                      "paid",
                    ],
                  },
                  "$amount",
                  0,
                ],
              },
            },
          },
        },
      ]);

    const summaryMap =
      new Map();

    bookingSummary.forEach(
      (item) => {
        summaryMap.set(
          item._id.toString(),
          {
            totalBookings:
              item.totalBookings || 0,

            totalSpent:
              item.totalSpent || 0,
          }
        );
      }
    );

    // ==========================
    // Format Users
    // ==========================

    const formattedUsers =
      users.map((user) => {

        const summary =
          summaryMap.get(
            user._id.toString()
          ) || {
            totalBookings: 0,
            totalSpent: 0,
          };

        let status = "inactive";

        if (user.isBlocked) {
          status = "blocked";
        } else if (
          user.lastActiveAt &&
          user.lastActiveAt >=
            new Date(
              Date.now() -
                30 *
                  24 *
                  60 *
                  60 *
                  1000
            )
        ) {
          status = "active";
        }

        return {
          ...user,

          status,

          bookings:
            summary.totalBookings,

          totalSpent:
            summary.totalSpent,
        };
      });

    return {
      users: formattedUsers,

      pagination: {
        total,
        page,
        limit,

        totalPages:
          Math.ceil(
            total / limit
          ),

        hasNext:
          page <
          Math.ceil(
            total / limit
          ),

        hasPrevious:
          page > 1,
      },
    };

  } catch (error) {

    console.error(
      "GET USERS ERROR:",
      error
    );

    throw error;
  }
};


// ==========================
// Get Single User
// ==========================

const getUserById = async (
  userId
) => {
  try {

    const user =
      await User.findOne({
        _id: userId,
        role: "user",
      })
        .select(
          "userCode name phone email membership coins isVerified isBlocked createdAt updatedAt lastActiveAt"
        )
        .lean();

    if (!user) {
      throw new Error(
        "User not found."
      );
    }

    // ==========================
    // Booking Summary
    // ==========================

    const bookingSummaryResult =
      await Booking.aggregate([
        {
          $match: {
            userId: user._id,
          },
        },

        {
          $group: {
            _id: null,

            totalBookings: {
              $sum: 1,
            },

            completedBookings: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "completed",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            pendingBookings: {
              $sum: {
                $cond: [
                  {
                    $in: [
                      "$status",
                      [
                        "pending",
                        "assigned",
                        "accepted",
                        "arrived",
                        "in_progress",
                      ],
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            cancelledBookings: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "cancelled",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            totalSpent: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$paymentStatus",
                      "paid",
                    ],
                  },
                  "$amount",
                  0,
                ],
              },
            },

            successfulPayments: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$paymentStatus",
                      "paid",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            refundedAmount: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$paymentStatus",
                      "refunded",
                    ],
                  },
                  "$refundAmount",
                  0,
                ],
              },
            },

            pendingPayments: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$paymentStatus",
                      "pending",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]);

    const bookingSummary =
      bookingSummaryResult[0] || {
        totalBookings: 0,
        completedBookings: 0,
        pendingBookings: 0,
        cancelledBookings: 0,
        totalSpent: 0,
        successfulPayments: 0,
        refundedAmount: 0,
        pendingPayments: 0,
      };

    // ==========================
    // User Status
    // ==========================

    const activeSince =
      new Date();

    activeSince.setDate(
      activeSince.getDate() - 30
    );

    let status = "inactive";

    if (user.isBlocked) {
      status = "blocked";
    } else if (
      user.lastActiveAt &&
      user.lastActiveAt >= activeSince
    ) {
      status = "active";
    }

    // ==========================
    // Recent Activity
    // ==========================

    const recentActivity =
      await Activity.find({
        userId: user._id,
      })
        .sort({
          createdAt: -1,
        })
        .limit(10)
        .select(
          "title description type createdAt"
        )
        .lean();

    return {
      user: {
        ...user,
        status,
      },

      bookingSummary: {
        totalBookings:
          bookingSummary.totalBookings,

        completedBookings:
          bookingSummary.completedBookings,

        pendingBookings:
          bookingSummary.pendingBookings,

        cancelledBookings:
          bookingSummary.cancelledBookings,
      },

      paymentSummary: {
        totalSpent:
          bookingSummary.totalSpent,

        successfulPayments:
          bookingSummary.successfulPayments,

        refundedAmount:
          bookingSummary.refundedAmount,

        pendingPayments:
          bookingSummary.pendingPayments,
      },

      recentActivity,
    };

  } catch (error) {

    console.error(
      "GET USER DETAILS ERROR:",
      error
    );

    throw error;
  }
};


module.exports = {
  getDashboardData,

  // ==========================
  // Porter
  // ==========================
  getPorterApplications,
  getPorterApplication,
  approvePorter,
  rejectPorter,

  // ==========================
  // Booking
  // ==========================
  getBookings,
  getBooking,
  updateBookingStatus,

  // ==========================
  // Users
  // ==========================
  getUserStats,
  getUsers,
  getUserById,
};