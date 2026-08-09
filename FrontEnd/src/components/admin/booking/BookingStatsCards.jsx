import React from "react";

import {
  ClipboardList,
  Clock3,
  BadgeCheck,
  XCircle,
} from "lucide-react";

const BookingStatsCards = ({
  bookings = [],
}) => {

  // ==========================================================
  // COUNTS
  // ==========================================================

  const totalBookings =
    bookings.length;

  const activeBookings =
    bookings.filter((booking) =>
      [
        "assigned",
        "accepted",
        "arrived",
        "in_progress",
      ].includes(booking.status)
    ).length;

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "completed"
    ).length;

  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "cancelled"
    ).length;

  // ==========================================================
  // CARD DATA
  // ==========================================================

  const stats = [

    {
      title:
        "Total Bookings",

      value:
        totalBookings,

      icon:
        ClipboardList,

      className:
        "tp-booking-card-blue",
    },

    {
      title:
        "Active",

      value:
        activeBookings,

      icon:
        Clock3,

      className:
        "tp-booking-card-orange",
    },

    {
      title:
        "Completed",

      value:
        completedBookings,

      icon:
        BadgeCheck,

      className:
        "tp-booking-card-green",
    },

    {
      title:
        "Cancelled",

      value:
        cancelledBookings,

      icon:
        XCircle,

      className:
        "tp-booking-card-red",
    },

  ];

  // ==========================================================
  // UI
  // ==========================================================

  return (

    <section className="tp-booking-stats-section">

      <div className="tp-booking-stats-grid">

        {stats.map((card) => {

          const Icon =
            card.icon;

          return (

            <div
              key={card.title}
              className={`tp-booking-stat-card ${card.className}`}
            >

              <div className="tp-booking-stat-top">

                <div className="tp-booking-stat-icon">

                  <Icon size={26} />

                </div>

              </div>

              <div className="tp-booking-stat-content">

                <span className="tp-booking-stat-title">

                  {card.title}

                </span>

                <h2 className="tp-booking-stat-value">

                  {card.value}

                </h2>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

};

export default BookingStatsCards;