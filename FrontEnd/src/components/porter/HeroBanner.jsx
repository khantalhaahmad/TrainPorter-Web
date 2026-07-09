import React from "react";
import "./HeroBanner.css";

import porterHeroImage from "../../assets/porter-hero.png";

const HeroBanner = () => {
  return (
    <section className="bp-hero-section">

      <div className="bp-hero-background"></div>

      <div className="bp-hero-container">

        {/* LEFT */}

        <div className="bp-hero-left-panel">

          <div className="bp-hero-top-badge">
            🚉 Join India's Smart Porter Network
          </div>

          <h1 className="bp-hero-main-heading">
            Become a <span>TrainPorter</span> Partner
          </h1>

          <p className="bp-hero-description">
            Join thousands of verified railway porters across India and earn
            more with flexible working hours, secure payments, verified
            passenger bookings and real-time job notifications.
          </p>

          <div className="bp-hero-feature-list">

            <div className="bp-hero-feature-item">
              ✅ Verified Passenger Requests
            </div>

            <div className="bp-hero-feature-item">
              💰 Daily Earnings up to ₹1500+
            </div>

            <div className="bp-hero-feature-item">
              🛡 Secure Weekly Payments
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="bp-hero-right-panel">

          <div className="bp-hero-image-wrapper">

            <img
              src={porterHeroImage}
              alt="TrainPorter Partner"
              className="bp-hero-banner-image"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroBanner;