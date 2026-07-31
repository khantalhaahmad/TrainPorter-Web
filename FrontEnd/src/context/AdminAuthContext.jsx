import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const AdminAuthContext =
  createContext();

export const AdminAuthProvider = ({
  children,
}) => {

  const [admin, setAdmin] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ============================
  // Check Login
  // ============================

  useEffect(() => {

    const loadAdmin = async () => {

      try {

        const token =
          localStorage.getItem(
            "adminToken"
          );

        if (!token) {

          setLoading(false);

          return;

        }

        api.defaults.headers.common.Authorization =
          `Bearer ${token}`;

        const res =
          await api.get(
            "/auth/me"
          );

        if (
          res.data.success
        ) {

          setAdmin(
            res.data.data.user
          );

        }

      } catch (error) {

        console.error(error);

        localStorage.removeItem(
          "adminToken"
        );

      } finally {

        setLoading(false);

      }

    };

    loadAdmin();

  }, []);

  // ============================
  // Login
  // ============================

  const login = async (
    email,
    password
  ) => {

    const res =
      await api.post(
        "/auth/admin/login",
        {
          email,
          password,
        }
      );

 const token = res.data.token;

localStorage.setItem(
  "adminToken",
  token
);

api.defaults.headers.common.Authorization =
  `Bearer ${token}`;

setAdmin(
  res.data.user
);

return res.data;

  };

  // ============================
  // Logout
  // ============================

  const logout = () => {

    localStorage.removeItem(
      "adminToken"
    );

    delete api.defaults.headers.common.Authorization;

    setAdmin(null);

  };

  // ============================
  // Refresh
  // ============================

  const refreshAdmin =
    async () => {

      try {

        const res =
          await api.get(
            "/auth/me"
          );

        setAdmin(
          res.data.data.user
        );

      } catch (error) {

        console.error(error);

      }

    };

  // ============================

  return (

    <AdminAuthContext.Provider
      value={{

        admin,

        loading,

        login,

        logout,

        refreshAdmin,

        isAuthenticated:
          !!admin,

      }}
    >

      {children}

    </AdminAuthContext.Provider>

  );

};

// ============================

export const useAdminAuth =
  () =>
    useContext(
      AdminAuthContext
    );