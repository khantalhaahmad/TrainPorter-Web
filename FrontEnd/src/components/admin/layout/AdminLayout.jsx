import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="tp-admin-layout">
      <aside className="tp-admin-sidebar-wrapper">
        <Sidebar />
      </aside>

      <div className="tp-admin-main-wrapper">
        <Header />

        <main className="tp-admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;