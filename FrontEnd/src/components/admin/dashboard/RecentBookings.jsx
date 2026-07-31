import React from "react";
import {
  Eye,
  ArrowRight,
} from "lucide-react";

import "./RecentBookings.css";

const statusColors = {
  pending: "#f59e0b",
  assigned: "#3b82f6",
  accepted: "#8b5cf6",
  arrived: "#06b6d4",
  in_progress: "#0ea5e9",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

const RecentBookings = ({
  bookings = [],
}) => {

  return (

    <div className="tp-bookings-card">

      <div className="tp-bookings-header">

        <div>

          <h3>
            Recent Bookings
          </h3>

          <p>
            Latest booking requests
          </p>

        </div>

        <button>

          View All

          <ArrowRight size={16} />

        </button>

      </div>

      <div className="tp-bookings-table-wrapper">

        <table className="tp-bookings-table">

          <thead>

            <tr>

              <th>Booking</th>

              <th>Passenger</th>

              <th>Train</th>

              <th>Status</th>

              <th>Amount</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {bookings.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="tp-empty-row"
                >

                  No bookings found

                </td>

              </tr>

            ) : (

              bookings.map((booking) => (

                <tr
                  key={booking._id}
                >

                  <td>

                    <div className="tp-booking-id">

                      #{booking._id.slice(-6)}

                    </div>

                  </td>

                  <td>

                    <div className="tp-passenger">

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

                          {booking.userId?.phone}

                        </span>

                      </div>

                    </div>

                  </td>

                  <td>

                    <strong>

                      {booking.trainNumber}

                    </strong>

                    <br />

                    <span>

                      {booking.trainName}

                    </span>

                  </td>

                  <td>

                    <span
                      className="tp-status-pill"
                      style={{
                        background:
                          statusColors[
                            booking.status
                          ] + "20",

                        color:
                          statusColors[
                            booking.status
                          ],
                      }}
                    >

                      {booking.status
                        .replace("_", " ")
                        .toUpperCase()}

                    </span>

                  </td>

                  <td>

                    ₹{booking.amount}

                  </td>

                  <td>

                    <button
                      className="tp-view-btn"
                    >

                      <Eye size={18} />

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

export default RecentBookings;