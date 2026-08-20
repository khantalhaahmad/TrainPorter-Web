import React from "react";
import { Star, TrendingUp } from "lucide-react";

import "./TopPorters.css";

const TopPorters = () => {

  const porters = [
    {
      id: 1,
      name: "Rahul Kumar",
      rating: 4.9,
      bookings: 128,
      initials: "RK",
    },
    {
      id: 2,
      name: "Aman Singh",
      rating: 4.8,
      bookings: 114,
      initials: "AS",
    },
    {
      id: 3,
      name: "Mohit Kumar",
      rating: 4.8,
      bookings: 97,
      initials: "MK",
    },
    {
      id: 4,
      name: "Arjun Yadav",
      rating: 4.7,
      bookings: 91,
      initials: "AY",
    },
  ];

  return (
    <div className="tp-top-porters-card">

      {/* Header */}
      <div className="tp-top-porters-header">

        <div>
          <h3>Top Rated Porters</h3>

          <p>
            Best performing porters
          </p>
        </div>

        <div className="tp-top-porters-icon">
          <TrendingUp size={18} />
        </div>

      </div>


      {/* Porter List */}
      <div className="tp-top-porters-list">

        {porters.map((porter, index) => (

          <div
            className="tp-top-porter-item"
            key={porter.id}
          >

            {/* Rank */}
            <div className="tp-top-porter-rank">

              {index === 0
                ? "🥇"
                : index === 1
                ? "🥈"
                : index === 2
                ? "🥉"
                : index + 1}

            </div>


            {/* Avatar */}
            <div className="tp-top-porter-avatar">

              {porter.initials}

            </div>


            {/* Porter Information */}
            <div className="tp-top-porter-info">

              <strong>
                {porter.name}
              </strong>

              <span>
                {porter.bookings} completed bookings
              </span>

            </div>


            {/* Rating */}
            <div className="tp-top-porter-rating">

              <div>
                <Star
                  size={14}
                  fill="currentColor"
                />

                <strong>
                  {porter.rating}
                </strong>
              </div>

              <span>
                Rating
              </span>

            </div>

          </div>

        ))}

      </div>


      {/* Footer */}
      <div className="tp-top-porters-footer">

        <span>
          Showing top performers
        </span>

        <button type="button">
          View All
        </button>

      </div>

    </div>
  );
};

export default TopPorters;