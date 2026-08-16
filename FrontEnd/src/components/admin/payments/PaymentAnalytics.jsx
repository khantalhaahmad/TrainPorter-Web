import React from "react";
import {
  BarChart3,
  IndianRupee,
  CreditCard,
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
} from "lucide-react";

import "../../../styles/admin/payments/PaymentAnalytics.css";

const PaymentAnalytics = ({
  analytics = {},
  loading = false,
}) => {

  // ========================================================
  // Helpers
  // ========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
  };


  // ========================================================
  // Flexible Analytics Data
  // ========================================================

  const paymentMethods =
    analytics?.paymentMethods ||
    analytics?.methods ||
    [];

  const paymentStatuses =
    analytics?.paymentStatuses ||
    analytics?.statuses ||
    [];

  const revenueTrend =
    analytics?.revenueTrend ||
    analytics?.revenue ||
    [];


  // ========================================================
  // Loading
  // ========================================================

  if (loading) {
    return (
      <section className="tp-payment-analytics">

        <div className="tp-payment-analytics__header">

          <div className="tp-payment-analytics__title">

            <div className="tp-payment-analytics__title-icon">
              <BarChart3 size={17} />
            </div>

            <div>
              <h3>
                Payment Analytics
              </h3>

              <p>
                Payment performance overview
              </p>
            </div>

          </div>

        </div>

        <div className="tp-payment-analytics__loading">

          <div className="tp-payment-analytics__spinner" />

          <span>
            Loading analytics...
          </span>

        </div>

      </section>
    );
  }


  return (
    <section className="tp-payment-analytics">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="tp-payment-analytics__header">

        <div className="tp-payment-analytics__title">

          <div className="tp-payment-analytics__title-icon">
            <BarChart3
              size={17}
              strokeWidth={2}
            />
          </div>

          <div>

            <h3>
              Payment Analytics
            </h3>

            <p>
              Payment performance overview
            </p>

          </div>

        </div>

      </div>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="tp-payment-analytics__grid">


        {/* ==================================================
            PAYMENT METHODS
        ================================================== */}

        <div className="tp-payment-analytics__card">

          <div className="tp-payment-analytics__card-header">

            <div>

              <h4>
                Payment Methods
              </h4>

              <p>
                Revenue by payment method
              </p>

            </div>

            <CreditCard
              size={18}
              strokeWidth={2}
            />

          </div>


          <div className="tp-payment-method-list">

            {paymentMethods.length > 0 ? (

              paymentMethods.map((method, index) => {

                const name =
                  method?._id ||
                  method?.method ||
                  method?.name ||
                  "Unknown";

                const count =
                  method?.count || 0;

                const revenue =
                  method?.revenue || 0;

                return (
                  <div
                    className="tp-payment-method-item"
                    key={`${name}-${index}`}
                  >

                    <div className="tp-payment-method-item__left">

                      <div className="tp-payment-method-item__icon">
                        <IndianRupee
                          size={14}
                          strokeWidth={2}
                        />
                      </div>

                      <div>

                        <strong>
                          {name}
                        </strong>

                        <span>
                          {formatNumber(count)} payments
                        </span>

                      </div>

                    </div>


                    <strong className="tp-payment-method-item__amount">
                      {formatCurrency(revenue)}
                    </strong>

                  </div>
                );

              })

            ) : (

              <div className="tp-payment-analytics__empty">

                No payment method data available.

              </div>

            )}

          </div>

        </div>


        {/* ==================================================
            PAYMENT STATUS
        ================================================== */}

        <div className="tp-payment-analytics__card">

          <div className="tp-payment-analytics__card-header">

            <div>

              <h4>
                Payment Status
              </h4>

              <p>
                Current payment distribution
              </p>

            </div>

            <CheckCircle2
              size={18}
              strokeWidth={2}
            />

          </div>


          <div className="tp-payment-status-list">

            {paymentStatuses.length > 0 ? (

              paymentStatuses.map((status, index) => {

                const name =
                  status?._id ||
                  status?.status ||
                  status?.name ||
                  "Unknown";

                const count =
                  status?.count || 0;

                let Icon = Clock3;

                if (name === "paid") {
                  Icon = CheckCircle2;
                }

                if (name === "failed") {
                  Icon = XCircle;
                }

                if (name === "refunded") {
                  Icon = RotateCcw;
                }

                return (
                  <div
                    className="tp-payment-status-item"
                    key={`${name}-${index}`}
                  >

                    <div className="tp-payment-status-item__left">

                      <div
                        className={`tp-payment-status-item__icon tp-payment-status-item__icon--${name}`}
                      >
                        <Icon
                          size={14}
                          strokeWidth={2}
                        />
                      </div>

                      <span>
                        {String(name)
                          .replaceAll("_", " ")
                          .replace(
                            /\b\w/g,
                            (char) =>
                              char.toUpperCase()
                          )}
                      </span>

                    </div>


                    <strong>
                      {formatNumber(count)}
                    </strong>

                  </div>
                );

              })

            ) : (

              <div className="tp-payment-analytics__empty">

                No payment status data available.

              </div>

            )}

          </div>

        </div>


        {/* ==================================================
            REVENUE TREND
        ================================================== */}

        <div className="tp-payment-analytics__card tp-payment-analytics__card--wide">

          <div className="tp-payment-analytics__card-header">

            <div>

              <h4>
                Revenue Trend
              </h4>

              <p>
                Revenue generated over time
              </p>

            </div>

            <BarChart3
              size={18}
              strokeWidth={2}
            />

          </div>


          {revenueTrend.length > 0 ? (

            <div className="tp-payment-revenue-chart">

              {revenueTrend.map(
                (item, index) => {

                  const label =
                    item?.date ||
                    item?.label ||
                    item?._id ||
                    `Day ${index + 1}`;

                  const revenue =
                    Number(
                      item?.revenue ||
                      item?.amount ||
                      item?.total ||
                      0
                    );

                  const maxRevenue =
                    Math.max(
                      ...revenueTrend.map(
                        (entry) =>
                          Number(
                            entry?.revenue ||
                            entry?.amount ||
                            entry?.total ||
                            0
                          )
                      ),
                      1
                    );

                  const height =
                    Math.max(
                      (revenue /
                        maxRevenue) *
                        100,
                      4
                    );

                  return (
                    <div
                      className="tp-payment-revenue-bar-wrapper"
                      key={`${label}-${index}`}
                    >

                      <div className="tp-payment-revenue-value">
                        {formatCurrency(revenue)}
                      </div>

                      <div className="tp-payment-revenue-bar-container">

                        <div
                          className="tp-payment-revenue-bar"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                      </div>

                      <span className="tp-payment-revenue-label">
                        {label}
                      </span>

                    </div>
                  );

                }
              )}

            </div>

          ) : (

            <div className="tp-payment-analytics__empty tp-payment-analytics__empty--chart">

              No revenue trend data available.

            </div>

          )}

        </div>

      </div>

    </section>
  );
};

export default PaymentAnalytics;