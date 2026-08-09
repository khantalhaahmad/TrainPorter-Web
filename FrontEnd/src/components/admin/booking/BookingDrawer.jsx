import React from "react";

import {

  X,

  Calendar,

  Train,

  MapPin,

  Hash,

} from "lucide-react";

import BookingStatusBadge from "./BookingStatusBadge";

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

      {/* ==========================================================
          OVERLAY
      ========================================================== */}

      <div

        className="tp-booking-drawer-overlay"

        onClick={onClose}

      />

      {/* ==========================================================
          DRAWER
      ========================================================== */}

      <aside className="tp-booking-drawer">

        {/* ======================================================
            HEADER
        ====================================================== */}

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

        {/* ======================================================
            BOOKING OVERVIEW
        ====================================================== */}

        <div className="tp-booking-overview-card">

          <div className="tp-booking-overview-top">

            <div>

              <span className="tp-booking-label">

                Booking ID

              </span>

              <h3>

                {booking.bookingId}

              </h3>

            </div>

            <BookingStatusBadge

              status={booking.status}

            />

          </div>

          <div className="tp-booking-overview-grid">

            {/* Train */}

            <div className="tp-booking-info-item">

              <Train size={18} />

              <div>

                <span>

                  Train

                </span>

            

                <small>

                  {booking.trainName}

                </small>

              </div>

            </div>

            {/* Station */}

            <div className="tp-booking-info-item">

              <MapPin size={18} />

              <div>

                <span>

                  Station

                </span>

                <strong>

                  {booking.station}

                </strong>

              </div>

            </div>

            {/* Coach */}

            <div className="tp-booking-info-item">

              <Hash size={18} />

              <div>

                <span>

                  Coach / Seat

                </span>

                <strong>

                  {booking.coach}

                </strong>

                <small>

                  Seat {booking.seatNumber}

                </small>

              </div>

            </div>

            {/* Date */}

            <div className="tp-booking-info-item">

              <Calendar size={18} />

              <div>

                <span>

                  Created

                </span>

                <strong>

                  {new Date(
                    booking.createdAt
                  ).toLocaleDateString()}

                </strong>

                <small>

                  {new Date(
                    booking.createdAt
                  ).toLocaleTimeString()}

                </small>

              </div>

            </div>

          </div>

        </div>

        {/* ======================================================
            NEXT PART
        ====================================================== */}

      </aside>
{/* ======================================================
    PASSENGER + PORTER
====================================================== */}

<div className="tp-booking-detail-grid">

  {/* ======================================================
      PASSENGER
  ====================================================== */}

  <div className="tp-booking-detail-card">

    <div className="tp-booking-card-header">

      <h3>

        Passenger Details

      </h3>

    </div>

    <div className="tp-booking-profile">

      <div className="tp-booking-avatar">

        {booking.userId?.fullName
          ?.charAt(0)
          ?.toUpperCase() || "P"}

      </div>

      <div>

        <h4>

          {booking.userId?.fullName ||

            "Passenger"}

        </h4>

        <p>

          {booking.userId?.phone ||

            "Phone not available"}

        </p>

      </div>

    </div>

    <div className="tp-booking-info-list">

      <div className="tp-booking-info-row">

        <span>

          User ID

        </span>

        <strong>

          {booking.userId?._id ||

            "--"}

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Total Luggage

        </span>

        <strong>

          {booking.luggageCount}

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Coach

        </span>

        <strong>

          {booking.coach}

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Seat

        </span>

        <strong>

          {booking.seatNumber}

        </strong>

      </div>

    </div>

  </div>

  {/* ======================================================
      PORTER
  ====================================================== */}

  <div className="tp-booking-detail-card">

    <div className="tp-booking-card-header">

      <h3>

        Assigned Porter

      </h3>

    </div>

    <div className="tp-booking-profile">

      {booking.assignedPorter?.profilePhoto ? (

        <img

          src={
            booking.assignedPorter
              .profilePhoto
          }

          alt="Porter"

          className="tp-booking-profile-image"

        />

      ) : (

        <div className="tp-booking-avatar">

          {booking.assignedPorter?.name
            ?.charAt(0)
            ?.toUpperCase() || "P"}

        </div>

      )}

      <div>

        <h4>

          {booking.assignedPorter?.name ||

            "Not Assigned"}

        </h4>

        <p>

          {booking.assignedPorter?.phone ||

            "--"}

        </p>

      </div>

    </div>

    <div className="tp-booking-info-list">

      <div className="tp-booking-info-row">

        <span>

          Station

        </span>

        <strong>

          {booking.assignedPorter
            ?.station ||

            "--"}

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Rating

        </span>

        <strong>

          ⭐{" "}

          {booking.assignedPorter
            ?.rating || 0}

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Porter ID

        </span>

      <strong>

    {booking.porterId?._id ||

        "--"}

</strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Booking Status

        </span>

        <strong>

          {booking.status}

        </strong>

      </div>

    </div>

  </div>

</div>

{/* ======================================================
    PAYMENT + FARE
====================================================== */}

<div className="tp-booking-detail-grid">

  {/* ======================================================
      PAYMENT
  ====================================================== */}

  <div className="tp-booking-detail-card">

    <div className="tp-booking-card-header">

      <h3>

        Payment Details

      </h3>

    </div>

    <div className="tp-booking-info-list">

      <div className="tp-booking-info-row">

        <span>

          Total Amount

        </span>

        <strong>

          ₹{booking.amount}

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Payment Status

        </span>

        <strong
          className={`tp-payment-status tp-payment-${booking.paymentStatus}`}
        >

          {booking.paymentStatus}

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Payment Method

        </span>

        <strong>

          {booking.paymentMethod}

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Transaction ID

        </span>

        <strong>

          {booking.transactionId ||

            "--"}

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Paid At

        </span>

        <strong>

          {booking.paidAt

            ? new Date(
                booking.paidAt
              ).toLocaleString()

            : "--"}

        </strong>

      </div>

    </div>

  </div>

  {/* ======================================================
      FARE BREAKDOWN
  ====================================================== */}

  <div className="tp-booking-detail-card">

    <div className="tp-booking-card-header">

      <h3>

        Fare Breakdown

      </h3>

    </div>

    <div className="tp-booking-info-list">

      <div className="tp-booking-info-row">

        <span>

          Base Fare

        </span>

        <strong>

          ₹
          {
            booking.fareBreakdown
              ?.baseFare
          }

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Luggage Charge

        </span>

        <strong>

          ₹
          {
            booking.fareBreakdown
              ?.luggageCharge
          }

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Peak Charge

        </span>

        <strong>

          ₹
          {
            booking.fareBreakdown
              ?.peakCharge
          }

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Night Charge

        </span>

        <strong>

          ₹
          {
            booking.fareBreakdown
              ?.nightCharge
          }

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          Platform Fee

        </span>

        <strong>

          ₹
          {
            booking.fareBreakdown
              ?.platformFee
          }

        </strong>

      </div>

      <div className="tp-booking-info-row">

        <span>

          GST

        </span>

        <strong>

          ₹
          {
            booking.fareBreakdown
              ?.gst
          }

        </strong>

      </div>

      <div className="tp-booking-info-row tp-booking-total-row">

        <span>

          Total

        </span>

        <strong>

          ₹
          {
            booking.fareBreakdown
              ?.total
          }

        </strong>

      </div>

    </div>

  </div>

</div>
{/* ======================================================
    BOOKING TIMELINE
====================================================== */}

<div className="tp-booking-detail-card">

  <div className="tp-booking-card-header">

    <h3>

      Booking Timeline

    </h3>

  </div>

  <div className="tp-booking-timeline">

    {[
      "assigned",
      "accepted",
      "arrived",
      "in_progress",
      "completed",
    ].map((step, index) => {

      const currentIndex = [
        "assigned",
        "accepted",
        "arrived",
        "in_progress",
        "completed",
      ].indexOf(booking.status);

      const active =
        index <= currentIndex;

      return (

        <div
          key={step}
          className="tp-booking-step"
        >

          <div
            className={`tp-booking-step-circle ${
              active
                ? "active"
                : ""
            }`}
          >

            {index + 1}

          </div>

          <span>

            {step
              .replaceAll(
                "_",
                " "
              )
              .replace(
                /\b\w/g,
                (l) =>
                  l.toUpperCase()
              )}

          </span>

        </div>

      );

    })}

  </div>

</div>

{/* ======================================================
    ACTIONS
====================================================== */}

<div className="tp-booking-action-card">

  <div className="tp-booking-card-header">

    <h3>

      Update Booking Status

    </h3>

  </div>

  <div className="tp-booking-action-grid">

    <button

    disabled={
    updating ||
    booking.status === "completed"
}

      onClick={() =>
        onStatusUpdate(
          booking._id,
          "assigned"
        )
      }

      className="tp-booking-btn tp-booking-btn-blue"

    >

      Assigned

    </button>

    <button

      disabled={
        booking.status ===
        "accepted"
      }

      onClick={() =>
        onStatusUpdate(
          booking._id,
          "accepted"
        )
      }

      className="tp-booking-btn tp-booking-btn-purple"

    >

      Accepted

    </button>

    <button

      disabled={
        booking.status ===
        "arrived"
      }

      onClick={() =>
        onStatusUpdate(
          booking._id,
          "arrived"
        )
      }

      className="tp-booking-btn tp-booking-btn-orange"

    >

      Arrived

    </button>

    <button

      disabled={
        booking.status ===
        "in_progress"
      }

      onClick={() =>
        onStatusUpdate(
          booking._id,
          "in_progress"
        )
      }

      className="tp-booking-btn tp-booking-btn-yellow"

    >

      In Progress

    </button>

    <button

      disabled={
        booking.status ===
        "completed"
      }

      onClick={() =>
        onStatusUpdate(
          booking._id,
          "completed"
        )
      }

      className="tp-booking-btn tp-booking-btn-green"

    >

      Complete

    </button>

    <button

      disabled={
        booking.status ===
        "cancelled"
      }

      onClick={() =>
        onStatusUpdate(
          booking._id,
          "cancelled"
        )
      }

      className="tp-booking-btn tp-booking-btn-red"

    >

      Cancel

    </button>

  </div>

</div>
    </>

  );

};

export default BookingDrawer;