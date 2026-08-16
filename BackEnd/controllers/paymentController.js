const {
  getPaymentSummary,
  getPayments,
  getPaymentById,
  getPaymentAnalytics,
} = require("../services/paymentService");


// ==========================================================
// GET PAYMENT SUMMARY
// ==========================================================

const paymentSummary = async (req, res) => {
  try {

    const summary =
      await getPaymentSummary();

    return res.status(200).json({
      success: true,
      message:
        "Payment summary fetched successfully",
      data: summary,
    });

  } catch (error) {

    console.error(
      "PAYMENT SUMMARY CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch payment summary",
      error: error.message,
    });

  }
};


// ==========================================================
// GET ALL PAYMENTS
// ==========================================================

const payments = async (req, res) => {
  try {

    const result =
      await getPayments(req.query);

    return res.status(200).json({
      success: true,
      message:
        "Payments fetched successfully",
      data: result,
    });

  } catch (error) {

    console.error(
      "GET PAYMENTS CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch payments",
      error: error.message,
    });

  }
};


// ==========================================================
// GET PAYMENT DETAILS
// ==========================================================

const paymentDetails = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {

      return res.status(400).json({
        success: false,
        message:
          "Payment ID is required",
      });

    }

    const payment =
      await getPaymentById(id);

    return res.status(200).json({
      success: true,
      message:
        "Payment details fetched successfully",
      data: payment,
    });

  } catch (error) {

    console.error(
      "GET PAYMENT DETAILS CONTROLLER ERROR:",
      error
    );

    if (
      error.message ===
      "Payment not found."
    ) {

      return res.status(404).json({
        success: false,
        message:
          "Payment not found",
      });

    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch payment details",
      error: error.message,
    });

  }
};


// ==========================================================
// GET PAYMENT ANALYTICS
// ==========================================================

const paymentAnalytics = async (
  req,
  res
) => {
  try {

    const analytics =
      await getPaymentAnalytics();

    return res.status(200).json({
      success: true,
      message:
        "Payment analytics fetched successfully",
      data: analytics,
    });

  } catch (error) {

    console.error(
      "PAYMENT ANALYTICS CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch payment analytics",
      error: error.message,
    });

  }
};

// ==========================================================
// UPDATE BOOKING PAYMENT
// ==========================================================

const updateBookingPayment = async (req, res) => {
  try {

    const { id } = req.params;
    const {
      paymentMethod,
      transactionId,
    } = req.body;

    // ======================================================
    // Validate Payment Method
    // ======================================================

    const allowedMethods = [
      "UPI",
      "CARD",
      "NET_BANKING",
      "WALLET",
      "COD",
    ];

    if (!allowedMethods.includes(paymentMethod)) {

      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });

    }

    // ======================================================
    // Get Booking
    // ======================================================

    const Booking = require("../models/Booking");

    const booking =
      await Booking.findById(id);

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });

    }

    // ======================================================
    // COD
    // ======================================================

    if (paymentMethod === "COD") {

      booking.paymentMethod = "COD";

      booking.paymentStatus = "pending";

      booking.transactionId = "";

      booking.gateway = "MANUAL";

      booking.gatewayTransactionId = "";

      booking.paidAt = null;

      booking.paymentTimeline = {
        ...(booking.paymentTimeline?.toObject?.() ||
          booking.paymentTimeline ||
          {}),

        paymentCompletedAt: null,
      };

    }

    // ======================================================
    // ONLINE PAYMENT
    // ======================================================

    else {

      booking.paymentMethod =
        paymentMethod;

      booking.paymentStatus =
        "paid";

      booking.transactionId =
        transactionId ||
        `TXN-${Date.now()}`;

      booking.gateway =
        "MANUAL";

      booking.gatewayTransactionId =
        booking.transactionId;

      booking.paidAt =
        new Date();

      booking.paymentTimeline = {
        ...(booking.paymentTimeline?.toObject?.() ||
          booking.paymentTimeline ||
          {}),

        paymentCompletedAt:
          new Date(),
      };

    }

    // ======================================================
    // Save
    // ======================================================

    await booking.save();

    return res.status(200).json({

      success: true,

      message:
        paymentMethod === "COD"
          ? "Cash payment selected successfully"
          : "Payment completed successfully",

      data: {

        bookingId:
          booking.bookingId,

        paymentStatus:
          booking.paymentStatus,

        paymentMethod:
          booking.paymentMethod,

        transactionId:
          booking.transactionId,

        paidAt:
          booking.paidAt,

        gateway:
          booking.gateway,

        amount:
          booking.amount,

      },

    });

  } catch (error) {

    console.error(
      "UPDATE BOOKING PAYMENT ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to update payment",

      error:
        error.message,

    });

  }
};

// ==========================================================
// EXPORTS
// ==========================================================

module.exports = {

  paymentSummary,

  payments,

  paymentDetails,

  paymentAnalytics,

  updateBookingPayment,

};