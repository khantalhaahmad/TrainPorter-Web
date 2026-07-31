const { errorResponse } = require("../utils/responseHandler");

const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return errorResponse(res, "Unauthorized", 401);
    }

    if (req.user.role !== "admin") {
      return errorResponse(
        res,
        "Access denied. Admin only.",
        403
      );
    }

    next();
  } catch (error) {
    return errorResponse(
      res,
      "Authorization failed",
      500
    );
  }
};

module.exports = adminMiddleware;