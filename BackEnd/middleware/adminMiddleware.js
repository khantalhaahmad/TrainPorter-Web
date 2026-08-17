const { errorResponse } = require("../utils/responseHandler");

const adminMiddleware = (req, res, next) => {
    console.log(
  "========== ADMIN CHECK =========="
);

console.log(
  "URL:",
  req.originalUrl
);

console.log(
  "USER ID:",
  req.user?.id
);

console.log(
  "USER ROLE:",
  req.user?.role
);

console.log(
  "ROLE TYPE:",
  typeof req.user?.role
);

console.log(
  "================================="
);
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