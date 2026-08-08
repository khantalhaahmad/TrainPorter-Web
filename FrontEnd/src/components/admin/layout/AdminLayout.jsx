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

  /* ==========================================
      Header Configuration
  ========================================== */

  const headerConfig = {

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

  const currentHeader =
    headerConfig[location.pathname] || {

      title: "",

      breadcrumb: "",

      searchPlaceholder: "Search...",

    };

  return (

    <div className="tp-admin-layout">

      {/* ==========================================
          Sidebar
      ========================================== */}

      <aside className="tp-admin-sidebar-wrapper">

        <Sidebar />

      </aside>

      {/* ==========================================
          Main
      ========================================== */}

      <div className="tp-admin-main-wrapper">

        <Header

          title={currentHeader.title}

          breadcrumb={currentHeader.breadcrumb}

          searchPlaceholder={
            currentHeader.searchPlaceholder
          }

        />

        <main className="tp-admin-content">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default AdminLayout;