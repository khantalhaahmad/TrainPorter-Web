import React from "react";
import {
  TrainFront,
  TrendingUp,
} from "lucide-react";

import "./TopStations.css";

const TopStations = ({
  stations = [],
}) => {

  const stationData =
    stations.length > 0
      ? stations
      : [
          {
            station: "New Delhi",
            bookings: 324,
          },
          {
            station: "Patna Jn",
            bookings: 276,
          },
          {
            station: "Howrah",
            bookings: 231,
          },
          {
            station: "Mumbai Central",
            bookings: 198,
          },
          {
            station: "Secunderabad",
            bookings: 175,
          },
        ];

  const maxBookings =
    Math.max(
      ...stationData.map(
        item => item.bookings
      )
    );

  return (

    <div className="tp-stations-card">

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

      <div className="tp-stations-list">

        {stationData.map(
          (
            station,
            index
          ) => (

            <div
              key={index}
              className="tp-station-item"
            >

              <div className="tp-station-rank">

                #{index + 1}

              </div>

              <div className="tp-station-icon">

                <TrainFront size={20} />

              </div>

              <div className="tp-station-content">

                <div className="tp-station-top">

                  <h4>

                    {station.station}

                  </h4>

                  <span>

                    {station.bookings}

                  </span>

                </div>

                <div className="tp-progress">

                  <div
                    className="tp-progress-fill"
                    style={{
                      width: `${
                        (station.bookings /
                          maxBookings) *
                        100
                      }%`,
                    }}
                  />

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

};

export default TopStations;