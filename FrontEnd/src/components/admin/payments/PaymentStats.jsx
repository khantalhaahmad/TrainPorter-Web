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

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const cards = [
    {
      id: "total-revenue",
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      icon: IndianRupee,
      type: "revenue",
    },
    {
      id: "today-revenue",
      title: "Today's Revenue",
      value: formatCurrency(todayRevenue),
      icon: TrendingUp,
      type: "today",
    },
    {
      id: "successful-payments",
      title: "Successful Payments",
      value: successfulPayments.toLocaleString("en-IN"),
      icon: CheckCircle2,
      type: "success",
    },
    {
      id: "pending-cash",
      title: "Pending Cash",
      value: formatCurrency(pendingCash),
      icon: Clock3,
      type: "pending",
    },
    {
      id: "refunded-payments",
      title: "Refunded",
      value: refundedPayments.toLocaleString("en-IN"),
      icon: RotateCcw,
      type: "refunded",
    },
    {
      id: "failed-payments",
      title: "Failed",
      value: failedPayments.toLocaleString("en-IN"),
      icon: XCircle,
      type: "failed",
    },
  ];

  return (
    <section className="tp-payment-stats">

      <div className="tp-payment-stats-grid">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <div
              className={`tp-payment-stat-card tp-payment-stat-card--${card.type}`}
              key={card.id}
            >

              <div className="tp-payment-stat-card__top">

                <div className="tp-payment-stat-card__icon">
                  <Icon size={19} strokeWidth={2} />
                </div>

              </div>

              <div className="tp-payment-stat-card__content">

                <p className="tp-payment-stat-card__title">
                  {card.title}
                </p>

                <h3 className="tp-payment-stat-card__value">
                  {card.value}
                </h3>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default PaymentStats;