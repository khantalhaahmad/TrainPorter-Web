import React from "react";
import {
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
} from "lucide-react";

const PaymentStatusBadge = ({ status = "pending" }) => {
  const normalizedStatus =
    String(status).toLowerCase();

  const statusConfig = {
    paid: {
      label: "Paid",
      className: "paid",
      icon: CheckCircle2,
    },

    pending: {
      label: "Pending",
      className: "pending",
      icon: Clock3,
    },

    failed: {
      label: "Failed",
      className: "failed",
      icon: XCircle,
    },

    refunded: {
      label: "Refunded",
      className: "refunded",
      icon: RotateCcw,
    },
  };

  const config =
    statusConfig[normalizedStatus] ||
    statusConfig.pending;

  const Icon = config.icon;

  return (
    <span
      className={`tp-payment-status-badge tp-payment-status-badge--${config.className}`}
    >
      <Icon
        size={13}
        strokeWidth={2.2}
      />

      {config.label}
    </span>
  );
};

export default PaymentStatusBadge;