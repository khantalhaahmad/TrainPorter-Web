import React from "react";

import {
  UserCheck,
  Phone,
  MapPin,
  Star,
  ShieldCheck,
} from "lucide-react";

const BookingPorterCard = ({
  booking,
}) => {

  if (!booking) {

    return null;

  }

  return (

    <div className="tp-booking-detail-card">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="tp-booking-card-header">

        <h3>

          Assigned Porter

        </h3>

      </div>

      {/* ======================================================
          PROFILE
      ====================================================== */}

      <div className="tp-booking-profile">

        {booking.assignedPorter?.profilePhoto ? (

          <img

            src={
              booking.assignedPorter.profilePhoto
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

            Porter Partner

          </p>

        </div>

      </div>

      {/* ======================================================
          DETAILS
      ====================================================== */}

      <div className="tp-booking-info-list">

        <div className="tp-booking-info-row">

          <span>

            <Phone size={15} />

            Phone

          </span>

          <strong>

            {booking.assignedPorter?.phone ||

              "--"}

          </strong>

        </div>

        <div className="tp-booking-info-row">

          <span>

            <MapPin size={15} />

            Station

          </span>

          <strong>

            {booking.assignedPorter?.station ||

              "--"}

          </strong>

        </div>

        <div className="tp-booking-info-row">

          <span>

            <Star size={15} />

            Rating

          </span>

          <strong>

            ⭐ {booking.assignedPorter?.rating || 0}

          </strong>

        </div>

        <div className="tp-booking-info-row">

          <span>

            <UserCheck size={15} />

            Porter ID

          </span>

          <strong>

            {typeof booking.porterId === "string"

              ? booking.porterId

              : booking.porterId?._id || "--"}

          </strong>

        </div>

        <div className="tp-booking-info-row">

          <span>

            <ShieldCheck size={15} />

            Status

          </span>

          <strong>

            {booking.status
              ?.replace("_", " ")
              ?.replace(/\b\w/g, (c) => c.toUpperCase())}

          </strong>

        </div>

      </div>

    </div>

  );

};

export default BookingPorterCard;