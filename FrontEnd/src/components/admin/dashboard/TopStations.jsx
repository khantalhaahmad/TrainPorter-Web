import React from "react";
import {
  TrainFront,
  TrendingUp,
} from "lucide-react";

import "./TopStations.css";

const TopStations = ({
  stations = [],
}) => {

  const stationData = Array.isArray(stations)
    ? stations
    : [];

  const maxBookings =
    stationData.length > 0
      ? Math.max(
          ...stationData.map(
            (item) => item.bookings || 0
          )
        )
      : 0;

  return (

    <div className="tp-stations-card">

      {/* ==========================================
            HEADER
      ========================================== */}

      <div className="tp-stations-header">

        <div>

          <h3>
            Top Stations
          </h3>

          <p>
            Highest booking stations
          </p>

        </div>

        <div className="tp-stations-badge">

          <TrendingUp size={16} />

          Live

        </div>

      </div>


      {/* ==========================================
            STATION LIST
      ========================================== */}

      <div className="tp-stations-list">

        {stationData.length === 0 ? (

          <div className="tp-stations-empty">

            No station data available

          </div>

        ) : (

          stationData.map(
            (
              station,
              index
            ) => {

              const bookings =
                station.bookings || 0;

              const progress =
                maxBookings > 0
                  ? (bookings / maxBookings) * 100
                  : 0;

              return (

                <div
                  key={`${station.station}-${index}`}
                  className="tp-station-item"
                >

                  {/* Rank */}

                  <div className="tp-station-rank">

                    #{index + 1}

                  </div>


                  {/* Station Icon */}

                  <div className="tp-station-icon">

                    <TrainFront size={20} />

                  </div>


                  {/* Station Information */}

                  <div className="tp-station-content">

                    <div className="tp-station-top">

                      <h4>
                        {station.station || "Unknown Station"}
                      </h4>

                      <span>
                        {bookings}
                      </span>

                    </div>


                    {/* Progress */}

                    <div className="tp-progress">

                      <div
                        className="tp-progress-fill"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              );

            }
          )

        )}

      </div>

    </div>

  );

};

export default TopStations;