import React from "react";
import {
  Bell,
  Ticket,
  UserCheck,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";

import "./NotificationsPanel.css";

const notificationIcons = {
  booking: {
    icon: Ticket,
    color: "#3B82F6",
  },

  porter: {
    icon: UserCheck,
    color: "#10B981",
  },

  payment: {
    icon: IndianRupee,
    color: "#8B5CF6",
  },

  alert: {
    icon: AlertTriangle,
    color: "#EF4444",
  },

  default: {
    icon: Bell,
    color: "#F59E0B",
  },
};

const NotificationsPanel = ({
  notifications = [],
}) => {

  return (

    <div className="tp-notification-card">

      <div className="tp-notification-header">

        <div>

          <h3>

            Notifications

          </h3>

          <p>

            Latest system updates

          </p>

        </div>

        <button>

          View All

        </button>

      </div>

      <div className="tp-notification-list">

        {notifications.length === 0 ? (

          <div className="tp-notification-empty">

            No Notifications

          </div>

        ) : (

          notifications.map((item) => {

            const config =
              notificationIcons[
                item.type
              ] ||
              notificationIcons.default;

            const Icon =
              config.icon;

            return (

              <div
                key={item._id}
                className={`tp-notification-item ${
                  item.isRead
                    ? ""
                    : "unread"
                }`}
              >

                <div
                  className="tp-notification-icon"
                  style={{
                    background:
                      `${config.color}15`,
                    color:
                      config.color,
                  }}
                >

                  <Icon size={20} />

                </div>

                <div className="tp-notification-content">

                  <h4>

                    {item.title}

                  </h4>

                  <p>

                    {item.message}

                  </p>

                  <span>

                    {new Date(
                      item.createdAt
                    ).toLocaleString()}

                  </span>

                </div>

                {!item.isRead && (

                  <div
                    className="tp-notification-dot"
                  />

                )}

              </div>

            );

          })

        )}

      </div>

    </div>

  );

};

export default NotificationsPanel;