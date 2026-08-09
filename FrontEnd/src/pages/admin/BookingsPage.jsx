import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getBookings,
  updateBookingStatus,
} from "../../services/adminService";

import BookingStatsCards from "../../components/admin/booking/BookingStatsCards";
import BookingFilters from "../../components/admin/booking/BookingFilters";
import BookingTable from "../../components/admin/booking/BookingTable";
import BookingDrawer from "../../components/admin/booking/BookingDrawer";

import { toast } from "sonner";

import "../../components/admin/booking/booking.css";

const BookingPage = () => {

  // ==========================================================
  // STATES
  // ==========================================================

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("newest");

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const [statusUpdating, setStatusUpdating] =
    useState(false);

  // ==========================================================
  // FETCH BOOKINGS
  // ==========================================================

  const fetchBookings = async () => {

    try {

      setLoading(true);

      const response =
        await getBookings();

      console.log(
        "BOOKINGS:",
        response.data
      );

      setBookings(
        response.data.bookings || []
      );

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch bookings."
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchBookings();

  }, []);

  // ==========================================================
  // SEARCH
  // ==========================================================

  const searchBookings = (
    booking
  ) => {

    if (!search.trim()) {

      return true;

    }

    const keyword =
      search.toLowerCase();

    return (

      booking.bookingId
        ?.toLowerCase()
        .includes(keyword)

      ||

      booking.trainName
        ?.toLowerCase()
        .includes(keyword)

      ||

      booking.trainNumber
        ?.toLowerCase()
        .includes(keyword)

      ||

      booking.station
        ?.toLowerCase()
        .includes(keyword)

      ||

      booking.assignedPorter?.name
        ?.toLowerCase()
        .includes(keyword)

    );

  };

  // ==========================================================
  // STATUS FILTER
  // ==========================================================

  const statusMatched = (
    booking
  ) => {

    if (
      statusFilter === "all"
    ) {

      return true;

    }

    return (
      booking.status ===
      statusFilter
    );

  };

  // ==========================================================
  // SORT
  // ==========================================================

  const sortBookings = (
    bookingList
  ) => {

    const list =
      [...bookingList];

    switch (sortBy) {

      case "oldest":

        list.sort(
          (a, b) =>
            new Date(a.createdAt) -
            new Date(b.createdAt)
        );

        break;

      case "highest":

        list.sort(
          (a, b) =>
            b.amount -
            a.amount
        );

        break;

      case "lowest":

        list.sort(
          (a, b) =>
            a.amount -
            b.amount
        );

        break;

      default:

        list.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );

    }

    return list;

  };

  // ==========================================================
  // FILTERED BOOKINGS
  // ==========================================================

  const filteredBookings =
    useMemo(() => {

      const filtered =
        bookings.filter(
          (booking) =>

            searchBookings(
              booking
            )

            &&

            statusMatched(
              booking
            )
        );

      return sortBookings(
        filtered
      );

    }, [
      bookings,
      search,
      statusFilter,
      sortBy,
    ]);

  // ==========================================================
  // DRAWER
  // ==========================================================

  const handleViewBooking = (
    booking
  ) => {

    setSelectedBooking(
      booking
    );

    setDrawerOpen(true);

  };

  const closeDrawer = () => {

    setDrawerOpen(false);

    setSelectedBooking(null);

  };

  // ==========================================================
  // UPDATE STATUS
  // ==========================================================

  const handleStatusUpdate =
    async (
      bookingId,
      status
    ) => {

      try {

        setStatusUpdating(
          true
        );

        await updateBookingStatus(

          bookingId,

          status

        );

        toast.success(
          "Booking status updated."
        );

        await fetchBookings();

        if (
          selectedBooking
        ) {

          setSelectedBooking(
            (prev) => ({
              ...prev,
              status,
            })
          );

        }

      } catch (error) {

        console.error(
          error
        );

        toast.error(

          error.response?.data
            ?.message ||

            "Failed to update booking."

        );

      } finally {

        setStatusUpdating(
          false
        );

      }

    };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <div className="tp-booking-loading">

        Loading bookings...

      </div>

    );

  }

  // ==========================================================
  // RETURN
  // ==========================================================

  return (

  <div className="tp-booking-page tp-booking-page-wide">

    {/* ==========================================================
        PAGE HEADER
    ========================================================== */}

    <div className="tp-booking-header">

      <div className="tp-booking-header-left">

        <h1 className="tp-booking-title">

          Booking Management

        </h1>

        <p className="tp-booking-subtitle">

          Monitor, manage and update passenger bookings across all railway stations.

        </p>

      </div>

    </div>

    {/* ==========================================================
        STATS
    ========================================================== */}

    <div className="tp-booking-stats-wrapper">

      <BookingStatsCards
        bookings={filteredBookings}
      />

    </div>

    {/* ==========================================================
        FILTERS
    ========================================================== */}

    <div className="tp-booking-filter-wrapper">

      <BookingFilters

        bookings={bookings}

        search={search}

        setSearch={setSearch}

        statusFilter={statusFilter}

        setStatusFilter={
          setStatusFilter
        }

        sortBy={sortBy}

        setSortBy={setSortBy}

      />

    </div>

    {/* ==========================================================
        TABLE
    ========================================================== */}

    <div className="tp-booking-table-wrapper">

      <BookingTable

        bookings={
          filteredBookings
        }

        onView={
          handleViewBooking
        }

      />

    </div>

    {/* ==========================================================
        DRAWER
    ========================================================== */}

    <BookingDrawer

      open={drawerOpen}

      booking={
        selectedBooking
      }

      onClose={
        closeDrawer
      }

      onStatusUpdate={
        handleStatusUpdate
      }

      updating={
        statusUpdating
      }

    />

  </div>

);

};

export default BookingPage;