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

import "../../components/admin/dashboard/AdminDashboardPage.css";

import { getDashboard } from "../../services/adminService";

const AdminDashboardPage = () => {

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {

    try {

      const response = await getDashboard();

      console.log(
        "========== DASHBOARD RESPONSE =========="
      );

      console.log("FULL RESPONSE:", response);
      console.log("RESPONSE DATA:", response.data);

      console.log(
        "NOTIFICATIONS:",
        response.data?.notifications
      );

      console.log(
        "NOTIFICATION COUNT:",
        response.data?.notifications?.length
      );

      console.log("========================================");

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

      {/* ==================================================
          DASHBOARD LAYOUT
      ================================================== */}

      <div className="tp-dashboard-layout">

        {/* ==================================================
            LEFT MAIN COLUMN
        ================================================== */}

        <div className="tp-dashboard-left">

          {/* ==========================
              STATS CARDS
          ========================== */}

          <div className="tp-dashboard-stats-section">

            <DashboardCards
              stats={dashboardData?.stats}
            />

          </div>


          {/* ==========================
              BOOKING + REVENUE
          ========================== */}

          <div className="tp-dashboard-analytics-grid">

            <BookingTrendChart
              data={
                dashboardData?.bookingTrend
              }
            />

            <RevenueChart
              data={
                dashboardData?.revenueTrend
              }
            />

          </div>


          {/* ==========================
              BOOKING STATUS + STATIONS
          ========================== */}

          <div className="tp-dashboard-two-column">

            <BookingStatusChart
              data={
                dashboardData?.bookingStatus
              }
            />

            <TopStations
              stations={
                dashboardData?.topStations
              }
            />

          </div>


          {/* ==========================
              TOP PORTERS
          ========================== */}

          <div className="tp-dashboard-single-column">

            <TopPorters
              porters={
                dashboardData?.topPorters || []
              }
            />

          </div>

        </div>


        {/* ==================================================
            RIGHT SIDEBAR
        ================================================== */}

        <div className="tp-dashboard-right-sidebar">

          {/* ==========================
              PENDING ACTIONS
          ========================== */}

          <PendingActions
            data={
              dashboardData?.pendingActions
            }
          />


          {/* ==========================
              NOTIFICATIONS
          ========================== */}

          <NotificationsPanel
            notifications={
              dashboardData?.notifications
            }
          />


          {/* ==========================
              SYSTEM STATUS
          ========================== */}

          <SystemStatus
            status={
              dashboardData?.systemStatus
            }
          />

        </div>

      </div>

    </div>

  );

};

export default AdminDashboardPage;