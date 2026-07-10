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
    title: "Active Porters",
    description:
      "Trusted porter partners serving passengers across India.",
  },
  {
    icon: <IndianRupee size={28} />,
    value: "₹900+",
    title: "Avg. Daily Earning",
    description:
      "Top-performing partners earn even more during peak travel seasons.",
  },
  {
    icon: <Star size={28} />,
    value: "4.9★",
    title: "Partner Rating",
    description:
      "Highly rated service with thousands of satisfied railway passengers.",
  },
  {
    icon: <ShieldCheck size={28} />,
    value: "100%",
    title: "Verified Network",
    description:
      "Weekly payouts directly to your registered bank account.",
  },
];

const StatsSection = () => {
  return (

    <section className="bp-stats-section">

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

      <div className="bp-stats-value">
        {item.value}
      </div>

      <div className="bp-stats-title">
        {item.title}
      </div>

    </div>

  ))}

</div>

    </section>

  );
};

export default StatsSection;