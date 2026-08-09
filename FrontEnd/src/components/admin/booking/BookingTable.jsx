import React from "react";

import {
  Eye,
} from "lucide-react";

import BookingStatusBadge from "./BookingStatusBadge";

const BookingTable = ({
  bookings = [],
  onView,
}) => {

  return (

    <div className="tp-booking-table-card">

      <div className="tp-booking-table-header">

        <h3>

          Booking List

        </h3>

        <span>

          {bookings.length} Bookings

        </span>

      </div>

      <div className="tp-booking-table-wrapper-inner">

        <table className="tp-booking-table">

          <thead>

            <tr>

              <th>

                Booking ID

              </th>

              <th>

                Passenger

              </th>

              <th>

                Porter

              </th>

              <th>

                Train

              </th>

              <th>

                Station

              </th>

              <th>

                Amount

              </th>

              <th>

                Payment

              </th>

              <th>

                Status

              </th>

              <th>

                Created

              </th>

              <th>

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.length === 0 ? (

              <tr>

                <td
                  colSpan="10"
                  className="tp-booking-empty"
                >

                  No bookings found.

                </td>

              </tr>

            ) : (

              bookings.map((booking) => (

                <tr
                  key={booking._id}
                >

                  {/* ======================
                      BOOKING ID
                  ====================== */}

                  <td>

                    <span className="tp-booking-id">

                      {booking.bookingId}

                    </span>

                  </td>

                  {/* ======================
                      PASSENGER
                  ====================== */}

                  <td>

                    <div className="tp-booking-user">

                      <strong>

                        {booking.userId?.fullName ||
                          "Passenger"}

                      </strong>

                    </div>

                  </td>

                  {/* ======================
                      PORTER
                  ====================== */}

                  <td>

                    <div className="tp-booking-user">

                      <strong>

                        {booking.assignedPorter?.name ||
                          "--"}

                      </strong>

                    </div>

                  </td>

                  {/* ======================
                      TRAIN
                  ====================== */}

                  <td>

                    <div className="tp-booking-train">

                      <strong>

                        {booking.trainNumber}

                      </strong>

                      <small>

                        {booking.trainName}

                      </small>

                    </div>

                  </td>

                  {/* ======================
                      STATION
                  ====================== */}

                  <td>

                    <div>

                      {booking.station}

                      <br />

                      <small>

                        {booking.coach} • Seat{" "}

                        {booking.seatNumber}

                      </small>

                    </div>

                  </td>

                  {/* ======================
                      AMOUNT
                  ====================== */}

                  <td>

                    ₹
                    {booking.amount}

                  </td>

                  {/* ======================
                      PAYMENT
                  ====================== */}

                  <td>

                    <div className="tp-booking-payment">

                      <strong>

                        {
                          booking.paymentMethod
                        }

                      </strong>

                      <small>

                        {
                          booking.paymentStatus
                        }

                      </small>

                    </div>

                  </td>

                  {/* ======================
                      STATUS
                  ====================== */}

                  <td>

                    <BookingStatusBadge
                      status={
                        booking.status
                      }
                    />

                  </td>

                  {/* ======================
                      CREATED
                  ====================== */}

                  <td>

                    {new Date(
                      booking.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* ======================
                      ACTION
                  ====================== */}

                  <td>

                    <button

                      className="tp-booking-view-btn"

                      onClick={() =>
                        onView(
                          booking
                        )
                      }

                    >

                      <Eye
                        size={18}
                      />

                      View

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default BookingTable;