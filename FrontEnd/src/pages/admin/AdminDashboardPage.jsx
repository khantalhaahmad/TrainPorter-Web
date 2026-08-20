import React, { useEffect, useState } from "react";

import DashboardCards from "../../components/admin/dashboard/DashboardCards";
import BookingTrendChart from "../../components/admin/dashboard/BookingTrendChart";
import RevenueChart from "../../components/admin/dashboard/RevenueChart";
import BookingStatusChart from "../../components/admin/dashboard/BookingStatusChart";
import PendingActions from "../../components/admin/dashboard/PendingActions";
import RecentBookings from "../../components/admin/dashboard/RecentBookings";
import NotificationsPanel from "../../components/admin/dashboard/NotificationsPanel";
import SystemStatus from "../../components/admin/dashboard/SystemStatus";
import TopStations from "../../components/admin/dashboard/TopStations";
import TopPorters from "../../components/admin/dashboard/TopPorters";

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

      {/* ==========================================
            DASHBOARD CARDS
      ========================================== */}

      <DashboardCards
        stats={dashboardData?.stats}
      />


      {/* ==========================================
            MAIN DASHBOARD GRID
      ========================================== */}

      <div
        className="tp-admin-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "28px",
          marginTop: "28px",
          alignItems: "start",
        }}
      >

        {/* ==========================================
              LEFT MAIN COLUMN
        ========================================== */}

        <div>

          {/* ==========================================
                BOOKING + REVENUE ANALYTICS
          ========================================== */}

          <div
            className="tp-admin-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "28px",
            }}
          >

            <BookingTrendChart
              data={dashboardData?.bookingTrend}
            />

            <RevenueChart
              data={dashboardData?.revenueTrend}
            />

          </div>


          {/* ==========================================
                BOOKING STATUS + TOP STATIONS
          ========================================== */}

          <div
            className="tp-admin-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "28px",
              marginTop: "28px",
            }}
          >

            <BookingStatusChart
              data={dashboardData?.bookingStatus}
            />

            <TopStations />

          </div>


          {/* ==========================================
                TOP RATED PORTERS + PENDING ACTIONS
          ========================================== */}

          <div
            className="tp-admin-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "28px",
              marginTop: "28px",
            }}
          >

            <TopPorters />

            <PendingActions
              data={
                dashboardData?.pendingActions
              }
            />

          </div>


          {/* ==========================================
                RECENT BOOKINGS
          ========================================== */}

          <div
            className="tp-admin-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "28px",
              marginTop: "28px",
            }}
          >

            <RecentBookings
              bookings={
                dashboardData?.recentBookings
              }
            />

          </div>

        </div>


        {/* ==========================================
              RIGHT SIDEBAR
        ========================================== */}

        <div>

          {/* ==========================================
                NOTIFICATIONS
          ========================================== */}

          <div
            className="tp-admin-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "28px",
            }}
          >

            <NotificationsPanel
              notifications={
                dashboardData?.notifications
              }
            />

          </div>


          {/* ==========================================
                SYSTEM STATUS
          ========================================== */}

          <div
            className="tp-admin-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "28px",
              marginTop: "28px",
            }}
          >

            <SystemStatus />

          </div>

        </div>

      </div>

    </div>

  );

};

export default AdminDashboardPage;