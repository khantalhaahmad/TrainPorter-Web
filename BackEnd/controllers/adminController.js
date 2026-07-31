const { successResponse, errorResponse } = require("../utils/responseHandler");
const adminService = require("../services/adminService");

const getDashboard = async (req, res) => {
  try {
    const dashboardData = await adminService.getDashboardData();

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

module.exports = {
  getDashboard,
};