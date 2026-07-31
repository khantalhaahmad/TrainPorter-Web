import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import "./RevenueChart.css";

const RevenueChart = ({ data = [] }) => {

  const chartData =
    data.length > 0
      ? data.map((item) => ({
          day: item._id,
          revenue: item.revenue,
        }))
      : [
          { day: "Mon", revenue: 4200 },
          { day: "Tue", revenue: 5100 },
          { day: "Wed", revenue: 6200 },
          { day: "Thu", revenue: 5900 },
          { day: "Fri", revenue: 7300 },
          { day: "Sat", revenue: 8400 },
          { day: "Sun", revenue: 9100 },
        ];

  const totalRevenue = chartData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  return (
    <div className="tp-revenue-card">

      <div className="tp-revenue-header">

        <div>

          <h3>Revenue Analytics</h3>

          <p>Last 7 Days Revenue</p>

        </div>

        <div className="tp-revenue-growth">

          <TrendingUp size={18} />

          +18.7%

        </div>

      </div>

      <div className="tp-revenue-total">

        <div className="tp-revenue-icon">

          <IndianRupee size={22} />

        </div>

        <div>

          <h2>

            ₹{totalRevenue.toLocaleString()}

          </h2>

          <span>Total Revenue</span>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <AreaChart
          data={chartData}
        >

          <defs>

            <linearGradient
              id="revenueGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#8B5CF6"
                stopOpacity={0.45}
              />

              <stop
                offset="95%"
                stopColor="#8B5CF6"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            strokeDasharray="5 5"
            vertical={false}
          />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#8B5CF6"
            strokeWidth={3}
            fill="url(#revenueGradient)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;