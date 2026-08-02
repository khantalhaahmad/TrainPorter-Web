import React, { useEffect, useState } from "react";

import DashboardCards from "../../components/admin/dashboard/DashboardCards";
import BookingTrendChart from "../../components/admin/dashboard/BookingTrendChart";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import BookingStatusChart from "../../components/admin/dashboard/BookingStatusChart";
import PendingActions from "../../components/admin/dashboard/PendingActions";
import RecentBookings from "../../components/admin/dashboard/RecentBookings";
import RecentActivities from "../../components/admin/dashboard/RecentActivities";
import NotificationsPanel from "../../components/admin/dashboard/NotificationsPanel";
import SystemStatus from "../../components/admin/dashboard/SystemStatus";
import TopStations from "../../components/admin/dashboard/TopStations";

import { getDashboard } from "../../services/adminService";

const AdminDashboardPage = () => {

  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {

    try {

      const response = await getDashboard();

      setDashboardData(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  if (loading) {

    return (

      <div className="tp-admin-page">

        Loading Dashboard...

      </div>

    );

  }

  return (

    <div className="tp-admin-page">

      {/* ===========================
            Dashboard Cards
      ============================ */}

      <DashboardCards
        stats={dashboardData?.stats}
      />

      {/* ===========================
              Charts
      ============================ */}

      <div
        className="tp-admin-grid"
        style={{
          gridTemplateColumns:
            "2fr 1fr",
          marginTop: "28px",
        }}
      >

        <BookingTrendChart
          data={dashboardData?.bookingTrend}
        />

        <RevenueChart
          data={dashboardData?.revenueTrend}
        />

      </div>

      {/* ===========================
            Second Row
      ============================ */}

      <div
        className="tp-admin-grid"
        style={{
          gridTemplateColumns:
            "1fr 1fr",
          marginTop: "28px",
        }}
      >

        <BookingStatusChart
          data={dashboardData?.bookingStatus}
        />

        <TopStations />

      </div>

      {/* ===========================
            Third Row
      ============================ */}

      <div
        className="tp-admin-grid"
        style={{
          gridTemplateColumns:
            "2fr 1fr",
          marginTop: "28px",
        }}
      >

        <RecentBookings
          bookings={
            dashboardData?.recentBookings
          }
        />

        <PendingActions
          data={
            dashboardData?.pendingActions
          }
        />

      </div>

      {/* ===========================
            Fourth Row
      ============================ */}

      <div
        className="tp-admin-grid"
        style={{
          gridTemplateColumns:
            "2fr 1fr",
          marginTop: "28px",
        }}
      >

        <RecentActivities
          activities={
            dashboardData?.recentActivities
          }
        />

        <NotificationsPanel
          notifications={
            dashboardData?.notifications
          }
        />

      </div>

      {/* ===========================
            Last Row
      ============================ */}

      <div
        style={{
          marginTop: "28px",
        }}
      >

        <SystemStatus />

      </div>

    </div>

  );

};

export default AdminDashboardPage;