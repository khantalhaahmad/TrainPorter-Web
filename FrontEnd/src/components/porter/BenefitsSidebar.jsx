import React from "react";
import "./BenefitsSidebar.css";

import {
  IndianRupee,
  Clock3,
  ShieldCheck,
  TrainFront,
  CircleDollarSign,
} from "lucide-react";

const benefits = [
  {
    icon: <CircleDollarSign size={22} />,
    title: "Good Earnings",
    description: "Earn ₹500 - ₹1500 per day",
  },
  {
    icon: <Clock3 size={22} />,
    title: "Flexible Time",
    description: "Work on your own schedule",
  },
  {
    icon: <IndianRupee size={22} />,
    title: "Secure Payments",
    description: "Payments directly in your bank",
  },
  {
    icon: <TrainFront size={22} />,
    title: "Verified Bookings",
    description: "100% verified & safe bookings",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Support 24/7",
    description: "We're always here to help you",
  },
];

const BenefitsSidebar = () => {
  return (
    <aside className="bp-sidebar-wrapper">

      {/* ===========================
          TOP CARD
      =========================== */}

      <div className="bp-sidebar-top-card">

  <h2 className="bp-sidebar-top-title">
    Why Join TrainPorter?
  </h2>

  <div className="bp-sidebar-benefit-list">

    {benefits.map((item, index) => (

      <div
        key={index}
        className="bp-sidebar-benefit-card"
      >

        <div className="bp-sidebar-benefit-icon">

          {item.icon}

        </div>

        <div className="bp-sidebar-benefit-content">

          <h4>{item.title}</h4>

          <p>{item.description}</p>

        </div>

      </div>

    ))}

  </div>

</div>
    </aside>
  );
};

export default BenefitsSidebar;