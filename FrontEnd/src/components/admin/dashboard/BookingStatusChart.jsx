import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import "./BookingStatusChart.css";

const COLORS = [
  "#FFB020",
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#06B6D4",
  "#22C55E",
  "#EF4444",
];

const BookingStatusChart = ({ data = {} }) => {

  const chartData = [
    {
      name: "Pending",
      value: data.pending || 0,
    },
    {
      name: "Assigned",
      value: data.assigned || 0,
    },
    {
      name: "Accepted",
      value: data.accepted || 0,
    },
    {
      name: "Arrived",
      value: data.arrived || 0,
    },
    {
      name: "In Progress",
      value: data.inProgress || 0,
    },
    {
      name: "Completed",
      value: data.completed || 0,
    },
    {
      name: "Cancelled",
      value: data.cancelled || 0,
    },
  ];

  const total = chartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="tp-status-card">

      <div className="tp-status-header">

        <div>

          <h3>Booking Status</h3>

          <p>Current Booking Distribution</p>

        </div>

      </div>

      <div className="tp-status-chart">

        <ResponsiveContainer
          width="100%"
          height={260}
        >

          <PieChart>

            <Pie
              data={chartData}
              innerRadius={70}
              outerRadius={95}
              dataKey="value"
              paddingAngle={3}
            >

              {chartData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="tp-status-total">

        <h2>{total}</h2>

        <span>Total Bookings</span>

      </div>

      <div className="tp-status-legend">

        {chartData.map((item, index) => (

          <div
            key={item.name}
            className="tp-status-item"
          >

            <div
              className="tp-status-color"
              style={{
                background: COLORS[index],
              }}
            />

            <span>{item.name}</span>

            <strong>{item.value}</strong>

          </div>

        ))}

      </div>

    </div>
  );
};

export default BookingStatusChart;