import React from "react";

import {
  CheckCircle2,
  Clock3,
  Truck,
  MapPin,
  UserCheck,
  XCircle,
} from "lucide-react";

const BookingActionCard = ({
  booking,
}) => {

  if (!booking) {

    return null;

  }

  const statusConfig = {

    pending: {
      icon: Clock3,
      title: "Waiting for Porter Assignment",
      description:
        "The booking has been created and is waiting for an available porter.",
    },

    assigned: {
      icon: UserCheck,
      title: "Porter Assigned",
      description:
        "A porter has been assigned. The porter can now accept the booking from the porter application.",
    },

    accepted: {
      icon: CheckCircle2,
      title: "Booking Accepted",
      description:
        "The assigned porter has accepted the booking and is heading towards the passenger.",
    },

    arrived: {
      icon: MapPin,
      title: "Porter Arrived",
      description:
        "The porter has reached the passenger's location and is ready to begin the service.",
    },

    in_progress: {
      icon: Truck,
      title: "Service In Progress",
      description:
        "The porter is currently handling the passenger's luggage.",
    },

    completed: {
      icon: CheckCircle2,
      title: "Booking Completed",
      description:
        "The service has been completed successfully by the porter.",
    },

    cancelled: {
      icon: XCircle,
      title: "Booking Cancelled",
      description:
        "This booking has been cancelled and no further action is required.",
    },

  };

  const current =
    statusConfig[booking.status] ||
    statusConfig.pending;

  const Icon = current.icon;

  return (

    <div className="tp-booking-action-card">

      <div className="tp-booking-card-header">

        <h3>

          Booking Status

        </h3>

      </div>

      <div className="tp-booking-status-info">

        <div className="tp-booking-status-icon">

          <Icon size={28} />

        </div>

        <div className="tp-booking-status-content">

          <h4>

            {current.title}

          </h4>

          <p>

            {current.description}

          </p>

        </div>

      </div>

      <div className="tp-booking-note">

        <strong>

          Note:

        </strong>

        Booking status is automatically updated by the assigned porter through the Porter App. The Admin Dashboard is intended for monitoring and reviewing booking progress only.

      </div>

    </div>

  );

};

export default BookingActionCard;