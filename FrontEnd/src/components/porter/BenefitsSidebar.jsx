import React from "react";
import "./BenefitsSidebar.css";

import {
  IndianRupee,
  Clock3,
  ShieldCheck,
  TrainFront,
  Star,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    icon: <IndianRupee size={22} />,
    title: "Earn ₹500–1500 / Day",
    description:
      "Complete porter requests and earn daily with transparent payouts.",
  },
  {
    icon: <Clock3 size={22} />,
    title: "Flexible Working Hours",
    description:
      "Accept bookings whenever you're available. No fixed schedule.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure Payments",
    description:
      "Receive secure weekly settlements directly into your bank account.",
  },
  {
    icon: <TrainFront size={22} />,
    title: "Verified Railway Bookings",
    description:
      "Work only with verified passengers and genuine booking requests.",
  },
];

const BenefitsSidebar = () => {
  return (
    <aside className="bp-sidebar-wrapper">

      {/* ===========================
          TOP CARD
      =========================== */}

      <div className="bp-sidebar-top-card">

        <div className="bp-sidebar-top-icon">
          <BadgeCheck size={34} />
        </div>

        <h2 className="bp-sidebar-top-title">
          Why Join TrainPorter?
        </h2>

        <p className="bp-sidebar-top-description">
          Become a verified railway porter and start earning through
          India's modern luggage assistance platform.
        </p>

      </div>

      {/* ===========================
          BENEFITS
      =========================== */}

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

              <h4>

                {item.title}

              </h4>

              <p>

                {item.description}

              </p>

            </div>

          </div>

        ))}

      </div>

      {/* ===========================
          RATING CARD
      =========================== */}

      <div className="bp-sidebar-rating-card">

        <div className="bp-sidebar-rating-stars">

          <Star fill="#FBBF24" color="#FBBF24" size={20} />
          <Star fill="#FBBF24" color="#FBBF24" size={20} />
          <Star fill="#FBBF24" color="#FBBF24" size={20} />
          <Star fill="#FBBF24" color="#FBBF24" size={20} />
          <Star fill="#FBBF24" color="#FBBF24" size={20} />

        </div>

        <h3>

          4.9 / 5 Rating

        </h3>

        <p>

          Trusted by thousands of railway passengers and verified
          TrainPorter partners across India.

        </p>

      </div>

      {/* ===========================
          INFO CARD
      =========================== */}

      <div className="bp-sidebar-info-card">

        <h3>

          Quick Facts

        </h3>

        <div className="bp-sidebar-info-row">

          <span>Verified Partners</span>

          <strong>10,000+</strong>

        </div>

        <div className="bp-sidebar-info-row">

          <span>Average Daily Earnings</span>

          <strong>₹900+</strong>

        </div>

        <div className="bp-sidebar-info-row">

          <span>Support</span>

          <strong>24×7</strong>

        </div>

        <div className="bp-sidebar-info-row">

          <span>Secure Payments</span>

          <strong>100%</strong>

        </div>

      </div>

    </aside>
  );
};

export default BenefitsSidebar;