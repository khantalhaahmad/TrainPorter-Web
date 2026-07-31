import React from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AdminLayout from "../components/admin/layout/AdminLayout";

import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import UsersPage from "../pages/admin/UsersPage";
import PorterApplicationsPage from "../pages/admin/PorterApplicationsPage";
import BookingsPage from "../pages/admin/BookingsPage";
import PaymentsPage from "../pages/admin/PaymentsPage";
import ReviewsPage from "../pages/admin/ReviewsPage";
import ComplaintsPage from "../pages/admin/ComplaintsPage";
import NotificationsPage from "../pages/admin/NotificationsPage";
import AnalyticsPage from "../pages/admin/AnalyticsPage";
import SettingsPage from "../pages/admin/SettingsPage";
import ActivityLogsPage from "../pages/admin/ActivityLogsPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route
          path="/"
          element={<AdminDashboardPage />}
        />

        <Route
          path="/users"
          element={<UsersPage />}
        />

        <Route
          path="/porters"
          element={<PorterApplicationsPage />}
        />

        <Route
          path="/bookings"
          element={<BookingsPage />}
        />

        <Route
          path="/payments"
          element={<PaymentsPage />}
        />

        <Route
          path="/reviews"
          element={<ReviewsPage />}
        />

        <Route
          path="/complaints"
          element={<ComplaintsPage />}
        />

        <Route
          path="/notifications"
          element={<NotificationsPage />}
        />

        <Route
          path="/analytics"
          element={<AnalyticsPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

        <Route
          path="/activity-logs"
          element={<ActivityLogsPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;