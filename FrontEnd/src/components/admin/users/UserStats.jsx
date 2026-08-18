import React from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  ShieldCheck,
  Ban,
} from "lucide-react";

import "./UserStats.css";

const UserStats = ({ stats = {}, loading = false }) => {

  const cards = [
    {
      key: "totalUsers",
      title: "Total Users",
      value: stats.totalUsers ?? 0,
      icon: Users,
      className: "total",
      trend: "+12.4%",
      trendText: "from last month",
      graph: "M2 42 C12 38, 16 44, 26 36 S42 40, 52 28 S68 34, 78 24 S92 30, 104 18 S120 28, 132 12",
    },

    {
      key: "activeUsers",
      title: "Active Users",
      value: stats.activeUsers ?? 0,
      icon: UserCheck,
      className: "active",
      trend: "+8.7%",
      trendText: "from last month",
      graph: "M2 38 C14 34, 18 42, 28 35 S42 40, 52 27 S66 31, 78 22 S92 26, 104 16 S120 22, 132 10",
    },

    {
      key: "newUsers",
      title: "New Users",
      value: stats.newUsers ?? 0,
      icon: UserPlus,
      className: "new",
      trend: "+15.3%",
      trendText: "from last month",
      graph: "M2 40 C12 34, 18 45, 28 37 S42 44, 52 30 S66 36, 78 24 S94 31, 104 18 S120 24, 132 13",
    },

    {
      key: "verifiedUsers",
      title: "Verified Users",
      value: stats.verifiedUsers ?? 0,
      icon: ShieldCheck,
      className: "verified",
      trend: "+10.1%",
      trendText: "from last month",
      graph: "M2 42 C12 39, 18 44, 28 35 S42 40, 52 31 S66 35, 78 25 S92 28, 104 17 S120 23, 132 12",
    },

    {
      key: "blockedUsers",
      title: "Blocked Users",
      value: stats.blockedUsers ?? 0,
      icon: Ban,
      className: "blocked",
      trend: "-4.3%",
      trendText: "from last month",
      graph: "M2 20 C12 15, 18 24, 28 18 S42 28, 52 17 S66 25, 78 12 S92 23, 104 8 S120 18, 132 14",
    },
  ];

  return (
    <div className="tp-user-stats">

      {cards.map((card) => {

        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className={`tp-user-stat-card tp-user-stat-card--${card.className}`}
          >

            {/* =========================
                TOP
            ========================= */}

            <div className="tp-user-stat-card__top">

              <div className="tp-user-stat-card__icon">
                <Icon size={21} strokeWidth={2} />
              </div>

              <div className="tp-user-stat-card__content">

                <span className="tp-user-stat-card__title">
                  {card.title}
                </span>

                <strong className="tp-user-stat-card__value">
                  {loading ? "—" : card.value}
                </strong>

              </div>

            </div>


            {/* =========================
                TREND
            ========================= */}

            <div className="tp-user-stat-card__trend">

              <span className="tp-user-stat-card__percentage">
                {card.trend}
              </span>

              <span className="tp-user-stat-card__trend-text">
                {card.trendText}
              </span>

            </div>


            {/* =========================
                MINI GRAPH
            ========================= */}

            <div className="tp-user-stat-card__graph">

              <svg
                viewBox="0 0 134 48"
                preserveAspectRatio="none"
                aria-hidden="true"
              >

                <defs>

                  <linearGradient
                    id={`gradient-${card.key}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      className="tp-user-stat-gradient-start"
                    />

                    <stop
                      offset="100%"
                      className="tp-user-stat-gradient-end"
                    />

                  </linearGradient>

                </defs>


                {/* Area */}

                <path
                  d={`${card.graph} L132 48 L2 48 Z`}
                  className="tp-user-stat-card__graph-area"
                />


                {/* Line */}

                <path
                  d={card.graph}
                  fill="none"
                  className="tp-user-stat-card__graph-line"
                />

              </svg>

            </div>

          </div>
        );

      })}

    </div>
  );
};

export default UserStats;