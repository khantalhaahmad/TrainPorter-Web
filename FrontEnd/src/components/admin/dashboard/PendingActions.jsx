import React from "react";
import {
  UserCheck,
  ClipboardCheck,
  XCircle,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./PendingActions.css";

const PendingActions = ({ data = {} }) => {

  const navigate = useNavigate();

  const actions = [
    {
      title: "Porter Applications",
      value: data.pendingPorters ?? 0,
      color: "#F59E0B",
      icon: UserCheck,
      button: "Review",
      path: "/admin/porters",
    },
    {
      title: "Assigned Bookings",
      value: data.assignedBookings ?? 0,
      color: "#3B82F6",
      icon: ClipboardCheck,
      button: "View",
      path: "/admin/bookings",
    },
    {
      title: "Cancelled Bookings",
      value: data.cancelledBookings ?? 0,
      color: "#EF4444",
      icon: XCircle,
      button: "View",
      path: "/admin/bookings",
    },
    {
      title: "Pending Payments",
      value: data.pendingPayments ?? 0,
      color: "#10B981",
      icon: CreditCard,
      button: "View",
      path: "/admin/payments",
    },
  ];

  const handleAction = (path) => {
    navigate(path);
  };

  return (
    <div className="tp-pending-card">

      {/* =========================
          HEADER
      ========================= */}

      <div className="tp-pending-header">

        <div>

          <h3>
            Pending Actions
          </h3>

          <p>
            Tasks requiring attention
          </p>

        </div>

      </div>


      {/* =========================
          ACTION LIST
      ========================= */}

      <div className="tp-pending-list">

        {actions.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="tp-pending-item"
            >

              {/* Icon */}

              <div
                className="tp-pending-icon"
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                }}
              >
                <Icon size={21} />
              </div>


              {/* Content */}

              <div className="tp-pending-content">

                <h4>
                  {item.title}
                </h4>

                <span>
                  {item.value}{" "}
                  {item.value === 1
                    ? "Item"
                    : "Items"}
                </span>

              </div>


              {/* Action Button */}

              <button
                type="button"
                onClick={() =>
                  handleAction(item.path)
                }
              >

                {item.button}

                <ArrowRight size={15} />

              </button>

            </div>
          );

        })}

      </div>

    </div>
  );
};

export default PendingActions;