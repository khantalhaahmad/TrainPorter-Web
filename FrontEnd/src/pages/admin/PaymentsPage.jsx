import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  RefreshCw,
  AlertCircle,
  CreditCard,
  Calendar,
  ChevronDown,
  Download,
  SlidersHorizontal,
} from "lucide-react";

import PaymentStats from "../../components/admin/payments/PaymentStats";
import PaymentFilters from "../../components/admin/payments/PaymentFilters";
import PaymentTable from "../../components/admin/payments/PaymentTable";
import PaymentDetailsDrawer from "../../components/admin/payments/PaymentDetailsDrawer";
import PaymentAnalytics from "../../components/admin/payments/PaymentAnalytics";
import PaymentPagination from "../../components/admin/payments/PaymentPagination";

import {
  getPaymentSummary,
  getPayments,
  getPaymentDetails,
  getPaymentAnalytics,
} from "../../services/paymentService";

import "../../styles/admin/payments/PaymentsPage.css";


const PaymentPage = () => {

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const [summary, setSummary] = useState(null);

  const [summaryLoading, setSummaryLoading] =
    useState(true);


  // ==========================================================
  // PAYMENTS
  // ==========================================================

  const [payments, setPayments] = useState([]);

  const [paymentsLoading, setPaymentsLoading] =
    useState(true);


  // ==========================================================
  // ANALYTICS
  // ==========================================================

  const [analytics, setAnalytics] = useState({});

  const [analyticsLoading, setAnalyticsLoading] =
    useState(true);


  // ==========================================================
  // FILTERS
  // ==========================================================

  const defaultFilters = useMemo(
    () => ({
      search: "",
      status: "all",
      method: "all",
      bookingStatus: "all",
      from: "",
      to: "",
    }),
    []
  );

  const [filters, setFilters] =
    useState(defaultFilters);


  // ==========================================================
  // PAGINATION
  // ==========================================================

const [pagination, setPagination] =
  useState({
    page: 1,
    limit: 5,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });

  // ==========================================================
  // DETAILS DRAWER
  // ==========================================================

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const [drawerLoading, setDrawerLoading] =
    useState(false);


  // ==========================================================
  // PAGE ERROR
  // ==========================================================

  const [error, setError] =
    useState("");


  // ==========================================================
  // REFRESH STATE
  // ==========================================================

  const [refreshing, setRefreshing] =
    useState(false);


  // ==========================================================
  // FETCH SUMMARY
  // ==========================================================

  const fetchSummary = useCallback(
    async () => {

      try {

        setSummaryLoading(true);

        const response =
          await getPaymentSummary();

        if (!response?.success) {

          throw new Error(
            response?.message ||
            "Failed to fetch payment summary."
          );

        }

        setSummary(
          response?.data || {}
        );

      } catch (err) {

        console.error(
          "Payment Summary Error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load payment summary."
        );

      } finally {

        setSummaryLoading(false);

      }

    },
    []
  );


  // ==========================================================
  // FETCH PAYMENTS
  // ==========================================================

 const fetchPayments = useCallback(
  async (
    currentPage = 1,
    currentFilters = filters
  ) => {

      try {

        setPaymentsLoading(true);

        const params = {
          page: currentPage,
          limit: pagination.limit,
        };


        // -----------------------------------------------
        // Search
        // -----------------------------------------------

        if (
          currentFilters.search?.trim()
        ) {

          params.search =
            currentFilters.search.trim();

        }


        // -----------------------------------------------
        // Payment Status
        // -----------------------------------------------

        if (
          currentFilters.status &&
          currentFilters.status !== "all"
        ) {

          params.status =
            currentFilters.status;

        }


        // -----------------------------------------------
        // Payment Method
        // -----------------------------------------------

        if (
          currentFilters.method &&
          currentFilters.method !== "all"
        ) {

          params.method =
            currentFilters.method;

        }


        // -----------------------------------------------
        // Booking Status
        // -----------------------------------------------

        if (
          currentFilters.bookingStatus &&
          currentFilters.bookingStatus !== "all"
        ) {

          params.bookingStatus =
            currentFilters.bookingStatus;

        }


        // -----------------------------------------------
        // Date From
        // -----------------------------------------------

        if (currentFilters.from) {

          params.from =
            currentFilters.from;

        }


        // -----------------------------------------------
        // Date To
        // -----------------------------------------------

        if (currentFilters.to) {

          params.to =
            currentFilters.to;

        }


        const response =
          await getPayments(params);


        if (!response?.success) {

          throw new Error(
            response?.message ||
            "Failed to fetch payments."
          );

        }


        // =================================================
        // RESPONSE NORMALIZATION
        // =================================================

        const responseData =
          response?.data || {};


        const paymentList =
          Array.isArray(responseData)
            ? responseData
            : responseData?.payments ||
              responseData?.data ||
              [];


        setPayments(
          Array.isArray(paymentList)
            ? paymentList
            : []
        );


        // =================================================
        // PAGINATION
        // =================================================

        const backendPagination =
          responseData?.pagination ||
          response?.pagination ||
          {};


        const total =
          Number(
            backendPagination.total ??
            responseData.total ??
            response?.count ??
            paymentList.length
          );


        const limit =
          Number(
            backendPagination.limit ??
            params.limit
          );


        const page =
          Number(
            backendPagination.page ??
            currentPage
          );


        const totalPages =
          Number(
            backendPagination.totalPages ??
            (
              total > 0
                ? Math.ceil(
                    total / limit
                  )
                : 1
            )
          );


        setPagination({
          page,

          limit,

          total,

          totalPages,

          hasNext:
            backendPagination.hasNext ??
            page < totalPages,

          hasPrevious:
            backendPagination.hasPrevious ??
            page > 1,
        });


      } catch (err) {

        console.error(
          "Payments List Error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load payments."
        );

        setPayments([]);

      } finally {

        setPaymentsLoading(false);

      }

    },
 [
  filters,
  pagination.limit,
]
  );


  // ==========================================================
  // FETCH ANALYTICS
  // ==========================================================

  const fetchAnalytics =
    useCallback(
      async () => {

        try {

          setAnalyticsLoading(true);

          const response =
            await getPaymentAnalytics();

          if (!response?.success) {

            throw new Error(
              response?.message ||
              "Failed to fetch payment analytics."
            );

          }

          setAnalytics(
            response?.data || {}
          );

        } catch (err) {

          console.error(
            "Payment Analytics Error:",
            err
          );

          /*
           * Analytics should not break
           * the complete payment page.
           */

          setAnalytics({});

        } finally {

          setAnalyticsLoading(false);

        }

      },
      []
    );


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    fetchSummary();
    fetchAnalytics();

  }, [
    fetchSummary,
    fetchAnalytics,
  ]);


  // ==========================================================
  // PAYMENTS LOAD
  // ==========================================================

  useEffect(() => {

  const timer = setTimeout(() => {

    fetchPayments(
      1,
      filters
    );

  }, 350);

  return () => {
    clearTimeout(timer);
  };

}, [filters, fetchPayments]);

  // ==========================================================
  // FILTER CHANGE
  // ==========================================================

  const handleFilterChange =
    (updatedFilters) => {

      setFilters(
        updatedFilters
      );

      setPagination(
        (previous) => ({
          ...previous,
          page: 1,
        })
      );

      setError("");

    };


  // ==========================================================
  // CLEAR FILTERS
  // ==========================================================

  const handleClearFilters =
    () => {

      setFilters(
        defaultFilters
      );

      setPagination(
        (previous) => ({
          ...previous,
          page: 1,
        })
      );

      setError("");

    };


  // ==========================================================
  // PAGE CHANGE
  // ==========================================================

  const handlePageChange =
    (newPage) => {

      if (
        newPage < 1 ||
        newPage > pagination.totalPages ||
        newPage === pagination.page
      ) {
        return;
      }

      setPagination(
        (previous) => ({
          ...previous,
          page: newPage,
        })
      );


      fetchPayments(
        newPage,
        filters
      );

    };


  // ==========================================================
  // VIEW PAYMENT DETAILS
  // ==========================================================

  const handleViewPayment =
    async (paymentId) => {

      if (!paymentId) {

        console.error(
          "Payment ID missing."
        );

        return;

      }


      try {

        setDrawerOpen(true);

        setDrawerLoading(true);

        setSelectedPayment(null);


        const response =
          await getPaymentDetails(
            paymentId
          );


        if (!response?.success) {

          throw new Error(
            response?.message ||
            "Failed to fetch payment details."
          );

        }


        /*
         * Backend response:
         *
         * {
         *   success: true,
         *   data: {
         *      booking: {},
         *      payment: {},
         *      fareBreakdown: {},
         *      passenger: {},
         *      porter: {},
         *      paymentTimeline: {},
         *      assignedPorter: {}
         *   }
         * }
         */

        setSelectedPayment(
          response?.data || null
        );

      } catch (err) {

        console.error(
          "Payment Details Error:",
          err
        );

        setSelectedPayment(null);

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load payment details."
        );

      } finally {

        setDrawerLoading(false);

      }

    };


  // ==========================================================
  // CLOSE DRAWER
  // ==========================================================

  const handleCloseDrawer =
    () => {

      setDrawerOpen(false);

      setSelectedPayment(null);

    };


  // ==========================================================
  // REFRESH ALL DATA
  // ==========================================================

  const handleRefresh =
    async () => {

      try {

        setRefreshing(true);

        setError("");

        await Promise.all([
          fetchSummary(),
          fetchAnalytics(),
          fetchPayments(
            pagination.page,
            filters
          ),
        ]);

      } catch (err) {

        console.error(
          "Payment Refresh Error:",
          err
        );

      } finally {

        setRefreshing(false);

      }

    };


  // ==========================================================
  // RETRY
  // ==========================================================

  const handleRetry =
    async () => {

      setError("");

      await handleRefresh();

    };


  return (
    <div className="tp-payment-page">


      {/* ====================================================
          PAGE HEADER
      ==================================================== */}
<div className="tp-payment-page__header">

  {/* =========================
      LEFT
  ========================= */}

  <div className="tp-payment-page__header-left">

    <div className="tp-payment-page__icon">

      <CreditCard
        size={21}
        strokeWidth={2}
      />

    </div>

    <div>

      <h1>
        Payments
      </h1>

      <p>
        Manage all payment transactions and settlements
      </p>

    </div>

  </div>


  {/* =========================
      RIGHT ACTIONS
  ========================= */}

  <div className="tp-payment-page__header-actions">

    {/* DATE RANGE */}

    <button
      type="button"
      className="tp-payment-page__date-button"
    >

      <Calendar
        size={16}
        strokeWidth={2}
      />

      <span>
        12 Aug 2025 - 12 Aug 2026
      </span>

      <ChevronDown
        size={15}
        strokeWidth={2}
      />

    </button>


    {/* EXPORT */}

    <button
      type="button"
      className="tp-payment-page__export-button"
    >

      <Download
        size={16}
        strokeWidth={2}
      />

      <span>
        Export
      </span>

    </button>


    {/* FILTER */}

    <button
      type="button"
      className="tp-payment-page__filter-button"
    >

      <SlidersHorizontal
        size={16}
        strokeWidth={2}
      />

      <span>
        Filter
      </span>

    </button>


    {/* EXISTING REFRESH */}

    <button
      type="button"
      className="tp-payment-page__refresh"
      onClick={handleRefresh}
      disabled={
        refreshing ||
        summaryLoading ||
        paymentsLoading ||
        analyticsLoading
      }
    >

      <RefreshCw
        size={16}
        strokeWidth={2}
        className={
          refreshing
            ? "tp-payment-page__refresh-icon--spinning"
            : ""
        }
      />

      {refreshing
        ? "Refreshing..."
        : "Refresh"}

    </button>

  </div>

</div>


      {/* ====================================================
          ERROR
      ==================================================== */}

      {error && (

        <div className="tp-payment-page__error">

          <div className="tp-payment-page__error-content">

            <AlertCircle
              size={18}
              strokeWidth={2}
            />

            <div>

              <strong>
                Something went wrong
              </strong>

              <p>
                {error}
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={handleRetry}
          >
            Retry
          </button>

        </div>

      )}


      {/* ====================================================
          SUMMARY
      ==================================================== */}

      <div className="tp-payment-page__section">

        {summaryLoading ? (

          <div className="tp-payment-page__section-loader">

            <div className="tp-payment-page__spinner" />

            <span>
              Loading payment summary...
            </span>

          </div>

        ) : (

          <PaymentStats
            stats={
              summary?.cards || {}
            }
          />

        )}

      </div>


      {/* ====================================================
          FILTERS
      ==================================================== */}

      <div className="tp-payment-page__section">

        <PaymentFilters
          filters={filters}
          onChange={
            handleFilterChange
          }
          onClear={
            handleClearFilters
          }
        />

      </div>


      {/* ====================================================
          PAYMENT TABLE
      ==================================================== */}

      <div className="tp-payment-page__section">

        <PaymentTable
          payments={payments}
          loading={paymentsLoading}
          onView={
            handleViewPayment
          }
        />

        {!paymentsLoading &&
          payments.length > 0 && (

            <PaymentPagination
              pagination={
                pagination
              }
              onPageChange={
                handlePageChange
              }
            />

          )}

      </div>


      {/* ====================================================
          ANALYTICS
      ==================================================== */}

      <div className="tp-payment-page__section">

        <PaymentAnalytics
          analytics={
            analytics
          }
          loading={
            analyticsLoading
          }
        />

      </div>


      {/* ====================================================
          DETAILS DRAWER
      ==================================================== */}

      <PaymentDetailsDrawer
        open={drawerOpen}
        payment={selectedPayment}
        loading={drawerLoading}
        onClose={
          handleCloseDrawer
        }
      />

    </div>
  );
};

export default PaymentPage;