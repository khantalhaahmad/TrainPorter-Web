import React from "react";

const BookingStatusBadge = ({
  status,
}) => {

  const statusMap = {

    assigned: {
      label: "Assigned",
      className:
        "tp-booking-status-assigned",
    },

    accepted: {
      label: "Accepted",
      className:
        "tp-booking-status-accepted",
    },

    arrived: {
      label: "Arrived",
      className:
        "tp-booking-status-arrived",
    },

    in_progress: {
      label: "In Progress",
      className:
        "tp-booking-status-progress",
    },

    completed: {
      label: "Completed",
      className:
        "tp-booking-status-completed",
    },

    cancelled: {
      label: "Cancelled",
      className:
        "tp-booking-status-cancelled",
    },

    pending: {
      label: "Pending",
      className:
        "tp-booking-status-pending",
    },

  };

  const currentStatus =
    statusMap[status] ||

    {
      label: status,

      className:
        "tp-booking-status-default",
    };

  return (

    <span
      className={`tp-booking-status ${currentStatus.className}`}
    >

      {currentStatus.label}

    </span>

  );

};

export default BookingStatusBadge;