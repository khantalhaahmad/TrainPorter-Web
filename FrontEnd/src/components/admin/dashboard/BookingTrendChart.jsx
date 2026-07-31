import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  TrendingUp,
} from "lucide-react";

import "./BookingTrendChart.css";

const BookingTrendChart = ({ data = [] }) => {

  const chartData =
    data.length > 0
      ? data.map((item) => ({
          day: item._id,
          bookings: item.bookings,
        }))
      : [
          { day: "Mon", bookings: 24 },
          { day: "Tue", bookings: 38 },
          { day: "Wed", bookings: 45 },
          { day: "Thu", bookings: 41 },
          { day: "Fri", bookings: 59 },
          { day: "Sat", bookings: 67 },
          { day: "Sun", bookings: 72 },
        ];

  return (
    <div className="tp-booking-chart-card">

      <div className="tp-booking-chart-header">

        <div>

          <h3>Booking Trend</h3>

          <p>
            Last 7 Days Booking Analytics
          </p>

        </div>

        <div className="tp-booking-chart-growth">

          <TrendingUp size={18} />

          +14.2%

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <AreaChart
          data={chartData}
        >

          <defs>

            <linearGradient
              id="bookingColor"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#ff7a00"
                stopOpacity={0.45}
              />

              <stop
                offset="95%"
                stopColor="#ff7a00"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="5 5"
            vertical={false}
          />

          <XAxis
            dataKey="day"
          />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="bookings"
            stroke="#ff7a00"
            strokeWidth={3}
            fill="url(#bookingColor)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default BookingTrendChart;