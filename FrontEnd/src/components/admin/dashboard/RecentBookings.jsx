import React, { useState } from "react";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./RecentBookings.css";


/* ==========================================================
   STATUS COLORS
========================================================== */

const statusColors = {
  pending: "#f59e0b",
  assigned: "#3b82f6",
  accepted: "#8b5cf6",
  arrived: "#06b6d4",
  in_progress: "#0ea5e9",
  completed: "#22c55e",
  cancelled: "#ef4444",
};


/* ==========================================================
   RECENT BOOKINGS
========================================================== */

const RecentBookings = ({
  bookings = [],
}) => {

  /* ========================================================
     PAGINATION
  ======================================================== */

  const [currentPage, setCurrentPage] = useState(1);

  const BOOKINGS_PER_PAGE = 5;

  const totalPages = Math.ceil(
    bookings.length / BOOKINGS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * BOOKINGS_PER_PAGE;

  const currentBookings = bookings.slice(
    startIndex,
    startIndex + BOOKINGS_PER_PAGE
  );


  /* ========================================================
     NEXT PAGE
  ======================================================== */

  const handleNext = () => {

    if (currentPage < totalPages) {

      setCurrentPage(
        (prev) => prev + 1
      );

    }

  };


  /* ========================================================
     PREVIOUS PAGE
  ======================================================== */

  const handlePrevious = () => {

    if (currentPage > 1) {

      setCurrentPage(
        (prev) => prev - 1
      );

    }

  };


  /* ========================================================
     VIEW ALL
  ======================================================== */

  const handleViewAll = () => {

    setCurrentPage(1);

  };


  return (

    <div className="tp-bookings-card">


      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="tp-bookings-header">

        <div>

          <h3>
            Recent Bookings
          </h3>

          <p>
            Latest booking requests
          </p>

        </div>


        <button
          type="button"
          onClick={handleViewAll}
        >

          View All

          <ArrowRight size={16} />

        </button>

      </div>


      {/* ==================================================
          TABLE
      ================================================== */}

      <div className="tp-bookings-table-wrapper">

        <table className="tp-bookings-table">


          {/* ==================================================
              TABLE HEADER
          ================================================== */}

          <thead>

            <tr>

              <th>
                Booking ID
              </th>

              <th>
                User
              </th>

              <th>
                Porter
              </th>

              <th>
                Station
              </th>

              <th>
                Amount
              </th>

              <th>
                Status
              </th>

              <th>
                Time
              </th>

            </tr>

          </thead>


          {/* ==================================================
              TABLE BODY
          ================================================== */}

          <tbody>

            {bookings.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="tp-empty-row"
                >

                  No bookings found

                </td>

              </tr>

            ) : (

              currentBookings.map(
                (booking) => {

                  const status =
                    booking.status || "pending";

                  const statusColor =
                    statusColors[status] ||
                    "#6b7280";


                  return (

                    <tr
                      key={booking._id}
                    >


                      {/* ======================================
                          BOOKING ID
                      ====================================== */}

                      <td>

                        <div className="tp-booking-id">

                          #
                          {booking._id
                            ? booking._id.slice(-6)
                            : "------"}

                        </div>

                      </td>


                      {/* ======================================
                          USER
                      ====================================== */}

                      <td>

                        <div className="tp-user-cell">

                          <div className="tp-avatar">

                            {booking.userId?.name
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}

                          </div>


                          <div>

                            <strong>

                              {booking.userId?.name ||
                                "Unknown"}

                            </strong>


                            <span>

                              {booking.userId?.phone ||
                                "No phone"}

                            </span>

                          </div>

                        </div>

                      </td>


                      {/* ======================================
                          PORTER
                      ====================================== */}

                      <td>

                        <div className="tp-porter-cell">

                          <strong>

                            {booking.porterId?.name ||
                              booking.assignedPorter?.name ||
                              "Unassigned"}

                          </strong>

                        </div>

                      </td>


                      {/* ======================================
                          STATION
                      ====================================== */}

                      <td>

                        <div className="tp-station-cell">

                          {booking.station ||
                            "Unknown Station"}

                        </div>

                      </td>


                      {/* ======================================
                          AMOUNT
                      ====================================== */}

                      <td>

                        <strong className="tp-booking-amount">

                          ₹
                          {Number(
                            booking.amount || 0
                          ).toLocaleString("en-IN")}

                        </strong>

                      </td>


                      {/* ======================================
                          STATUS
                      ====================================== */}

                      <td>

                        <span
                          className="tp-status-pill"

                          style={{
                            background:
                              `${statusColor}20`,

                            color:
                              statusColor,
                          }}
                        >

                          {status
                            .replace(
                              /_/g,
                              " "
                            )
                            .toUpperCase()}

                        </span>

                      </td>


                      {/* ======================================
                          TIME
                      ====================================== */}

                      <td>

                        <div className="tp-booking-time">

                          {booking.createdAt
                            ? new Date(
                                booking.createdAt
                              ).toLocaleString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "—"}

                        </div>

                      </td>


                    </tr>

                  );

                }
              )

            )}

          </tbody>

        </table>

      </div>


      {/* ==================================================
          PAGINATION
      ================================================== */}

      {bookings.length > 0 && totalPages > 1 && (

        <div className="tp-bookings-pagination">


          {/* ================================================
              PREVIOUS
          ================================================ */}

          <button
            type="button"
            className="tp-pagination-btn"

            onClick={handlePrevious}

            disabled={
              currentPage === 1
            }
          >

            <ChevronLeft size={15} />

            Previous

          </button>


          {/* ================================================
              PAGE INFO
          ================================================ */}

          <div className="tp-pagination-info">

            <strong>

              Page {currentPage} of {totalPages}

            </strong>


            <span>

              Showing{" "}

              {startIndex + 1}

              {" - "}

              {Math.min(
                startIndex +
                  BOOKINGS_PER_PAGE,
                bookings.length
              )}

              {" of "}

              {bookings.length}

            </span>

          </div>


          {/* ================================================
              NEXT
          ================================================ */}

          <button
            type="button"
            className="tp-pagination-btn"

            onClick={handleNext}

            disabled={
              currentPage === totalPages
            }
          >

            Next

            <ChevronRight size={15} />

          </button>


        </div>

      )}

    </div>

  );

};


export default RecentBookings;