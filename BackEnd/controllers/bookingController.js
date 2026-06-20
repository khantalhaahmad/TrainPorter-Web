const Booking = require("../models/Booking");
const Activity = require("../models/Activity");

const createBooking = async (
  req,
  res
) => {
  try {
    const booking =
      await Booking.create({
        ...req.body,
        userId: req.user.id,
      });

    await Activity.create({
      userId: req.user.id,
      title: "Booking Created",
      description: `${booking.trainName} booking created`,
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
    const bookings =
      await Booking.find({
        userId: req.user.id,
      }).sort({
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

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message:
          "Only pending bookings can be cancelled",
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