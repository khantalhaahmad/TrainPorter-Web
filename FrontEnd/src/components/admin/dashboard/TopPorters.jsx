import React from "react";
import { Star, TrendingUp } from "lucide-react";

import "./TopPorters.css";

const TopPorters = ({ porters = [] }) => {

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

        {porters.length === 0 ? (

          <div className="tp-top-porters-empty">
            No completed bookings found
          </div>

        ) : (

          porters.map((porter, index) => {

            const name =
              porter.name ||
              porter.fullName ||
              "Unknown Porter";

            const initials =
              name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase()
                )
                .join("") || "P";

            const rating =
              porter.rating ??
              porter.averageRating ??
              0;

            const bookings =
              porter.bookings ??
              porter.completedBookings ??
              porter.totalBookings ??
              0;

            return (

              <div
                className="tp-top-porter-item"
                key={porter._id || porter.id || index}
              >

                {/* Rank */}
                <div className="tp-top-porter-rank">

                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `#${index + 1}`}

                </div>


                {/* Avatar */}
                <div className="tp-top-porter-avatar">

                  {porter.profilePhoto ? (

                    <img
                      src={porter.profilePhoto}
                      alt={name}
                    />

                  ) : (

                    initials

                  )}

                </div>


                {/* Porter Information */}
                <div className="tp-top-porter-info">

                  <strong>
                    {name}
                  </strong>

                  <span>
                    {bookings} completed{" "}
                    {bookings === 1
                      ? "booking"
                      : "bookings"}
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
                      {Number(rating).toFixed(1)}
                    </strong>

                  </div>

                  <span>
                    Rating
                  </span>

                </div>

              </div>

            );

          })

        )}

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