import React from "react";
import {
  CalendarClock,
  UserPlus,
  CheckCircle2,
  AlertTriangle,
  Ticket,
} from "lucide-react";

import "./RecentActivities.css";

const activityIcons = {
  booking: {
    icon: Ticket,
    color: "#3B82F6",
  },

  user: {
    icon: UserPlus,
    color: "#10B981",
  },

  porter: {
    icon: CheckCircle2,
    color: "#8B5CF6",
  },

  complaint: {
    icon: AlertTriangle,
    color: "#EF4444",
  },

  system: {
    icon: CalendarClock,
    color: "#F59E0B",
  },
};

const RecentActivities = ({
  activities = [],
}) => {

  return (

    <div className="tp-activities-card">

      <div className="tp-activities-header">

        <div>

          <h3>

            Recent Activities

          </h3>

          <p>

            Latest system updates

          </p>

        </div>

      </div>

      <div className="tp-activities-list">

        {activities.length === 0 ? (

          <div className="tp-activities-empty">

            No recent activity

          </div>

        ) : (

          activities.map((activity) => {

            const config =
              activityIcons[
                activity.type
              ] ||
              activityIcons.system;

            const Icon =
              config.icon;

            return (

              <div
                key={activity._id}
                className="tp-activity-item"
              >

                <div
                  className="tp-activity-icon"
                  style={{
                    background:
                      `${config.color}15`,
                    color:
                      config.color,
                  }}
                >

                  <Icon size={20} />

                </div>

                <div className="tp-activity-content">

                  <h4>

                    {activity.title}

                  </h4>

                  <p>

                    {activity.description}

                  </p>

                </div>

                <span>

                  {new Date(
                    activity.createdAt
                  ).toLocaleDateString()}

                </span>

              </div>

            );

          })

        )}

      </div>

    </div>

  );

};

export default RecentActivities;