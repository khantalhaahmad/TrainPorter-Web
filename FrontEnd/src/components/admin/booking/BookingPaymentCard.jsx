import React from "react";

const BookingPaymentCard = ({
  booking,
}) => {

  if (!booking) {

    return null;

  }

  return (

    <>

      {/* ======================================================
          PAYMENT DETAILS
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

              {booking.transactionId || "--"}

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

              ₹{booking.fareBreakdown?.baseFare || 0}

            </strong>

          </div>

          <div className="tp-booking-info-row">

            <span>

              Luggage Charge

            </span>

            <strong>

              ₹{booking.fareBreakdown?.luggageCharge || 0}

            </strong>

          </div>

          <div className="tp-booking-info-row">

            <span>

              Peak Charge

            </span>

            <strong>

              ₹{booking.fareBreakdown?.peakCharge || 0}

            </strong>

          </div>

          <div className="tp-booking-info-row">

            <span>

              Night Charge

            </span>

            <strong>

              ₹{booking.fareBreakdown?.nightCharge || 0}

            </strong>

          </div>

          <div className="tp-booking-info-row">

            <span>

              Platform Fee

            </span>

            <strong>

              ₹{booking.fareBreakdown?.platformFee || 0}

            </strong>

          </div>

          <div className="tp-booking-info-row">

            <span>

              GST

            </span>

            <strong>

              ₹{booking.fareBreakdown?.gst || 0}

            </strong>

          </div>

          <div className="tp-booking-info-row tp-booking-total-row">

            <span>

              Total

            </span>

            <strong>

              ₹{booking.fareBreakdown?.total || booking.amount}

            </strong>

          </div>

        </div>

      </div>

    </>

  );

};

export default BookingPaymentCard;