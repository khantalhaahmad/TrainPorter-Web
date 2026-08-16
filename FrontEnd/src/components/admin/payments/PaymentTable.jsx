import React from "react";
import {
  Eye,
  ReceiptText,
} from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";

import "../../../styles/admin/payments/PaymentTable.css";

const PaymentTable = ({
  payments = [],
  loading = false,
  onView,
}) => {

  // ========================================================
  // Format Currency
  // ========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };


  // ========================================================
  // Format Date
  // ========================================================

const formatDateTime = (date) => {

  if (!date) {
    return null;
  }

  const value = new Date(date);

  return {
    date: value.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    ),

    time: value.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    ),
  };
};


  // ========================================================
  // Payment Method
  // ========================================================

  const formatMethod = (method) => {

    if (!method) {
      return "—";
    }

    const methods = {
      UPI: "UPI",
      CARD: "Card",
      NET_BANKING: "Net Banking",
      WALLET: "Wallet",
      COD: "COD",
    };

    return methods[method] || method;
  };


  // ========================================================
  // Loading
  // ========================================================

  if (loading) {

    return (
      <div className="tp-payment-table-card">

        <div className="tp-payment-table-loading">

          <div className="tp-payment-table-spinner" />

          <p>
            Loading payments...
          </p>

        </div>

      </div>
    );
  }


  // ========================================================
  // Empty
  // ========================================================

  if (!payments.length) {

    return (
      <div className="tp-payment-table-card">

        <div className="tp-payment-table-empty">

          <div className="tp-payment-table-empty-icon">

            <ReceiptText
              size={24}
              strokeWidth={1.8}
            />

          </div>

          <h3>
            No payments found
          </h3>

          <p>
            Try changing your filters or search
            criteria.
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="tp-payment-table-card">

      {/* ====================================================
          Header
      ==================================================== */}

      <div className="tp-payment-table-header">

        <div>

          <h3>
            Payment Transactions
          </h3>

          <p>
            Recent payment activity
          </p>

        </div>

        <span className="tp-payment-table-count">
          {payments.length} records
        </span>

      </div>


      {/* ====================================================
          Table
      ==================================================== */}

      <div className="tp-payment-table-wrapper">

        <table className="tp-payment-table">

          <thead>

            <tr>

              <th>
                Booking
              </th>

              <th>
                Passenger
              </th>

              <th>
  Porter
</th>


              <th>
                Amount
              </th>

              <th>
                Method
              </th>

              <th>
                Transaction ID
              </th>

              <th>
                Status
              </th>

              <th>
                Date
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {payments.map((payment) => {
const passenger =
  payment.userId ||
  payment.passenger;

const porter =
  payment.assignedPorter ||
  payment.porter ||
  null;

const bookingId =
  payment.bookingId ||
  payment.booking?.bookingId ||
  "—";

const paymentDateTime =
  formatDateTime(
    payment.paidAt ||
    payment.paymentTimeline?.paymentCompletedAt ||
    payment.createdAt
  );

              return (
                <tr
                  key={
                    payment._id ||
                    payment.id ||
                    bookingId
                  }
                >

                  {/* ========================================
                      Booking
                  ======================================== */}

                  <td>

                    <div className="tp-payment-booking-cell">

                      <span className="tp-payment-booking-id">
                        {bookingId}
                      </span>

                    </div>

                  </td>


                  {/* ========================================
                      Passenger
                  ======================================== */}

                  <td>

                    <div className="tp-payment-passenger">

                      <span className="tp-payment-passenger-name">
                        {passenger?.name || "PASSENGER"}
                      </span>

                      <span className="tp-payment-passenger-phone">
                        {passenger?.phone || "—"}
                      </span>

                    </div>

                  </td>


                  {/* ========================================
                      Train
                  ======================================== */}

            


                  {/* ========================================
                      Station
                  ======================================== */}

        
        {/* ========================================
    Porter
======================================== */}

<td>

  <div className="tp-payment-porter">

    <span
      className="tp-payment-porter-name"
      title={
        porter?.name ||
        "Not Assigned"
      }
    >
      {porter?.name ||
        "Not Assigned"}
    </span>

    <span className="tp-payment-porter-phone">
      {porter?.phone || "—"}
    </span>

  </div>

</td>


                  {/* ========================================
                      Amount
                  ======================================== */}

                  <td>

                    <span className="tp-payment-amount">
                      {formatCurrency(
                        payment.amount
                      )}
                    </span>

                  </td>


                  {/* ========================================
                      Method
                  ======================================== */}

                  <td>

                    <span className="tp-payment-method">
                      {formatMethod(
                        payment.paymentMethod
                      )}
                    </span>

                  </td>


                  {/* ========================================
                      Transaction ID
                  ======================================== */}

                  <td>

                    <span className="tp-payment-transaction-id">

                      {payment.transactionId ||
                        "—"}

                    </span>

                  </td>


                  {/* ========================================
                      Status
                  ======================================== */}

                  <td>

                    <PaymentStatusBadge
                      status={
                        payment.paymentStatus
                      }
                    />

                  </td>


                  {/* ========================================
                      Date
                  ======================================== */}

              <td>

  <div className="tp-payment-datetime">

    {paymentDateTime ? (
      <>
        <span className="tp-payment-date">
          {paymentDateTime.date}
        </span>

        <span className="tp-payment-time">
          {paymentDateTime.time}
        </span>
      </>
    ) : (
      "—"
    )}

  </div>

</td>


                  {/* ========================================
                      Action
                  ======================================== */}

                  <td>

                    <button
                      type="button"
                      className="tp-payment-view-button"
                      onClick={() =>
                        onView?.(
                          payment._id ||
                          payment.id
                        )
                      }
                      aria-label="View payment details"
                      title="View payment details"
                    >

                      <Eye
                        size={16}
                        strokeWidth={2}
                      />

                    </button>

                  </td>

                </tr>
              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PaymentTable;