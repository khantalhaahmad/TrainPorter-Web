import React from "react";

import {
  Users,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Ban,
} from "lucide-react";

import "./UserStats.css";


const UserStats = ({
  stats = {},
  loading = false,
}) => {

  const cards = [
    {
      key: "totalUsers",
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: Users,
      type: "total",
    },
    {
      key: "activeUsers",
      title: "Active Users",
      value: stats.activeUsers ?? 0,
      icon: UserCheck,
      type: "active",
    },
    {
      key: "newUsers",
      title: "New Users",
      value: stats.newUsers ?? 0,
      icon: UserPlus,
      type: "new",
    },
    {
      key: "verifiedUsers",
      title: "Verified Users",
      value: stats.verifiedUsers ?? 0,
      icon: ShieldCheck,
      type: "verified",
    },
    {
      key: "blockedUsers",
      title: "Blocked Users",
      value: stats.blockedUsers ?? 0,
      icon: Ban,
      type: "blocked",
    },
  ];


  if (loading) {
    return (
      <section className="tp-users-stats">

        {cards.map((card) => (
          <div
            className="tp-users-stat-card tp-users-stat-card--loading"
            key={card.key}
          >

            <div className="tp-users-stat-card__top">

              <div className="tp-users-stat-icon-skeleton" />

              <div className="tp-users-stat-text-skeleton">
                <span />
                <strong />
              </div>

            </div>

            <div className="tp-users-stat-chart-skeleton" />

          </div>
        ))}

      </section>
    );
  }


  return (
    <section className="tp-users-stats">

      {cards.map((card) => {

        const Icon = card.icon;

        return (
          <article
            key={card.key}
            className={`tp-users-stat-card tp-users-stat-card--${card.type}`}
          >

            <div className="tp-users-stat-card__top">

              <div
                className={`tp-users-stat-icon tp-users-stat-icon--${card.type}`}
              >
                <Icon size={20} strokeWidth={1.9} />
              </div>


              <div className="tp-users-stat-card__content">

                <span className="tp-users-stat-card__label">
                  {card.title}
                </span>

                <strong className="tp-users-stat-card__value">
                  {Number(card.value).toLocaleString("en-IN")}
                </strong>

              </div>

            </div>


            <div className="tp-users-stat-card__footer">

              <span
                className={`tp-users-stat-indicator tp-users-stat-indicator--${card.type}`}
              >
                {card.type === "blocked" ? "Account control" : "Current overview"}
              </span>

            </div>

          </article>
        );
      })}

    </section>
  );
};

export default UserStats;