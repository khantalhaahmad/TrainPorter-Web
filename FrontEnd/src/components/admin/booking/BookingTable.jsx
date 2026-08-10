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
  Fare
</th>


              <th>

                Status

              </th>

              <th>

                Date & Time

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

  <div className="tp-booking-bookingid">

    <span className="tp-booking-id">

      {booking.bookingId}

    </span>

  </div>

</td>
                  {/* ======================
                      PASSENGER
                  ====================== */}

                 <td>

  <div className="tp-booking-user">

    <strong>Passenger</strong>

    <small>
      {typeof booking.userId === "string"
        ? booking.userId
        : booking.userId?._id || "--"}
    </small>

  </div>

</td>

                  {/* ======================
                      PORTER
                  ====================== */}

                 <td>

  <div className="tp-booking-user">

    <strong>
      {booking.assignedPorter?.name || "--"}
    </strong>

    <small>
      {booking.assignedPorter?.phone || "--"}
    </small>

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
                      AMOUNT
                  ====================== */}

                 <td>

  <div className="tp-booking-payment">

    <strong>

      ₹{booking.amount}

    </strong>

    <small>

      {booking.paymentStatus === "paid"
        ? "Paid"
        : booking.paymentStatus === "pending"
        ? "Pending"
        : booking.paymentStatus === "failed"
        ? "Failed"
        : "Refunded"}

    </small>

  </div>

</td>
                  {/* ======================
                      PAYMENT
                  ====================== */}

                  

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

  <div className="tp-booking-payment">

    <strong>

      {new Date(
        booking.createdAt
      ).toLocaleDateString()}

    </strong>

    <small>

      {new Date(
        booking.createdAt
      ).toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
      })}

    </small>

  </div>

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

                     <Eye size={18}/>

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