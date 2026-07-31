import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  Ticket,
  CreditCard,
  Star,
  MessageSquareWarning,
  Bell,
  BarChart3,
  Settings,
  ClipboardList,
  LogOut,
  Search,
  TrainFront,
} from "lucide-react";

import "./Sidebar.css";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Porter Applications",
    icon: BriefcaseBusiness,
    path: "/admin/porters",
  },
  {
    title: "Bookings",
    icon: Ticket,
    path: "/admin/bookings",
  },
  {
    title: "Payments",
    icon: CreditCard,
    path: "/admin/payments",
  },
  {
    title: "Reviews",
    icon: Star,
    path: "/admin/reviews",
  },
  {
    title: "Complaints",
    icon: MessageSquareWarning,
    path: "/admin/complaints",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/admin/notifications",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
  {
    title: "Activity Logs",
    icon: ClipboardList,
    path: "/admin/activity-logs",
  },
];

const Sidebar = () => {
  return (
    <aside className="tp-admin-sidebar">

      {/* Logo */}

      <div className="tp-admin-logo">

        <div className="tp-admin-logo-icon">
          <TrainFront size={22} />
        </div>

        <div>
          <h2>TrainPorter</h2>
          <span>Admin Panel</span>
        </div>

      </div>

      {/* Search */}

      <div className="tp-admin-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      {/* Navigation */}

      <nav className="tp-admin-nav">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                isActive
                  ? "tp-admin-nav-item active"
                  : "tp-admin-nav-item"
              }
            >

              <Icon size={20} />

              <span>{item.title}</span>

            </NavLink>

          );

        })}

      </nav>

      {/* Bottom */}

      <div className="tp-admin-sidebar-footer">

        <button
          className="tp-admin-logout-btn"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;