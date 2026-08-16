import api from "./api";

// ==========================================================
// PAYMENT SUMMARY
// ==========================================================

export const getPaymentSummary = async () => {
  const response = await api.get(
    "/admin/payments/summary"
  );

  return response.data;
};


// ==========================================================
// GET PAYMENTS
// ==========================================================

export const getPayments = async (params = {}) => {
  const response = await api.get(
    "/admin/payments",
    {
      params,
    }
  );

  return response.data;
};


// ==========================================================
// GET PAYMENT DETAILS
// ==========================================================

export const getPaymentDetails = async (id) => {
  const response = await api.get(
    `/admin/payments/${id}`
  );

  return response.data;
};


// ==========================================================
// PAYMENT ANALYTICS
// ==========================================================

export const getPaymentAnalytics = async () => {
  const response = await api.get(
    "/admin/payments/analytics"
  );

  return response.data;
};