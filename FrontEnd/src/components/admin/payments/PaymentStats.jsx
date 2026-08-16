import React from "react";
import {
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  Clock3,
  RotateCcw,
  XCircle,
} from "lucide-react";

import "../../../styles/admin/payments/PaymentStats.css";

const PaymentStats = ({ stats = {} }) => {

  const {
    totalRevenue = 0,
    todayRevenue = 0,
    successfulPayments = 0,
    pendingCash = 0,
    refundedPayments = 0,
    failedPayments = 0,
  } = stats;


  // ========================================================
  // FORMAT CURRENCY
  // ========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };


  // ========================================================
  // SPARKLINE PATHS
  // Small decorative trend graphs
  // ========================================================

  const sparklinePaths = {

    revenue: {
      line:
        "M2 58 C14 52, 18 40, 30 45 S45 58, 55 39 S70 28, 82 38 S98 52, 108 27 S125 12, 138 20 S146 10, 150 4",

      area:
        "M2 58 C14 52, 18 40, 30 45 S45 58, 55 39 S70 28, 82 38 S98 52, 108 27 S125 12, 138 20 S146 10, 150 4 L150 70 L2 70 Z",
    },

    today: {
      line:
        "M2 60 C12 55, 20 48, 30 51 S44 40, 54 45 S68 30, 78 34 S92 48, 102 28 S118 20, 128 25 S140 12, 150 6",

      area:
        "M2 60 C12 55, 20 48, 30 51 S44 40, 54 45 S68 30, 78 34 S92 48, 102 28 S118 20, 128 25 S140 12, 150 6 L150 70 L2 70 Z",
    },

    success: {
      line:
        "M2 60 C14 58, 20 50, 30 52 S45 42, 55 46 S70 32, 80 36 S95 23, 106 29 S120 18, 130 22 S143 10, 150 5",

      area:
        "M2 60 C14 58, 20 50, 30 52 S45 42, 55 46 S70 32, 80 36 S95 23, 106 29 S120 18, 130 22 S143 10, 150 5 L150 70 L2 70 Z",
    },

    pending: {
      line:
        "M2 58 C14 60, 20 48, 30 50 S42 25, 54 32 S68 49, 78 37 S92 42, 102 27 S116 35, 126 20 S140 29, 150 10",

      area:
        "M2 58 C14 60, 20 48, 30 50 S42 25, 54 32 S68 49, 78 37 S92 42, 102 27 S116 35, 126 20 S140 29, 150 10 L150 70 L2 70 Z",
    },

    refunded: {
      line:
        "M2 55 C12 47, 22 50, 32 42 S46 50, 56 37 S70 45, 80 31 S94 42, 104 25 S118 34, 128 20 S142 25, 150 8",

      area:
        "M2 55 C12 47, 22 50, 32 42 S46 50, 56 37 S70 45, 80 31 S94 42, 104 25 S118 34, 128 20 S142 25, 150 8 L150 70 L2 70 Z",
    },

    failed: {
      line:
        "M2 60 C14 58, 20 51, 30 55 S44 40, 54 47 S68 28, 78 35 S92 48, 102 24 S116 32, 126 18 S140 27, 150 6",

      area:
        "M2 60 C14 58, 20 51, 30 55 S44 40, 54 47 S68 28, 78 35 S92 48, 102 24 S116 32, 126 18 S140 27, 150 6 L150 70 L2 70 Z",
    },

  };


  // ========================================================
  // CARDS
  // ========================================================

  const cards = [

    {
      id: "total-revenue",
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: IndianRupee,
      type: "revenue",
      change: "+18.6%",
      changeText: "from last month",
      trend: "up",
    },

    {
      id: "today-revenue",
      title: "Today's Revenue",
      value: formatCurrency(todayRevenue),
      icon: TrendingUp,
      type: "today",
      change: "+11.2%",
      changeText: "from yesterday",
      trend: "up",
    },

    {
      id: "successful-payments",
      title: "Successful Payments",
      value: successfulPayments.toLocaleString("en-IN"),
      icon: CheckCircle2,
      type: "success",
      change: "+16.3%",
      changeText: "from last month",
      trend: "up",
    },

    {
      id: "pending-cash",
      title: "Pending Cash",
      value: formatCurrency(pendingCash),
      icon: Clock3,
      type: "pending",
      change: "-4.2%",
      changeText: "from last month",
      trend: "down",
    },

    {
      id: "refunded-payments",
      title: "Refunded Payments",
      value: refundedPayments.toLocaleString("en-IN"),
      icon: RotateCcw,
      type: "refunded",
      change: "-2.1%",
      changeText: "from last month",
      trend: "down",
    },

    {
      id: "failed-payments",
      title: "Failed Payments",
      value: failedPayments.toLocaleString("en-IN"),
      icon: XCircle,
      type: "failed",
      change: "-1.3%",
      changeText: "from last month",
      trend: "down",
    },

  ];


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <section className="tp-payment-stats">

      <div className="tp-payment-stats-grid">

        {cards.map((card) => {

          const Icon = card.icon;

          const graph =
            sparklinePaths[card.type];

          return (

            <article
              className={`tp-payment-stat-card tp-payment-stat-card--${card.type}`}
              key={card.id}
            >

              {/* ==================================================
                  CARD CONTENT
              ================================================== */}

              <div className="tp-payment-stat-card__main">

                <div className="tp-payment-stat-card__top">

                  <div className="tp-payment-stat-card__icon">

                    <Icon
                      size={20}
                      strokeWidth={2}
                    />

                  </div>

                </div>


                <div className="tp-payment-stat-card__content">

                  <p className="tp-payment-stat-card__title">
                    {card.title}
                  </p>

                  <h3 className="tp-payment-stat-card__value">
                    {card.value}
                  </h3>


                  {/* ==================================================
                      CHANGE
                  ================================================== */}

                  <div
                    className={`tp-payment-stat-card__change tp-payment-stat-card__change--${card.trend}`}
                  >

                    <span>
                      {card.trend === "up"
                        ? "↑"
                        : "↓"}{" "}
                      {card.change}
                    </span>

                    <small>
                      {card.changeText}
                    </small>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  MINI SPARKLINE
              ================================================== */}

              <div className="tp-payment-stat-card__chart">

                <svg
                  viewBox="0 0 150 70"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >

                  {/* Area */}
                  <path
                    className="tp-payment-stat-card__chart-area"
                    d={graph.area}
                  />

                  {/* Line */}
                  <path
                    className="tp-payment-stat-card__chart-line"
                    d={graph.line}
                  />

                </svg>

              </div>

            </article>

          );

        })}

      </div>

    </section>
  );
};

export default PaymentStats;