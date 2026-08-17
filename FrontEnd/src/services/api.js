import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ======================================
// Attach JWT Token Automatically
// ======================================
api.interceptors.request.use(
  (config) => {

    const isAdminRoute =
      config.url?.startsWith("/admin");

    const token = isAdminRoute
      ? localStorage.getItem("adminToken")
      : localStorage.getItem("token");

    console.log(
      "========== API REQUEST =========="
    );

    console.log(
      "URL:",
      config.url
    );

    console.log(
      "IS ADMIN ROUTE:",
      isAdminRoute
    );

    console.log(
      "TOKEN TYPE:",
      isAdminRoute
        ? "adminToken"
        : "userToken"
    );

    console.log(
      "TOKEN:",
      token
    );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    console.log(
      "AUTH HEADER:",
      config.headers.Authorization
    );

    console.log(
      "================================="
    );

    return config;

  },
  (error) => {
    return Promise.reject(error);
  }
);

// ======================================
// Global Response Error Handler
// ======================================

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API Error:",
      error.response?.data || error.message
    );

    return Promise.reject(error);
  }
);

export default api;