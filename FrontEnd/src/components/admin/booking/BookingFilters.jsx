import React from "react";

import {
  Search,
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

          {/* ======================================================
              LEFT
          ====================================================== */}

          <div className="tp-booking-filter-left">

            <button

              type="button"

              onClick={() =>
                setStatusFilter("all")
              }

              className={`tp-booking-filter-chip ${
                statusFilter === "all"
                  ? "tp-booking-filter-chip-active"
                  : ""
              }`}

            >

              All ({bookings.length})

            </button>

            <button

              type="button"

              onClick={() =>
                setStatusFilter(
                  "assigned"
                )
              }

              className={`tp-booking-filter-chip ${
                statusFilter ===
                "assigned"
                  ? "tp-booking-filter-chip-active"
                  : ""
              }`}

            >

              Assigned ({assignedCount})

            </button>

            <button

              type="button"

              onClick={() =>
                setStatusFilter(
                  "accepted"
                )
              }

              className={`tp-booking-filter-chip ${
                statusFilter ===
                "accepted"
                  ? "tp-booking-filter-chip-active"
                  : ""
              }`}

            >

              Accepted ({acceptedCount})

            </button>

            <button

              type="button"

              onClick={() =>
                setStatusFilter(
                  "arrived"
                )
              }

              className={`tp-booking-filter-chip ${
                statusFilter ===
                "arrived"
                  ? "tp-booking-filter-chip-active"
                  : ""
              }`}

            >

              Arrived ({arrivedCount})

            </button>

            <button

              type="button"

              onClick={() =>
                setStatusFilter(
                  "in_progress"
                )
              }

              className={`tp-booking-filter-chip ${
                statusFilter ===
                "in_progress"
                  ? "tp-booking-filter-chip-active"
                  : ""
              }`}

            >

              In Progress ({progressCount})

            </button>

            <button

              type="button"

              onClick={() =>
                setStatusFilter(
                  "completed"
                )
              }

              className={`tp-booking-filter-chip ${
                statusFilter ===
                "completed"
                  ? "tp-booking-filter-chip-active"
                  : ""
              }`}

            >

              Completed ({completedCount})

            </button>

            <button

              type="button"

              onClick={() =>
                setStatusFilter(
                  "cancelled"
                )
              }

              className={`tp-booking-filter-chip ${
                statusFilter ===
                "cancelled"
                  ? "tp-booking-filter-chip-active"
                  : ""
              }`}

            >

              Cancelled ({cancelledCount})

            </button>

          </div>

          {/* ======================================================
              RIGHT
          ====================================================== */}

          <div className="tp-booking-filter-right">

            {/* SEARCH */}

            <div className="tp-booking-search">

              <Search
                size={18}
              />

              <input

                type="text"

                placeholder="Search booking..."

                value={search}

                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }

              />

            </div>

            {/* SORT */}

            <select

              className="tp-booking-sort"

              value={sortBy}

              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
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

    </section>

  );

};

export default BookingFilters;