import React from "react";
import {
  Users,
  BriefcaseBusiness,
  Ticket,
  IndianRupee,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import "./DashboardCards.css";

const DashboardCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "#3B82F6",
      bg: "#EFF6FF",
      growth: "+12.5%",
      trend: "up",
    },
    {
      title: "Total Porters",
      value: stats?.approvedPorters || 0,
      icon: BriefcaseBusiness,
      color: "#10B981",
      bg: "#ECFDF5",
      growth: "+4.2%",
      trend: "up",
    },
    {
      title: "Bookings",
      value: stats?.totalBookings || 0,
      icon: Ticket,
      color: "#F97316",
      bg: "#FFF7ED",
      growth: "+8.6%",
      trend: "up",
    },
    {
      title: "Revenue",
      value: `₹${stats?.totalRevenue || 0}`,
      icon: IndianRupee,
      color: "#8B5CF6",
      bg: "#F5F3FF",
      growth: "-1.8%",
      trend: "down",
    },
  ];

  return (
    <div className="tp-dashboard-cards">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="tp-dashboard-card"
          >

            <div className="tp-dashboard-card-top">

              <div
                className="tp-dashboard-icon"
                style={{
                  background: card.bg,
                  color: card.color,
                }}
              >
                <Icon size={24} />
              </div>

              <div
                className={`tp-dashboard-growth ${
                  card.trend === "up"
                    ? "positive"
                    : "negative"
                }`}
              >
                {card.trend === "up" ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}

                {card.growth}

              </div>

            </div>

            <h2>

              {card.value}

            </h2>

            <p>

              {card.title}

            </p>

          </div>

        );

      })}

    </div>
  );
};

export default DashboardCards;