import React from "react";

import { X } from "lucide-react";

import BookingOverviewCard from "./BookingOverviewCard";
import BookingPassengerCard from "./BookingPassengerCard";
import BookingPorterCard from "./BookingPorterCard";
import BookingPaymentCard from "./BookingPaymentCard";
import BookingTimeline from "./BookingTimeline";
import BookingActionCard from "./BookingActionCard";

const BookingDrawer = ({
  open,
  booking,
  onClose,
  onStatusUpdate,
  updating,
}) => {

  if (!open || !booking) {

    return null;

  }

  return (

    <>

      {/* ==========================================
          Overlay
      ========================================== */}

      <div
        className="tp-booking-drawer-overlay"
        onClick={onClose}
      />

      {/* ==========================================
          Drawer
      ========================================== */}

      <aside className="tp-booking-drawer">

        {/* ==========================================
            Header
        ========================================== */}

        <div className="tp-booking-drawer-header">

          <div>

            <h2>

              Booking Details

            </h2>

            <p>

              Review booking information

            </p>

          </div>

          <button
            className="tp-booking-drawer-close"
            onClick={onClose}
          >

            <X size={20} />

          </button>

        </div>

        {/* ==========================================
            Drawer Body
        ========================================== */}

        <div className="tp-booking-drawer-body">

          {/* Overview */}

          <BookingOverviewCard
            booking={booking}
          />

          {/* Passenger + Porter */}

          <div className="tp-booking-detail-grid">

            <BookingPassengerCard
              booking={booking}
            />

            <BookingPorterCard
              booking={booking}
            />

          </div>

          {/* Payment */}

          <BookingPaymentCard
            booking={booking}
          />

          {/* Timeline */}

          <BookingTimeline
            booking={booking}
          />

          {/* Actions */}

          <BookingActionCard
            booking={booking}
            updating={updating}
            onStatusUpdate={onStatusUpdate}
          />

        </div>

      </aside>

    </>

  );

};

export default BookingDrawer;