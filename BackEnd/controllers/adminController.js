const { successResponse, errorResponse } = require("../utils/responseHandler");
const adminService = require("../services/adminService");

const getDashboard = async (req, res) => {
  try {
    const dashboardData = await adminService.getDashboardData();

    // ===== DEBUG =====
    console.log("========== DASHBOARD STATS ==========");
    console.log(dashboardData.stats);
    console.log("====================================");
    // ==================

    return successResponse(
      res,
      "Dashboard data fetched successfully",
      dashboardData
    );
  } catch (error) {
    console.error("Admin Dashboard Error:", error);

    return errorResponse(
      res,
      "Failed to fetch dashboard data",
      500
    );
  }
};

const getPorterApplications = async (req, res) => {
  try {

    const applications =
      await adminService.getPorterApplications();

    return successResponse(
      res,
      "Porter applications fetched successfully",
      {
        applications,
      }
    );

  } catch (error) {

    return errorResponse(
      res,
      error.message,
      500
    );

  }
};

const getPorterApplication = async (req, res) => {
  try {

    const application =
      await adminService.getPorterApplication(
        req.params.id
      );

    return successResponse(
      res,
      "Porter application fetched successfully",
      {
        application,
      }
    );

  } catch (error) {

  console.error("GET PORTER APPLICATION ERROR:");
  console.error(error);

  return errorResponse(
    res,
    error.message,
    500
  );

}
};


const approvePorter = async (req, res) => {

  console.log("========== APPROVE API HIT ==========");
  console.log("Application ID:", req.params.id);
  console.log("Admin ID:", req.user.id);
  console.log("=====================================");

  try {

    const result = await adminService.approvePorter(
      req.params.id,
      req.user.id
    );

    console.log("========== APPROVE SUCCESS ==========");
    console.log(result);
    console.log("=====================================");

    return successResponse(
      res,
      result.message,
      {
        application: result.application,
      }
    );

  } catch (error) {

    console.error("========== APPROVE ERROR ==========");
    console.error(error);
    console.error(error.stack);
    console.error("===================================");

    return errorResponse(
      res,
      error.message,
      500
    );

  }

};
const rejectPorter = async (req, res) => {

  console.log("========== REJECT API HIT ==========");
  console.log("Application ID:", req.params.id);
  console.log("Admin ID:", req.user.id);
  console.log("Reason:", req.body.reason);
  console.log("====================================");

  try {

    const result =
      await adminService.rejectPorter(
        req.params.id,
        req.user.id,
        req.body.reason
      );

    console.log("========== REJECT SUCCESS ==========");
    console.log(result);
    console.log("===================================");

    return successResponse(
      res,
      result.message,
      {
        application: result.application,
      }
    );

  } catch (error) {

    console.error("========== REJECT ERROR ==========");
    console.error(error);
    console.error(error.stack);
    console.error("==================================");

    return errorResponse(
      res,
      error.message,
      500
    );

  }

};
/* ==========================================================
   BOOKINGS
========================================================== */

const getBookings = async (req, res) => {

  try {

    const bookings =
      await adminService.getBookings();

    return successResponse(
      res,
      "Bookings fetched successfully",
      {
        bookings,
      }
    );

  } catch (error) {

    console.error("GET BOOKINGS ERROR:");
    console.error(error);

    return errorResponse(
      res,
      error.message,
      500
    );

  }

};

const getBooking = async (req, res) => {

  try {

    const booking =
      await adminService.getBooking(
        req.params.id
      );

    return successResponse(
      res,
      "Booking fetched successfully",
      {
        booking,
      }
    );

  } catch (error) {

    console.error("GET BOOKING ERROR:");
    console.error(error);

    return errorResponse(
      res,
      error.message,
      500
    );

  }

};

const updateBookingStatus = async (req, res) => {

  try {

    const booking =
      await adminService.updateBookingStatus(
        req.params.id,
        req.body.status
      );

    return successResponse(
      res,
      "Booking status updated successfully",
      {
        booking,
      }
    );

  } catch (error) {

    console.error("UPDATE BOOKING STATUS ERROR:");
    console.error(error);

    return errorResponse(
      res,
      error.message,
      500
    );

  }

};

module.exports = {
  getDashboard,

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