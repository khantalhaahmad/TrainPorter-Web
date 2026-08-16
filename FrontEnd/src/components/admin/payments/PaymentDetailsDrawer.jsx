import React from "react";
import {
  X,
  CreditCard,
  ReceiptText,
  UserRound,
  BriefcaseBusiness,
  TrainFront,
  MapPin,
  CalendarDays,
  Hash,
  Package,
  Clock3,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
} from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";

import "../../../styles/admin/payments/PaymentDetailsDrawer.css";

const PaymentDetailsDrawer = ({
  open = false,
  payment = null,
  loading = false,
  onClose,
}) => {

  // ========================================================
  // Helpers
  // ========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {

    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const formatMethod = (method) => {

    const methods = {
      UPI: "UPI",
      CARD: "Card",
      NET_BANKING: "Net Banking",
      WALLET: "Wallet",
      COD: "Cash on Delivery",
    };

    return methods[method] || method || "—";
  };

  const formatBookingStatus = (status) => {

    if (!status) {
      return "—";
    }

    return status
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };


  // ========================================================
  // Do Not Render
  // ========================================================

  if (!open) {
    return null;
  }


  // ========================================================
  // Data
  // ========================================================

  const booking =
    payment?.booking || {};

  const paymentInfo =
    payment?.payment || {};

  const fare =
    payment?.fareBreakdown || {};

  const passenger =
    payment?.passenger || {};

  const porter =
    payment?.porter || {};

  const assignedPorter =
    payment?.assignedPorter || {};

  const timeline =
    payment?.paymentTimeline || {};


  // ========================================================
  // Overlay Click
  // ========================================================

  const handleOverlayClick = (event) => {

    if (
      event.target === event.currentTarget
    ) {
      onClose?.();
    }

  };


  return (
    <div
      className="tp-payment-drawer-overlay"
      onMouseDown={handleOverlayClick}
    >

      <aside className="tp-payment-drawer">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="tp-payment-drawer__header">

          <div className="tp-payment-drawer__header-content">

            <div className="tp-payment-drawer__header-icon">
              <ReceiptText
                size={19}
                strokeWidth={2}
              />
            </div>

            <div>

              <h2>
                Payment Details
              </h2>

              <p>
                {booking.bookingId || "Payment transaction"}
              </p>

            </div>

          </div>


          <button
            type="button"
            className="tp-payment-drawer__close"
            onClick={onClose}
            aria-label="Close payment details"
          >
            <X
              size={19}
              strokeWidth={2}
            />
          </button>

        </div>


        {/* ==================================================
            BODY
        ================================================== */}

        <div className="tp-payment-drawer__body">

          {/* =================================================
              LOADING
          ================================================= */}

          {loading ? (

            <div className="tp-payment-drawer__loading">

              <div className="tp-payment-drawer__spinner" />

              <p>
                Loading payment details...
              </p>

            </div>

          ) : !payment ? (

            <div className="tp-payment-drawer__empty">

              <AlertCircle
                size={28}
                strokeWidth={1.8}
              />

              <h3>
                Payment details unavailable
              </h3>

              <p>
                We couldn't load this payment.
              </p>

            </div>

          ) : (

            <>

              {/* =================================================
                  PAYMENT OVERVIEW
              ================================================= */}

              <section className="tp-payment-drawer__section">

                <div className="tp-payment-drawer__payment-overview">

                  <div>

                    <span className="tp-payment-drawer__label">
                      Payment Amount
                    </span>

                    <strong className="tp-payment-drawer__amount">
                      {formatCurrency(
                        paymentInfo.amount
                      )}
                    </strong>

                  </div>


                  <PaymentStatusBadge
                    status={
                      paymentInfo.paymentStatus
                    }
                  />

                </div>


                <div className="tp-payment-drawer__overview-grid">

                  <div className="tp-payment-drawer__overview-item">

                    <span>
                      Payment Method
                    </span>

                    <strong>
                      {formatMethod(
                        paymentInfo.paymentMethod
                      )}
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__overview-item">

                    <span>
                      Transaction ID
                    </span>

                    <strong className="tp-payment-drawer__mono">
                      {paymentInfo.transactionId ||
                        "—"}
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__overview-item">

                    <span>
                      Gateway
                    </span>

                    <strong>
                      {paymentInfo.gateway ||
                        "—"}
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__overview-item">

                    <span>
                      Paid At
                    </span>

                    <strong>
                      {formatDate(
                        paymentInfo.paidAt
                      )}
                    </strong>

                  </div>

                </div>

              </section>


              {/* =================================================
                  BOOKING INFORMATION
              ================================================= */}

              <section className="tp-payment-drawer__section">

                <div className="tp-payment-drawer__section-title">

                  <TrainFront
                    size={16}
                    strokeWidth={2}
                  />

                  <h3>
                    Booking Information
                  </h3>

                </div>


                <div className="tp-payment-drawer__details-grid">

                  <div className="tp-payment-drawer__detail">

                    <span>
                      Booking ID
                    </span>

                    <strong>
                      {booking.bookingId ||
                        "—"}
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__detail">

                    <span>
                      Train Number
                    </span>

                    <strong>
                      {booking.trainNumber ||
                        "—"}
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__detail tp-payment-drawer__detail--full">

                    <span>
                      Train Name
                    </span>

                    <strong>
                      {booking.trainName ||
                        "—"}
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__detail">

                    <span>
                      Station
                    </span>

                    <strong>
                      {booking.station ||
                        "—"}
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__detail">

                    <span>
                      Coach
                    </span>

                    <strong>
                      {booking.coach ||
                        "—"}
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__detail">

                    <span>
                      Seat Number
                    </span>

                    <strong>
                      {booking.seatNumber ||
                        "—"}
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__detail">

                    <span>
                      Luggage
                    </span>

                    <strong>
                      {booking.luggageCount || 0} bags
                    </strong>

                  </div>


                  <div className="tp-payment-drawer__detail">

                    <span>
                      Booking Status
                    </span>

                    <strong>
                      {formatBookingStatus(
                        booking.bookingStatus
                      )}
                    </strong>

                  </div>

                </div>

              </section>


              {/* =================================================
                  PASSENGER
              ================================================= */}

              <section className="tp-payment-drawer__section">

                <div className="tp-payment-drawer__section-title">

                  <UserRound
                    size={16}
                    strokeWidth={2}
                  />

                  <h3>
                    Passenger
                  </h3>

                </div>


                <div className="tp-payment-person">

                  <div className="tp-payment-person__avatar">

                    {passenger.name
                      ? passenger.name
                          .charAt(0)
                          .toUpperCase()
                      : "P"}

                  </div>

                  <div className="tp-payment-person__content">

                    <strong>
                      {passenger.name ||
                        "Passenger"}
                    </strong>

                    <span>
                      {passenger.phone ||
                        "—"}
                    </span>

                    {passenger.email && (
                      <span>
                        {passenger.email}
                      </span>
                    )}

                  </div>

                </div>


                <div className="tp-payment-drawer__mini-grid">

                  <div>

                    <span>
                      Membership
                    </span>

                    <strong>
                      {passenger.membership ||
                        "—"}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Coins
                    </span>

                    <strong>
                      {passenger.coins ?? 0}
                    </strong>

                  </div>

                </div>

              </section>


              {/* =================================================
                  PORTER
              ================================================= */}

              <section className="tp-payment-drawer__section">

                <div className="tp-payment-drawer__section-title">

                  <BriefcaseBusiness
                    size={16}
                    strokeWidth={2}
                  />

                  <h3>
                    Assigned Porter
                  </h3>

                </div>


                <div className="tp-payment-person">

                  <div className="tp-payment-person__avatar tp-payment-person__avatar--porter">

                    {porter.fullName
                      ? porter.fullName
                          .charAt(0)
                          .toUpperCase()
                      : "P"}

                  </div>


                  <div className="tp-payment-person__content">

                    <strong>
                      {porter.fullName ||
                        assignedPorter.name ||
                        "Porter"}
                    </strong>

                    <span>
                      {porter.phone ||
                        assignedPorter.phone ||
                        "—"}
                    </span>

                    <span>
                      {porter.preferredStation ||
                        assignedPorter.station ||
                        "—"}
                    </span>

                  </div>

                </div>


                <div className="tp-payment-drawer__mini-grid">

                  <div>

                    <span>
                      Station Code
                    </span>

                    <strong>
                      {porter.stationCode ||
                        "—"}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Rating
                    </span>

                    <strong>
                      {Number(
                        porter.averageRating || 0
                      ).toFixed(1)} / 5
                    </strong>

                  </div>

                </div>

              </section>


              {/* =================================================
                  FARE BREAKDOWN
              ================================================= */}

              <section className="tp-payment-drawer__section">

                <div className="tp-payment-drawer__section-title">

                  <IndianRupee
                    size={16}
                    strokeWidth={2}
                  />

                  <h3>
                    Fare Breakdown
                  </h3>

                </div>


                <div className="tp-payment-fare">

                  <div>
                    <span>
                      Base Fare
                    </span>

                    <strong>
                      {formatCurrency(
                        fare.baseFare
                      )}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Luggage Charge
                    </span>

                    <strong>
                      {formatCurrency(
                        fare.luggageCharge
                      )}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Peak Charge
                    </span>

                    <strong>
                      {formatCurrency(
                        fare.peakCharge
                      )}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Night Charge
                    </span>

                    <strong>
                      {formatCurrency(
                        fare.nightCharge
                      )}
                    </strong>
                  </div>


                  <div>
                    <span>
                      Platform Fee
                    </span>

                    <strong>
                      {formatCurrency(
                        fare.platformFee
                      )}
                    </strong>
                  </div>


                  <div>
                    <span>
                      GST
                    </span>

                    <strong>
                      {formatCurrency(
                        fare.gst
                      )}
                    </strong>
                  </div>


                  <div className="tp-payment-fare__total">

                    <span>
                      Total
                    </span>

                    <strong>
                      {formatCurrency(
                        fare.total ||
                        paymentInfo.amount
                      )}
                    </strong>

                  </div>

                </div>

              </section>


              {/* =================================================
                  PAYMENT TIMELINE
              ================================================= */}

              <section className="tp-payment-drawer__section">

                <div className="tp-payment-drawer__section-title">

                  <Clock3
                    size={16}
                    strokeWidth={2}
                  />

                  <h3>
                    Payment Timeline
                  </h3>

                </div>


                <div className="tp-payment-timeline">

                  <div className="tp-payment-timeline__item">

                    <div className="tp-payment-timeline__icon">

                      <CheckCircle2
                        size={15}
                        strokeWidth={2}
                      />

                    </div>

                    <div>

                      <strong>
                        Booking Created
                      </strong>

                      <span>
                        {formatDate(
                          timeline.bookingCreatedAt
                        )}
                      </span>

                    </div>

                  </div>


                  <div className="tp-payment-timeline__item">

                    <div className="tp-payment-timeline__icon">

                      <CreditCard
                        size={15}
                        strokeWidth={2}
                      />

                    </div>

                    <div>

                      <strong>
                        Payment Initiated
                      </strong>

                      <span>
                        {formatDate(
                          timeline.paymentInitiatedAt
                        )}
                      </span>

                    </div>

                  </div>


                  <div
                    className={`tp-payment-timeline__item ${
                      timeline.paymentCompletedAt
                        ? "is-completed"
                        : "is-pending"
                    }`}
                  >

                    <div className="tp-payment-timeline__icon">

                      {timeline.paymentCompletedAt ? (
                        <CheckCircle2
                          size={15}
                          strokeWidth={2}
                        />
                      ) : (
                        <Clock3
                          size={15}
                          strokeWidth={2}
                        />
                      )}

                    </div>

                    <div>

                      <strong>
                        Payment Completed
                      </strong>

                      <span>
                        {timeline.paymentCompletedAt
                          ? formatDate(
                              timeline.paymentCompletedAt
                            )
                          : "Payment is still pending"}
                      </span>

                    </div>

                  </div>

                </div>

              </section>


              {/* =================================================
                  REFUND INFORMATION
              ================================================= */}

              {paymentInfo.paymentStatus ===
                "refunded" && (

                <section className="tp-payment-drawer__section">

                  <div className="tp-payment-drawer__section-title">

                    <AlertCircle
                      size={16}
                      strokeWidth={2}
                    />

                    <h3>
                      Refund Information
                    </h3>

                  </div>


                  <div className="tp-payment-drawer__details-grid">

                    <div className="tp-payment-drawer__detail">

                      <span>
                        Refund Amount
                      </span>

                      <strong>
                        {formatCurrency(
                          paymentInfo.refundAmount
                        )}
                      </strong>

                    </div>


                    <div className="tp-payment-drawer__detail">

                      <span>
                        Refunded At
                      </span>

                      <strong>
                        {formatDate(
                          paymentInfo.refundedAt
                        )}
                      </strong>

                    </div>


                    <div className="tp-payment-drawer__detail tp-payment-drawer__detail--full">

                      <span>
                        Refund Reason
                      </span>

                      <strong>
                        {paymentInfo.refundReason ||
                          "—"}
                      </strong>

                    </div>

                  </div>

                </section>

              )}


              {/* =================================================
                  FAILURE INFORMATION
              ================================================= */}

              {paymentInfo.paymentStatus ===
                "failed" && (

                <section className="tp-payment-drawer__section">

                  <div className="tp-payment-drawer__section-title">

                    <AlertCircle
                      size={16}
                      strokeWidth={2}
                    />

                    <h3>
                      Failure Information
                    </h3>

                  </div>


                  <div className="tp-payment-drawer__failure">

                    <strong>
                      Payment Failed
                    </strong>

                    <p>
                      {paymentInfo.failureReason ||
                        "No failure reason available."}
                    </p>

                  </div>

                </section>

              )}

            </>

          )}

        </div>


        {/* ==================================================
            FOOTER
        ================================================== */}

        <div className="tp-payment-drawer__footer">

          <button
            type="button"
            className="tp-payment-drawer__footer-button"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </aside>

    </div>
  );
};

export default PaymentDetailsDrawer;