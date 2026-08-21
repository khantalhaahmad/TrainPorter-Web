const Booking = require("../models/Booking");
const Activity = require("../models/Activity");
const Porter = require("../models/Porter");
const Notification = require("../models/Notification");

const calculateFare = require(
  "../utils/fareCalculator"
);

const createBooking = async (
  req,
  res
) => {
  try {

    const fareData =
  calculateFare(
    req.body.luggageCount || 1
  );

  // ==========================
// Find Available Porter
// ==========================

const porter = await Porter.findOne({

  preferredStation: req.body.station,

  availabilityStatus: "online",

  isAvailable: true,

  accountStatus: "active",

})
.sort({
  averageRating: -1,
});

if (!porter) {

  return res.status(404).json({

    success: false,

    message:
      "No porter available at this station.",

  });

}

    const booking = await Booking.create({

  ...req.body,

  // ==========================
  // User
  // ==========================

  userId: req.user.id,

  // ==========================
  // Assigned Porter
  // ==========================

  porterId: porter._id,

  assignedPorter: {

    porterId: porter._id,

    name: porter.fullName,

    phone: porter.phone,

    profilePhoto:
      porter.profilePhoto?.url || "",

    station:
      porter.preferredStation,

    rating:
      porter.averageRating,

  },

  // ==========================
  // Fare
  // ==========================

  amount: fareData.amount,

  fareBreakdown:
    fareData.breakdown,

  // ==========================
// Payment
// ==========================

paymentStatus:
  req.body.paymentMethod === "COD"
    ? "pending"
    : "paid",

paymentMethod:
  req.body.paymentMethod || "UPI",

transactionId:
  req.body.paymentMethod === "COD"
    ? ""
    : `TXN-${Date.now()}`,

paidAt:
  req.body.paymentMethod === "COD"
    ? null
    : new Date(),

  // ==========================
  // Booking Status
  // ==========================

  status: "assigned",

});

// ==========================
// Make Porter Busy
// ==========================

await Porter.findByIdAndUpdate(
  porter._id,
  {
    isAvailable: false,
    availabilityStatus: "busy",
  }
);

// ==========================
// Admin Notification
// ==========================

await Notification.create({
  type: "booking",
  title: "New Booking Received",
  message: `${booking.trainName} booking created and porter assigned.`,
  referenceId: booking._id,
});

// ==========================
// Pending Payment Notification
// ==========================

if (booking.paymentStatus === "pending") {

  await Notification.create({
    type: "payment",
    title: "Pending Payment",
    message: `${booking.trainName} booking has a pending payment of ₹${booking.amount}.`,
    referenceId: booking._id,
  });

}


    await Activity.create({
      userId: req.user.id,
      title: "Booking Created",
      description: `${booking.trainName} booking created and porter assigned`,
      type: "booking",
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {

    console.log("========== CREATE BOOKING ERROR ==========");
    console.log(error);
    console.log("Message:", error.message);
    console.log("Stack:", error.stack);
    console.log("==========================================");

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getMyBookings = async (
  req,
  res
) => {
  try {
   const filter = {
    userId: req.user.id,
};

if (req.query.status === "active") {

    filter.status = {
        $in: [
            "assigned",
            "accepted",
            "arrived",
            "in_progress",
        ],
    };

} else if (req.query.status) {

    filter.status = req.query.status;

}

const bookings =
  await Booking.find(filter)

    .populate(
      "porterId",
      "fullName phone averageRating preferredStation profilePhoto"
    )

    .sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookingById = async (
  req,
  res
) => {
  try {
const booking =
  await Booking.findById(
    req.params.id
  )
  .populate(
    "porterId",
    "fullName phone averageRating preferredStation profilePhoto"
  );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message:
          "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBookingStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const validStatuses = [
      "assigned",
      "accepted",
      "arrived",
      "in_progress",
      "completed",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {

      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });

    }

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });

    }

    booking.status = status;

    if (status === "completed") {

      booking.completedAt = new Date();

      if (booking.porterId) {

        await Porter.findByIdAndUpdate(
          booking.porterId,
          {
            isAvailable: true,
            availabilityStatus: "online",
          }
        );

      }

    }

    await booking.save();

    await Activity.create({

      userId: booking.userId,

      title: "Booking Updated",

      description:
        `Booking status changed to ${status}`,

      type: "booking",

    });

    res.status(200).json({

      success: true,

      data: booking,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};
const cancelBooking = async (req, res) => {

  console.log("========== CANCEL BOOKING HIT ==========");
  console.log("Booking ID:", req.params.id);
  console.log("User ID:", req.user.id);
  console.log("========================================");

  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    console.log("BOOKING FOUND:", {
      id: booking._id,
      userId: booking.userId,
      status: booking.status,
    });

    if (
      booking.status === "arrived" ||
      booking.status === "in_progress" ||
      booking.status === "completed" ||
      booking.status === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Booking cannot be cancelled now",
      });
    }

    booking.status = "cancelled";

    await booking.save();

if (booking.porterId) {

  await Porter.findByIdAndUpdate(

    booking.porterId,

    {

      isAvailable: true,

      availabilityStatus: "online",

    }

  );

}
// ==========================
// Admin Notification
// ==========================

await Notification.create({
  type: "alert",
  title: "Booking Cancelled",
  message: `${booking.trainName} booking has been cancelled.`,
  referenceId: booking._id,
});

await Activity.create({
  userId: booking.userId,
  title: "Booking Cancelled",
  description: `${booking.trainName} booking cancelled`,
  type: "booking",
});

res.status(200).json({
  success: true,
  message:
    "Booking cancelled successfully",
  data: booking,
});
  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
};