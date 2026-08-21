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

  /*
   * Backend se latest notifications expected hain.
   * Safety ke liye frontend par bhi latest 5 hi show karenge.
   */
  const latestNotifications = [...notifications]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="tp-notification-card">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="tp-notification-header">

        <div>

          <h3>
            Notifications
          </h3>

          <p>
            Latest system updates
          </p>

        </div>

        <button type="button">
          View All
        </button>

      </div>


      {/* ==========================
          NOTIFICATION LIST
      ========================== */}

      <div className="tp-notification-list">

        {latestNotifications.length === 0 ? (

          <div className="tp-notification-empty">

            <Bell size={24} />

            <span>
              No Notifications
            </span>

          </div>

        ) : (

          latestNotifications.map((item) => {

            const config =
              notificationIcons[item.type] ||
              notificationIcons.default;

            const Icon = config.icon;

            return (

              <div
                key={item._id}
                className={`tp-notification-item ${
                  item.isRead ? "" : "unread"
                }`}
              >

                {/* ==========================
                    ICON
                ========================== */}

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


                {/* ==========================
                    CONTENT
                ========================== */}

                <div className="tp-notification-content">

                  <h4>
                    {item.title}
                  </h4>

                  <p>
                    {item.message}
                  </p>

                  <span>

                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "Just now"}

                  </span>

                </div>


                {/* ==========================
                    UNREAD INDICATOR
                ========================== */}

                {!item.isRead && (

                  <div
                    className="tp-notification-dot"
                    title="Unread"
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