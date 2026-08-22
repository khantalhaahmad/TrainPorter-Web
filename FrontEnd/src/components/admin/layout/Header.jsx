import React from "react";

import {
  Search,
  Bell,
  MessageCircle,
  ChevronDown,
  Menu,
} from "lucide-react";

import "./Header.css";

const Header = ({
  onMenuToggle,

  title = "",

  breadcrumb = "",

  searchPlaceholder = "Search...",

  // Hide search bar when true
  hideSearch = false,

  // Hide notification, message and profile actions when true
  hideActions = false,

  // Compact header styling for dashboard
  dashboardHeader = false,

  admin = {
    name: "Super Admin",

    role: "Administrator",

    avatar:
      "https://ui-avatars.com/api/?name=Admin&background=ff7a00&color=fff",
  },
}) => {

  return (
    <header
      className={`tp-admin-header ${
        dashboardHeader
          ? "tp-dashboard-header"
          : ""
      }`}
    >

      {/* ==================================================
          LEFT SECTION
      ================================================== */}

      <div className="tp-admin-header-left">

        {/* ==================================================
            MOBILE MENU
        ================================================== */}

        <button
          type="button"
          className="tp-admin-mobile-btn"
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>


        {/* ==================================================
            PAGE TITLE
        ================================================== */}

        {title && (
          <div
            className={`tp-admin-header-page-info ${
              dashboardHeader
                ? "tp-dashboard-header-title"
                : ""
            }`}
          >

            <h1 className="tp-admin-page-title">
              {title}
            </h1>


            {/* ==================================================
                BREADCRUMB
            ================================================== */}

            {breadcrumb && (
              <p className="tp-admin-breadcrumb">
                {breadcrumb}
              </p>
            )}

          </div>
        )}

      </div>


      {/* ==================================================
          RIGHT SECTION
      ================================================== */}

      <div className="tp-admin-header-right">

        {/* ==================================================
            SEARCH
            Hidden on dashboard when hideSearch = true
        ================================================== */}

        {!hideSearch && (
          <div className="tp-admin-header-search">

            <Search
              size={18}
              aria-hidden="true"
            />

            <input
              type="text"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />

          </div>
        )}


        {/* ==================================================
            HEADER ACTIONS

            Notification
            Messages
            Admin Profile
        ================================================== */}

        {!hideActions && (
          <>

            {/* ==================================================
                NOTIFICATIONS
            ================================================== */}

            <button
              type="button"
              className="tp-admin-icon-btn"
              aria-label="Notifications"
            >

              <Bell
                size={20}
                aria-hidden="true"
              />

              <span className="tp-admin-badge">
                4
              </span>

            </button>


            {/* ==================================================
                MESSAGES
            ================================================== */}

            <button
              type="button"
              className="tp-admin-icon-btn"
              aria-label="Messages"
            >

              <MessageCircle
                size={20}
                aria-hidden="true"
              />

              <span className="tp-admin-badge">
                2
              </span>

            </button>


            {/* ==================================================
                ADMIN PROFILE
            ================================================== */}

            <div className="tp-admin-profile">

              <img
                src={admin.avatar}
                alt={admin.name}
              />


              <div className="tp-admin-profile-info">

                <h4>
                  {admin.name}
                </h4>

                <span>
                  {admin.role}
                </span>

              </div>


              <ChevronDown
                size={18}
                aria-hidden="true"
              />

            </div>

          </>
        )}

      </div>

    </header>
  );
};

export default Header;