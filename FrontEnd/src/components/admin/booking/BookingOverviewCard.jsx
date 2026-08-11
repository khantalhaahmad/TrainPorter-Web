import React from "react";

import {
  ClipboardList,
  User,
  Briefcase,
  TrainFront,
  IndianRupee,
  CalendarDays,
} from "lucide-react";

const BookingOverviewCard = ({
  booking,
}) => {

  if (!booking) {

    return null;

  }

  return (

    <section className="tp-booking-overview-card">

      <div className="tp-booking-overview-grid">

        {/* ==========================
            BOOKING
        ========================== */}

        <div className="tp-booking-overview-item">

          <div className="tp-booking-overview-icon">

            <ClipboardList size={18} />

          </div>

          <div className="tp-booking-overview-content">

            <span>

              Booking ID

            </span>

            <strong>

              {booking.bookingId}

            </strong>

          </div>

        </div>

        {/* ==========================
            PASSENGER
        ========================== */}

        <div className="tp-booking-overview-item">

          <div className="tp-booking-overview-icon">

            <User size={18} />

          </div>

          <div className="tp-booking-overview-content">

            <span>

              Passenger

            </span>

            <strong>

              {typeof booking.userId === "string"
                ? booking.userId
                : booking.userId?._id || "--"}

            </strong>

          </div>

        </div>

        {/* ==========================
            PORTER
        ========================== */}

        <div className="tp-booking-overview-item">

          <div className="tp-booking-overview-icon">

            <Briefcase size={18} />

          </div>

          <div className="tp-booking-overview-content">

            <span>

              Porter

            </span>

            <strong>

              {booking.assignedPorter?.name || "--"}

            </strong>

          </div>

        </div>

        {/* ==========================
            TRAIN
        ========================== */}

        <div className="tp-booking-overview-item">

          <div className="tp-booking-overview-icon">

            <TrainFront size={18} />

          </div>

          <div className="tp-booking-overview-content">

            <span>

              Train

            </span>

            <strong>

              {booking.trainNumber}

            </strong>

            <small>

              {booking.trainName}

            </small>

          </div>

        </div>

        {/* ==========================
            FARE
        ========================== */}

        <div className="tp-booking-overview-item">

          <div className="tp-booking-overview-icon">

            <IndianRupee size={18} />

          </div>

          <div className="tp-booking-overview-content">

            <span>

              Total Fare

            </span>

            <strong>

              ₹{booking.amount}

            </strong>

          </div>

        </div>

        {/* ==========================
            CREATED
        ========================== */}

        <div className="tp-booking-overview-item">

          <div className="tp-booking-overview-icon">

            <CalendarDays size={18} />

          </div>

          <div className="tp-booking-overview-content">

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
              ).toLocaleTimeString([], {

                hour: "2-digit",

                minute: "2-digit",

              })}

            </small>

          </div>

        </div>

      </div>

    </section>

  );

};

export default BookingOverviewCard;