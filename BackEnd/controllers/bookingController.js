const Booking = require("../models/Booking");
const Activity = require("../models/Activity");
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

    const booking =
  await Booking.create({
    ...req.body,

    userId: req.user.id,

    amount: fareData.amount,

    fareBreakdown:
      fareData.breakdown,

    status: "assigned",

    assignedPorter: {
      porterId:
        "DUMMY_PORTER_001",
      name:
        "Dummy Porter",
      phone:
        "9999999999",
    },
  });

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

const bookings = await Booking.find(filter)
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

const updateBookingStatus =
  async (req, res) => {
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
        await Booking.findByIdAndUpdate(
          req.params.id,
          {
            status,
          },
          {
            new: true,
          }
        );

      if (!booking) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Booking not found",
          });
      }

      if (
        status === "completed"
      ) {
        booking.completedAt =
          new Date();

        await booking.save();
      }

      await Activity.create({
        userId:
          booking.userId,
        title:
          "Booking Updated",
        description: `Booking status changed to ${status}`,
        type: "booking",
      });

      res.status(200).json({
        success: true,
        data: booking,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const cancelBooking = async (
  req,
  res
) => {
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

    if (
  booking.status === "arrived" ||
  booking.status === "in_progress" ||
  booking.status === "completed" ||
  booking.status === "cancelled"
) {
  return res.status(400).json({
    success: false,
    message:
      "Booking cannot be cancelled now",
  });
}

booking.status = "cancelled";

await booking.save();

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