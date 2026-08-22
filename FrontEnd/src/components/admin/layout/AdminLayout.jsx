import React from "react";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import "./AdminLayout.css";

const AdminLayout = () => {

  const location = useLocation();

  /* ==================================================
      PAGE DETECTION
  ================================================== */

  const isDashboardPage =
    location.pathname === "/admin" ||
    location.pathname === "/admin/dashboard";

  const isUsersPage =
    location.pathname === "/admin/users";

  const isPaymentPage =
    location.pathname === "/admin/payments";


  /* ==================================================
      HEADER CONFIGURATION
  ================================================== */

  const headerConfig = {

    "/admin": {

      title: "Dashboard",

      breadcrumb: "",

      searchPlaceholder:
        "Search users, bookings...",

    },

    "/admin/dashboard": {

      title: "Dashboard",

      breadcrumb: "Home / Dashboard",

      searchPlaceholder:
        "Search users, bookings...",

    },

    "/admin/porters": {

      title: "",

      breadcrumb: "",

      searchPlaceholder:
        "Search porter, phone or application ID...",

    },

    "/admin/users": {

      title: "",

      breadcrumb: "",

      searchPlaceholder:
        "Search users...",

    },

    "/admin/bookings": {

      title: "",

      breadcrumb: "",

      searchPlaceholder:
        "Search bookings...",

    },

    "/admin/payments": {

      title: "",

      breadcrumb: "",

      searchPlaceholder:
        "Search payments...",

    },

    "/admin/reviews": {

      title: "",

      breadcrumb: "",

      searchPlaceholder:
        "Search reviews...",

    },

    "/admin/complaints": {

      title: "",

      breadcrumb: "",

      searchPlaceholder:
        "Search complaints...",

    },

    "/admin/settings": {

      title: "",

      breadcrumb: "",

      searchPlaceholder:
        "Search settings...",

    },

  };


  /* ==================================================
      CURRENT HEADER
  ================================================== */

  const currentHeader =
    headerConfig[location.pathname] || {

      title: "",

      breadcrumb: "",

      searchPlaceholder: "Search...",

    };


  /* ==================================================
      RETURN
  ================================================== */

  return (

    <div className="tp-admin-layout">

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside className="tp-admin-sidebar-wrapper">

        <Sidebar />

      </aside>


      {/* ==================================================
          MAIN WRAPPER
      ================================================== */}

      <div className="tp-admin-main-wrapper">


        {/* ==================================================
            HEADER

            Dashboard:
            /admin
            /admin/dashboard

            Search hidden
            Dashboard title shown
            Compact actions enabled
        ================================================== */}

        {!isPaymentPage && !isUsersPage && (

          <Header

            title={
              currentHeader.title
            }

            breadcrumb={
              currentHeader.breadcrumb
            }

            searchPlaceholder={
              currentHeader.searchPlaceholder
            }

            hideSearch={
              isDashboardPage
            }

            dashboardHeader={
              isDashboardPage
            }

          />

        )}


        {/* ==================================================
            CONTENT
        ================================================== */}

        <main
          className={`tp-admin-content ${
            isPaymentPage
              ? "tp-admin-payment-content"
              : ""
          }`}
        >

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default AdminLayout;