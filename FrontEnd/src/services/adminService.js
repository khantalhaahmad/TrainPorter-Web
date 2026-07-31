import api from "./api";

/* ==========================================================
   Dashboard
========================================================== */

export const getDashboard = async () => {
  return await api.get("/admin/dashboard");
};

/* ==========================================================
   Users
========================================================== */

export const getUsers = async (params = {}) => {
  return await api.get("/admin/users", { params });
};

export const getUserById = async (id) => {
  return await api.get(`/admin/users/${id}`);
};

export const blockUser = async (id) => {
  return await api.put(`/admin/users/${id}/block`);
};

export const unblockUser = async (id) => {
  return await api.put(`/admin/users/${id}/unblock`);
};

export const deleteUser = async (id) => {
  return await api.delete(`/admin/users/${id}`);
};

/* ==========================================================
   Porter Applications
========================================================== */

export const getPorterApplications = async (params = {}) => {
  return await api.get("/admin/porters", { params });
};

export const getPorterApplication = async (id) => {
  return await api.get(`/admin/porters/${id}`);
};

export const approvePorter = async (id, remarks = "") => {
  return await api.put(`/admin/porters/${id}/approve`, {
    remarks,
  });
};

export const rejectPorter = async (id, reason) => {
  return await api.put(`/admin/porters/${id}/reject`, {
    reason,
  });
};

/* ==========================================================
   Bookings
========================================================== */

export const getBookings = async (params = {}) => {
  return await api.get("/admin/bookings", { params });
};

export const getBooking = async (id) => {
  return await api.get(`/admin/bookings/${id}`);
};

export const updateBookingStatus = async (
  id,
  status
) => {
  return await api.put(
    `/admin/bookings/${id}/status`,
    {
      status,
    }
  );
};

/* ==========================================================
   Payments
========================================================== */

export const getPayments = async (params = {}) => {
  return await api.get("/admin/payments", {
    params,
  });
};

export const getPayment = async (id) => {
  return await api.get(`/admin/payments/${id}`);
};

/* ==========================================================
   Reviews
========================================================== */

export const getReviews = async (params = {}) => {
  return await api.get("/admin/reviews", {
    params,
  });
};

export const deleteReview = async (id) => {
  return await api.delete(`/admin/reviews/${id}`);
};

/* ==========================================================
   Complaints
========================================================== */

export const getComplaints = async (params = {}) => {
  return await api.get("/admin/complaints", {
    params,
  });
};

export const resolveComplaint = async (id) => {
  return await api.put(
    `/admin/complaints/${id}/resolve`
  );
};

/* ==========================================================
   Notifications
========================================================== */

export const getNotifications = async () => {
  return await api.get("/admin/notifications");
};

export const markNotificationRead = async (id) => {
  return await api.put(
    `/admin/notifications/${id}/read`
  );
};

export const markAllNotificationsRead =
  async () => {
    return await api.put(
      "/admin/notifications/read-all"
    );
  };

/* ==========================================================
   Analytics
========================================================== */

export const getAnalytics = async () => {
  return await api.get("/admin/analytics");
};

/* ==========================================================
   Activity Logs
========================================================== */

export const getActivityLogs = async (
  params = {}
) => {
  return await api.get(
    "/admin/activity-logs",
    {
      params,
    }
  );
};

/* ==========================================================
   System Status
========================================================== */

export const getSystemStatus = async () => {
  return await api.get("/admin/system-status");
};

/* ==========================================================
   Settings
========================================================== */

export const getSettings = async () => {
  return await api.get("/admin/settings");
};

export const updateSettings = async (
  data
) => {
  return await api.put(
    "/admin/settings",
    data
  );
};

/* ==========================================================
   Admin Profile
========================================================== */

export const getAdminProfile = async () => {
  return await api.get("/auth/me");
};

export const updateAdminProfile =
  async (data) => {
    return await api.put(
      "/admin/profile",
      data
    );
  };

export const changePassword = async (
  data
) => {
  return await api.put(
    "/admin/change-password",
    data
  );
};

/* ==========================================================
   Logout
========================================================== */

export const adminLogout = () => {
  localStorage.removeItem("adminToken");

  delete api.defaults.headers.common.Authorization;
};