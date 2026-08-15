import React from "react";
import {
  ClipboardList,
  Clock3,
  UserCheck,
  Truck,
  BadgeCheck,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const BookingStatsCards = ({
  bookings = [],
}) => {

  // ==========================================================
// COUNTS
// ==========================================================

const totalBookings = bookings.length;

const pendingBookings = bookings.filter(
  (booking) => booking.status === "pending"
).length;

const assignedBookings = bookings.filter(
  (booking) => booking.status === "assigned"
).length;

const inProgressBookings = bookings.filter((booking) =>
  ["accepted", "arrived", "in_progress"].includes(booking.status)
).length;

const completedBookings = bookings.filter(
  (booking) => booking.status === "completed"
).length;

const cancelledBookings = bookings.filter(
  (booking) => booking.status === "cancelled"
).length;

  // ==========================================================
  // CARD DATA
  // ==========================================================

  const stats = [
  {
    title: "Total Bookings",
    value: totalBookings,
    icon: ClipboardList,
    className: "tp-booking-card-blue",
    trend: "+12%",
    trendLabel: "",
  },

  {
    title: "Pending",
    value: pendingBookings,
    icon: Clock3,
    className: "tp-booking-card-orange",
    trend: "+5%",
    trendLabel: "",
  },

  {
    title: "Assigned",
    value: assignedBookings,
    icon: UserCheck,
    className: "tp-booking-card-purple",
    trend: "+8%",
    trendLabel: "",
  },

  {
    title: "In Progress",
    value: inProgressBookings,
    icon: Truck,
    className: "tp-booking-card-yellow",
    trend: "+10%",
    trendLabel: "",
  },

  {
    title: "Completed",
    value: completedBookings,
    icon: BadgeCheck,
    className: "tp-booking-card-green",
    trend: "+18%",
    trendLabel: "",
  },

  {
    title: "Cancelled",
    value: cancelledBookings,
    icon: XCircle,
    className: "tp-booking-card-red",
    trend: "-2%",
    trendLabel: "",
  },
];

  // ==========================================================
  // UI
  // ==========================================================

  return (
  <section className="tp-booking-stats-section">
    <div className="tp-booking-stats-grid">
      {stats.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`tp-booking-stat-card ${card.className}`}
          >
           <div className="tp-booking-stat-top">
  <div className="tp-booking-stat-icon">
    <Icon size={6} strokeWidth={1} />
  </div>

  <div className="tp-booking-stat-info">
    <span className="tp-booking-stat-title">
      {card.title}
    </span>

    <h2 className="tp-booking-stat-value">
      {card.value}
    </h2>
  </div>
</div>

<div className="tp-booking-stat-footer">
  <div
  className={`tp-booking-stat-change ${
    card.trend.startsWith("-")
      ? "tp-booking-stat-negative"
      : "tp-booking-stat-positive"
  }`}
>
  {card.trend.startsWith("-") ? (
    <ArrowDownRight size={12} strokeWidth={2.5} />
  ) : (
    <ArrowUpRight size={12} strokeWidth={2.5} />
  )}

  <span>{card.trend}</span>
</div>

  <span className="tp-booking-stat-period">
    from last month
  </span>
</div>
          </div>
        );
      })}
    </div>
  </section>
);

};

export default BookingStatsCards;