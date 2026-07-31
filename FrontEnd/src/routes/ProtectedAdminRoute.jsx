import React from "react";
import { Navigate } from "react-router-dom";

import { useAdminAuth } from "../context/AdminAuthContext";

const ProtectedAdminRoute = ({ children }) => {

  const {
    admin,
    loading,
  } = useAdminAuth();

  if (loading) {

    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          fontWeight: "600",
        }}
      >
        Loading...
      </div>
    );

  }

  if (!admin) {

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );

  }

  return children;

};

export default ProtectedAdminRoute;