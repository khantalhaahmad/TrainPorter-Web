import React from "react";
import "./TrustSection.css";

import {
  Star,
  BadgeCheck,
  Quote,
} from "lucide-react";

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Verified Porter • New Delhi",
    rating: 5,
    review:
      "TrainPorter completely changed the way I work. I now receive verified passenger bookings every day and payments are always on time.",
  },
  {
    name: "Imran Ali",
    role: "Verified Porter • Patna",
    rating: 5,
    review:
      "The application process was smooth and support was very helpful. Flexible working hours help me earn more during busy railway schedules.",
  },
  {
    name: "Sanjay Singh",
    role: "Verified Porter • Gaya Junction",
    rating: 5,
    review:
      "Passengers trust the platform and bookings are genuine. The weekly payment system is secure and transparent.",
  },
];

const TrustSection = () => {
  return (

    <section className="bp-trust-section">

      {/* ================= HEADER ================= */}

      <div className="bp-trust-header">

        <span className="bp-trust-badge">
          ⭐ Trusted Across India
        </span>

        <h2 className="bp-trust-heading">
          Trusted by Thousands of
          <span> TrainPorter Partners</span>
        </h2>

        <p className="bp-trust-subheading">
          Join India's growing network of verified railway porters delivering
          reliable luggage assistance with secure earnings and trusted support.
        </p>

      </div>

      {/* ================= TESTIMONIALS ================= */}

      <div className="bp-trust-grid">

        {testimonials.map((item, index) => (

          <div
            key={index}
            className="bp-trust-card"
          >

            <Quote
              className="bp-trust-quote-icon"
              size={34}
            />

            <p className="bp-trust-review">

              "{item.review}"

            </p>

            <div className="bp-trust-rating">

              {Array.from({ length: item.rating }).map((_, i) => (

                <Star
                  key={i}
                  size={18}
                  fill="#FBBF24"
                  color="#FBBF24"
                />

              ))}

            </div>

            <div className="bp-trust-user">

              <div className="bp-trust-avatar">

                {item.name.charAt(0)}

              </div>

              <div className="bp-trust-user-details">

                <h4>

                  {item.name}

                </h4>

                <p>

                  {item.role}

                </p>

              </div>

              <BadgeCheck
                className="bp-trust-verified"
                size={22}
              />

            </div>

          </div>

        ))}

      </div>

      {/* ================= BOTTOM ================= */}

      <div className="bp-trust-bottom-card">

        <h3>

          🚆 Join India's Fastest Growing Digital Porter Network

        </h3>

        <p>

          More verified passengers, secure weekly payments,
          flexible working hours and complete transparency —
          everything you need to grow with TrainPorter.

        </p>

      </div>

    </section>

  );

};

export default TrustSection;