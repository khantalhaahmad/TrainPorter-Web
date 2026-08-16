const Booking = require("../models/Booking");

// ==========================================================
// PAYMENT SUMMARY
// ==========================================================

const getPaymentSummary = async () => {
  try {
    // ==========================
    // Date Range
    // ==========================

    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    // ==========================
    // Revenue
    // ==========================

    const totalRevenueResult = await Booking.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const todayRevenueResult = await Booking.aggregate([
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
          todayRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]);

    // ==========================
    // Counts
    // ==========================

    const totalPayments =
      await Booking.countDocuments();

    const successfulPayments =
      await Booking.countDocuments({
        paymentStatus: "paid",
      });

    const pendingPayments =
      await Booking.countDocuments({
        paymentStatus: "pending",
      });

    const refundedPayments =
      await Booking.countDocuments({
        paymentStatus: "refunded",
      });

    const failedPayments =
      await Booking.countDocuments({
        paymentStatus: "failed",
      });

      const pendingCashResult =
  await Booking.aggregate([
    {
      $match: {
        paymentStatus: "pending",
        paymentMethod: "COD",
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

const pendingCash =
  pendingCashResult[0]?.total || 0;

    // ==========================
    // Payment Methods
    // ==========================

    const paymentMethods =
  await Booking.aggregate([
    {
      $match: {
        paymentStatus: "paid",
      },
    },
    {
      $group: {
        _id: "$paymentMethod",
        count: {
          $sum: 1,
        },
        revenue: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        revenue: -1,
      },
    },
  ]);

    // ==========================
    // Response
    // ==========================

    return {

      cards: {

        totalRevenue:
          totalRevenueResult[0]?.totalRevenue || 0,

        todayRevenue:
          todayRevenueResult[0]?.todayRevenue || 0,

        totalPayments,

        successfulPayments,

        pendingPayments,

        refundedPayments,

        failedPayments,

        pendingCash,

      },

      paymentMethods,

    };

  } catch (error) {

    console.error(
      "PAYMENT SUMMARY ERROR:",
      error
    );

    throw error;

  }
};

// ==========================================================
// GET ALL PAYMENTS
// ==========================================================

const getPayments = async (query) => {
  try {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    // ==========================
    // Search
    // ==========================

    if (query.search) {

      filter.$or = [

        {
          bookingId: {
            $regex: query.search,
            $options: "i",
          },
        },

        {
          transactionId: {
            $regex: query.search,
            $options: "i",
          },
        },

        {
          trainName: {
            $regex: query.search,
            $options: "i",
          },
        },

        {
          station: {
            $regex: query.search,
            $options: "i",
          },
        },

      ];

    }

    // ==========================
    // Payment Status
    // ==========================

    if (
      query.status &&
      query.status !== "all"
    ) {
      filter.paymentStatus =
        query.status;
    }

    // ==========================
    // Payment Method
    // ==========================

    if (
      query.method &&
      query.method !== "all"
    ) {
      filter.paymentMethod =
        query.method;
    }

    // ==========================
    // Booking Status
    // ==========================

    if (
      query.bookingStatus &&
      query.bookingStatus !== "all"
    ) {
      filter.status =
        query.bookingStatus;
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
    // Total Records
    // ==========================

    const total =
      await Booking.countDocuments(
        filter
      );

    // ==========================
    // Payments
    // ==========================

    const payments =
      await Booking.find(filter)

        .populate(
          "userId",
          "name phone"
        )

        .populate(
          "porterId",
          "fullName phone averageRating preferredStation"
        )

        .sort({
          createdAt: -1,
        })

        .skip(skip)

        .limit(limit);

    // ==========================
    // Pagination
    // ==========================

    return {

      payments,

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
      "GET PAYMENTS ERROR:",
      error
    );

    throw error;

  }
};
// ==========================================================
// GET PAYMENT DETAILS
// ==========================================================

const getPaymentById = async (id) => {
  try {

    const payment = await Booking.findById(id)

      .populate(
        "userId",
        "name phone email membership coins"
      )

      .populate(
        "porterId",
        "fullName phone email preferredStation stationCode averageRating totalBookings completedBookings walletBalance profilePhoto"
      );

    if (!payment) {
      throw new Error("Payment not found.");
    }

    // ==========================
    // Response
    // ==========================

    return {

      booking: {

        id: payment._id,

        bookingId: payment.bookingId,

        trainNumber: payment.trainNumber,

        trainName: payment.trainName,

        station: payment.station,

        coach: payment.coach,

        seatNumber: payment.seatNumber,

        luggageCount: payment.luggageCount,

        bookingStatus: payment.status,

        completedAt: payment.completedAt,

        createdAt: payment.createdAt,

      },

      payment: {

        amount: payment.amount,

        paymentStatus:
          payment.paymentStatus,

        paymentMethod:
          payment.paymentMethod,

        transactionId:
          payment.transactionId,

        gateway:
          payment.gateway,

        gatewayTransactionId:
          payment.gatewayTransactionId,

        paidAt:
          payment.paidAt,

        refundAmount:
          payment.refundAmount,

        refundReason:
          payment.refundReason,

        refundedAt:
          payment.refundedAt,

        failureReason:
          payment.failureReason,

      },

      fareBreakdown:
        payment.fareBreakdown,

      passenger:
        payment.userId,

      porter:
        payment.porterId,

      paymentTimeline:
        payment.paymentTimeline,

      assignedPorter:
        payment.assignedPorter,

    };

  } catch (error) {

    console.error(
      "GET PAYMENT DETAILS ERROR:",
      error
    );

    throw error;

  }
};
// ==========================================================
// PAYMENT ANALYTICS
// ==========================================================

const getPaymentAnalytics = async () => {

  try {

    // ==========================
    // Payment Method Distribution
    // ==========================

    const paymentMethods =
      await Booking.aggregate([

        {
          $group: {
            _id: "$paymentMethod",

            totalTransactions: {
              $sum: 1,
            },

            revenue: {
              $sum: "$amount",
            },

          },
        },

        {
          $sort: {
            revenue: -1,
          },
        },

      ]);

    // ==========================
    // Revenue Trend (Last 7 Days)
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

            transactions: {
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
    // Station Revenue
    // ==========================

    const stationRevenue =
      await Booking.aggregate([

        {
          $match: {
            paymentStatus: "paid",
          },
        },

        {
          $group: {

            _id: "$station",

            revenue: {
              $sum: "$amount",
            },

            bookings: {
              $sum: 1,
            },

          },

        },

        {
          $sort: {
            revenue: -1,
          },
        },

        {
          $limit: 10,
        },

      ]);

    // ==========================
    // Payment Status
    // ==========================

    const paymentStatus =
      await Booking.aggregate([

        {

          $group: {

            _id: "$paymentStatus",

            count: {
              $sum: 1,
            },

          },

        },

      ]);

    return {

      paymentMethods,

      revenueTrend,

      stationRevenue,

      paymentStatus,

    };

  } catch (error) {

    console.error(
      "PAYMENT ANALYTICS ERROR:",
      error
    );

    throw error;

  }

};

module.exports = {

  getPaymentSummary,

  getPayments,

  getPaymentById,

  getPaymentAnalytics,

};