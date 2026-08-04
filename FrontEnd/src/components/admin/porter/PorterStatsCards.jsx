import React from "react";
import {
  FileText,
  Clock3,
  BadgeCheck,
  XCircle,
} from "lucide-react";

const PorterStatsCards = ({
  applications = [],
}) => {

  const totalApplications =
    applications.length;

  const pendingApplications =
    applications.filter(
      (item) =>
        item.status === "pending"
    ).length;

  const approvedApplications =
    applications.filter(
      (item) =>
        item.status === "approved"
    ).length;

  const rejectedApplications =
    applications.filter(
      (item) =>
        item.status === "rejected"
    ).length;

  const stats = [
    {
      title:
        "Total Applications",
      value:
        totalApplications,
      icon: FileText,
      className:
        "tp-porter-card-blue",
    },
    {
      title: "Pending",
      value:
        pendingApplications,
      icon: Clock3,
      className:
        "tp-porter-card-orange",
    },
    {
      title: "Approved",
      value:
        approvedApplications,
      icon: BadgeCheck,
      className:
        "tp-porter-card-green",
    },
    {
      title: "Rejected",
      value:
        rejectedApplications,
      icon: XCircle,
      className:
        "tp-porter-card-red",
    },
  ];

  return (
    <section className="tp-porter-stats-section">

      <div className="tp-porter-stats-grid">

        {stats.map((card) => {

          const Icon =
            card.icon;

          return (

            <div
              key={card.title}
              className={`tp-porter-stat-card ${card.className}`}
            >

              <div className="tp-porter-stat-top">

                <div className="tp-porter-stat-icon">

                  <Icon
                    size={26}
                  />

                </div>

              </div>

              <div className="tp-porter-stat-content">

                <span className="tp-porter-stat-title">

                  {card.title}

                </span>

                <h2 className="tp-porter-stat-value">

                  {card.value}

                </h2>

              </div>

            </div>

          );

        })}

      </div>

    </section>
  );

};

export default PorterStatsCards;