import React from "react";
import "./StatsSection.css";

import {
  Users,
  IndianRupee,
  Star,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: <Users size={28} />,
    value: "10K+",
    title: "Verified Porters",
    description:
      "Trusted porter partners serving passengers across India.",
  },
  {
    icon: <IndianRupee size={28} />,
    value: "₹900+",
    title: "Average Daily Earnings",
    description:
      "Top-performing partners earn even more during peak travel seasons.",
  },
  {
    icon: <Star size={28} />,
    value: "4.9★",
    title: "Passenger Rating",
    description:
      "Highly rated service with thousands of satisfied railway passengers.",
  },
  {
    icon: <ShieldCheck size={28} />,
    value: "100%",
    title: "Secure Payments",
    description:
      "Weekly payouts directly to your registered bank account.",
  },
];

const StatsSection = () => {
  return (

    <section className="bp-stats-section">

      {/* =========================
          HEADING
      ========================= */}

      <div className="bp-stats-header">

        <span className="bp-stats-badge">
          🚀 TrainPorter Growth
        </span>

        <h2 className="bp-stats-heading">
          Trusted by Thousands Across India
        </h2>

        <p className="bp-stats-subheading">
          Join India's growing digital porter network and become a part of the
          future of railway luggage assistance.
        </p>

      </div>

      {/* =========================
          STATS GRID
      ========================= */}

      <div className="bp-stats-grid">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bp-stats-card"
          >

            <div className="bp-stats-icon">

              {item.icon}

            </div>

            <h3 className="bp-stats-value">

              {item.value}

            </h3>

            <h4 className="bp-stats-title">

              {item.title}

            </h4>

            <p className="bp-stats-description">

              {item.description}

            </p>

          </div>

        ))}

      </div>

    </section>

  );
};

export default StatsSection;