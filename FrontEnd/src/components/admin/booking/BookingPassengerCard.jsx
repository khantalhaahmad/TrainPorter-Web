import React from "react";

const BookingPassengerCard = ({
  booking,
}) => {

  if (!booking) {

    return null;

  }

  return (

    <div className="tp-booking-detail-card">

      <div className="tp-booking-card-header">

        <h3>

          Passenger Details

        </h3>

      </div>

      <div className="tp-booking-info-list">

        <div className="tp-booking-info-row">

          <span>

            Passenger

          </span>

          <strong>

            Passenger

          </strong>

        </div>

        <div className="tp-booking-info-row">

          <span>

            User ID

          </span>

          <strong>

            {typeof booking.userId === "string"

              ? booking.userId

              : booking.userId?._id || "--"}

          </strong>

        </div>

        <div className="tp-booking-info-row">

          <span>

            Station

          </span>

          <strong>

            {booking.station}

          </strong>

        </div>

        <div className="tp-booking-info-row">

          <span>

            Booking Date

          </span>

          <strong>

            {new Date(
              booking.createdAt
            ).toLocaleDateString()}

          </strong>

        </div>

      </div>

    </div>

  );

};

export default BookingPassengerCard;