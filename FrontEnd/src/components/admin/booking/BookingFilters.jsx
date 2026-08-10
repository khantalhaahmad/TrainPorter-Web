import React from "react";

import {
  ArrowUpDown,
} from "lucide-react";

const BookingFilters = ({

  bookings = [],

  search,

  setSearch,

  statusFilter,

  setStatusFilter,

  sortBy,

  setSortBy,

}) => {

  // ==========================================================
  // COUNTS
  // ==========================================================

  const assignedCount =
    bookings.filter(
      (item) =>
        item.status === "assigned"
    ).length;

  const acceptedCount =
    bookings.filter(
      (item) =>
        item.status === "accepted"
    ).length;

  const arrivedCount =
    bookings.filter(
      (item) =>
        item.status === "arrived"
    ).length;

  const progressCount =
    bookings.filter(
      (item) =>
        item.status ===
        "in_progress"
    ).length;

  const completedCount =
    bookings.filter(
      (item) =>
        item.status ===
        "completed"
    ).length;

  const cancelledCount =
    bookings.filter(
      (item) =>
        item.status ===
        "cancelled"
    ).length;

  return (

  <section className="tp-booking-filter-section">

    <div className="tp-booking-filter-card">

      <div className="tp-booking-filter-bar">

        {/* ================= LEFT ================= */}

        <div className="tp-booking-filter-left">

          {[
            {
              label: "All",
              value: "all",
              count: bookings.length,
            },
            {
              label: "Assigned",
              value: "assigned",
              count: assignedCount,
            },
            {
              label: "Accepted",
              value: "accepted",
              count: acceptedCount,
            },
            {
              label: "In Progress",
              value: "in_progress",
              count: progressCount,
            },
            {
              label: "Completed",
              value: "completed",
              count: completedCount,
            },
            {
              label: "Cancelled",
              value: "cancelled",
              count: cancelledCount,
            },
          ].map((item) => (

            <button
              key={item.value}
              type="button"
              onClick={() => setStatusFilter(item.value)}
              className={`tp-booking-filter-chip ${
                statusFilter === item.value
                  ? "tp-booking-filter-chip-active"
                  : ""
              }`}
            >
              <span>{item.label}</span>

              <strong>{item.count}</strong>

            </button>

          ))}

        </div>

        {/* ================= RIGHT ================= */}

        <div className="tp-booking-filter-right">

          <div className="tp-booking-sort-wrapper">

            <ArrowUpDown size={16} />

            <select
              className="tp-booking-sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>

              <option value="highest">
                Highest Fare
              </option>

              <option value="lowest">
                Lowest Fare
              </option>

            </select>

          </div>

        </div>

      </div>

    </div>

  </section>

);

};

export default BookingFilters;