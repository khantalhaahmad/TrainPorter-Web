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
  admin = {
    name: "Super Admin",
    role: "Administrator",
    avatar:
      "https://ui-avatars.com/api/?name=Admin&background=ff7a00&color=fff",
  },
}) => {
  return (
    <header className="tp-admin-header">

      {/* Left */}

      <div className="tp-admin-header-left">

        <button
          className="tp-admin-mobile-btn"
          onClick={onMenuToggle}
        >
          <Menu size={22} />
        </button>

        <div>

          <h1 className="tp-admin-page-title">
            Dashboard
          </h1>

          <p className="tp-admin-breadcrumb">
            Home / Dashboard
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="tp-admin-header-right">

        {/* Search */}

        <div className="tp-admin-header-search">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search users, bookings..."
          />

        </div>

        {/* Notifications */}

        <button className="tp-admin-icon-btn">

          <Bell size={20} />

          <span className="tp-admin-badge">
            4
          </span>

        </button>

        {/* Messages */}

        <button className="tp-admin-icon-btn">

          <MessageCircle size={20} />

          <span className="tp-admin-badge">
            2
          </span>

        </button>

        {/* Profile */}

        <div className="tp-admin-profile">

          <img
            src={admin.avatar}
            alt="Admin"
          />

          <div className="tp-admin-profile-info">

            <h4>{admin.name}</h4>

            <span>{admin.role}</span>

          </div>

          <ChevronDown size={18} />

        </div>

      </div>

    </header>
  );
};

export default Header;