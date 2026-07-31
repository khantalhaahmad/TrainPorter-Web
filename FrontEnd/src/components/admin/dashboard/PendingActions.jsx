import React from "react";
import {
  UserCheck,
  AlertTriangle,
  Ticket,
  Users,
  ArrowRight,
} from "lucide-react";

import "./PendingActions.css";

const PendingActions = ({ data = {} }) => {

  const actions = [
    {
      title: "Porter Applications",
      value: data.pendingPorters || 0,
      color: "#F59E0B",
      icon: UserCheck,
      button: "Review",
    },
    {
      title: "Pending Complaints",
      value: data.pendingComplaints || 0,
      color: "#EF4444",
      icon: AlertTriangle,
      button: "Open",
    },
    {
      title: "Unassigned Bookings",
      value: data.unassignedBookings || 0,
      color: "#3B82F6",
      icon: Ticket,
      button: "Assign",
    },
    {
      title: "New Users Today",
      value: data.newUsersToday || 0,
      color: "#10B981",
      icon: Users,
      button: "View",
    },
  ];

  return (

    <div className="tp-pending-card">

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

      <div className="tp-pending-list">

        {actions.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="tp-pending-item"
            >

              <div
                className="tp-pending-icon"
                style={{
                  background: `${item.color}15`,
                  color: item.color,
                }}
              >

                <Icon size={22} />

              </div>

              <div className="tp-pending-content">

                <h4>

                  {item.title}

                </h4>

                <span>

                  {item.value} Pending

                </span>

              </div>

              <button>

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