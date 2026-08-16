import React, { useState } from "react";
import {
  BarChart3,
  IndianRupee,
  CreditCard,
  CheckCircle2,
  Clock3,
  XCircle,
  RotateCcw,
} from "lucide-react";

import "../../../styles/admin/payments/PaymentAnalytics.css";

const PaymentAnalytics = ({
  analytics = {},
  loading = false,
}) => {

const [revenueTooltip, setRevenueTooltip] = useState(null);

  // ========================================================
  // Helpers
  // ========================================================

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString("en-IN");
  };


  // ========================================================
  // Flexible Analytics Data
  // ========================================================

  const paymentMethods =
    analytics?.paymentMethods ||
    analytics?.methods ||
    [];

  const paymentStatuses =
    analytics?.paymentStatuses ||
    analytics?.statuses ||
    [];

  const revenueTrend =
    analytics?.revenueTrend ||
    analytics?.revenue ||
    [];

const topStations =
  analytics?.stationRevenue || [];

  // ========================================================
  // Loading
  // ========================================================

  if (loading) {
    return (
      <section className="tp-payment-analytics">

        <div className="tp-payment-analytics__header">

          <div className="tp-payment-analytics__title">

            <div className="tp-payment-analytics__title-icon">
              <BarChart3 size={17} />
            </div>

            <div>
              <h3>
                Payment Analytics
              </h3>

              <p>
                Payment performance overview
              </p>
            </div>

          </div>

        </div>

        <div className="tp-payment-analytics__loading">

          <div className="tp-payment-analytics__spinner" />

          <span>
            Loading analytics...
          </span>

        </div>

      </section>
    );
  }


  return (
    <section className="tp-payment-analytics">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <div className="tp-payment-analytics__header">

        <div className="tp-payment-analytics__title">

          <div className="tp-payment-analytics__title-icon">
            <BarChart3
              size={17}
              strokeWidth={2}
            />
          </div>

          <div>

            <h3>
              Payment Analytics
            </h3>

            <p>
              Payment performance overview
            </p>

          </div>

        </div>

      </div>


      {/* ====================================================
          CONTENT
      ==================================================== */}

      <div className="tp-payment-analytics__grid">


        {/* ==================================================
            PAYMENT METHODS
        ================================================== */}

        <div className="tp-payment-analytics__card">

          <div className="tp-payment-analytics__card-header">

            <div>

              <h4>
                Payment Methods
              </h4>

              <p>
                Revenue by payment method
              </p>

            </div>

            <CreditCard
              size={18}
              strokeWidth={2}
            />

          </div>


         <div className="tp-payment-method-list">

  {paymentMethods.length > 0 ? (() => {

    const totalRevenue =
      paymentMethods.reduce(
        (sum, method) =>
          sum + Number(method?.revenue || 0),
        0
      );

    let cumulative = 0;

    const segments = paymentMethods.map(
      (method, index) => {

        const revenue =
          Number(method?.revenue || 0);

        const percentage =
          totalRevenue > 0
            ? (revenue / totalRevenue) * 100
            : 0;

        const start = cumulative;

        cumulative += percentage;

        const name =
          method?._id ||
          method?.method ||
          method?.name ||
          "Unknown";

        const colors = [
          "#4f46e5",
          "#f59e0b",
          "#0ea5e9",
          "#8b5cf6",
          "#ec4899",
          "#64748b",
        ];

        return {
          name,
          revenue,
          percentage,
          count: method?.count || 0,
          start,
          end: cumulative,
          color: colors[index % colors.length],
        };

      }
    );

    const donutBackground =
      segments
        .map(
          (segment) =>
            `${segment.color} ${segment.start}% ${segment.end}%`
        )
        .join(", ");

    return (
      <div className="tp-payment-method-distribution">

        {/* ============================
            DONUT
        ============================= */}

        <div className="tp-payment-method-donut-wrapper">

          <div
            className="tp-payment-method-donut"
            style={{
              background: `conic-gradient(${donutBackground})`,
            }}
          >

            <div className="tp-payment-method-donut__center">

              <strong>
                {formatCurrency(totalRevenue)}
              </strong>

              <span>
                Total Revenue
              </span>

            </div>

          </div>

        </div>


        {/* ============================
            LEGEND
        ============================= */}

        <div className="tp-payment-method-legend">

          {segments.map(
            (segment, index) => (

              <div
                className="tp-payment-method-legend__item"
                key={`${segment.name}-${index}`}
              >

                <div className="tp-payment-method-legend__left">

                  <span
                    className="tp-payment-method-legend__dot"
                    style={{
                      background:
                        segment.color,
                    }}
                  />

                  <span className="tp-payment-method-legend__name">
                    {segment.name}
                  </span>

                </div>


                <div className="tp-payment-method-legend__right">

                  <strong>
                    {Math.round(
                      segment.percentage
                    )}
                    %
                  </strong>

                  <span>
                    {formatCurrency(
                      segment.revenue
                    )}
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </div>
    );

  })() : (

    <div className="tp-payment-analytics__empty">
      No payment method data available.
    </div>

  )}

</div>
        </div>


{/* ==================================================
    REVENUE TREND
================================================== */}

<div className="tp-payment-analytics__card">

  <div className="tp-payment-analytics__card-header">

    <div>

      <h4>
        Revenue Trend
      </h4>

      <p>
        Revenue generated over time
      </p>

    </div>

    <BarChart3
      size={18}
      strokeWidth={2}
    />

  </div>


  {revenueTrend.length > 0 ? (() => {

    const chartData = revenueTrend.map(
      (item, index) => {

       const rawDate =
  item?.date ||
  item?.label ||
  item?._id;

const label = rawDate
  ? new Date(`${rawDate}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
      }
    )
  : `Day ${index + 1}`;

        const revenue =
          Number(
            item?.revenue ||
            item?.amount ||
            item?.total ||
            0
          );

        return {
          label,
          revenue,
        };

      }
    );


 const maxRevenue = Math.max(
  ...chartData.map(
    (item) => item.revenue
  ),
  1
);

const chartWidth = 620;
const chartHeight = 250;

const paddingLeft = 52;
const paddingRight = 18;
const paddingTop = 18;
const paddingBottom = 38;

const graphWidth =
  chartWidth -
  paddingLeft -
  paddingRight;

const graphHeight =
  chartHeight -
  paddingTop -
  paddingBottom;

const chartMax = 2000;

const getX = (index) => {

  if (chartData.length <= 1) {
    return (
      paddingLeft +
      graphWidth / 2
    );
  }

  return (
    paddingLeft +
    (index /
      (chartData.length - 1)) *
      graphWidth
  );
};

const getY = (revenue) => {

  return (
    paddingTop +
    graphHeight -
    (revenue / chartMax) *
      graphHeight
  );
};

const points = chartData.map(
  (item, index) => ({
    x: getX(index),
    y: getY(item.revenue),
    revenue: item.revenue,
    label: item.label,
  })
);


/* Smooth curve */

const createSmoothPath = (points) => {

  if (!points.length) {
    return "";
  }

  if (points.length === 1) {
    return `
      M
      ${points[0].x}
      ${points[0].y}
    `;
  }

  let path = `
    M
    ${points[0].x}
    ${points[0].y}
  `;

  for (
    let i = 0;
    i < points.length - 1;
    i++
  ) {

    const current = points[i];
    const next = points[i + 1];

    const controlX =
      (current.x + next.x) / 2;

    path += `
      C
      ${controlX}
      ${current.y},
      ${controlX}
      ${next.y},
      ${next.x}
      ${next.y}
    `;
  }

  return path;
};

const linePath =
  createSmoothPath(points);

const areaPath = `
  ${linePath}

  L
  ${points[points.length - 1]?.x || paddingLeft}
  ${chartHeight - paddingBottom}

  L
  ${points[0]?.x || paddingLeft}
  ${chartHeight - paddingBottom}

  Z
`;

const ySteps = 4;

const yAxisValues =
  Array.from(
    {
      length: ySteps + 1,
    },
    (_, index) =>
      chartMax -
      (chartMax / ySteps) *
        index
  );


    return (

      <div className="tp-payment-revenue-chart">

        {/* ============================================
            CHART
        ============================================ */}

        <div className="tp-payment-revenue-chart__canvas">

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            className="tp-payment-revenue-svg"
            role="img"
            aria-label="Revenue trend chart"
          >

            {/* ========================================
                GRID
            ======================================== */}

            <g className="tp-payment-revenue-grid">

  {yAxisValues.map(
    (value, index) => {

      const y = getY(value);

      return (
        <g
          key={`grid-${index}`}
        >

          {/* Horizontal Grid Line */}

          <line
            x1={paddingLeft}
            x2={
              chartWidth -
              paddingRight
            }
            y1={y}
            y2={y}
          />

          {/* Y Axis Revenue Label */}

          <text
            x={paddingLeft - 10}
            y={y + 3}
            textAnchor="end"
            className="tp-payment-revenue-y-label"
          >
            {value >= 1000
              ? `₹${Math.round(
                  value / 1000
                )}K`
              : `₹${value}`}
          </text>

        </g>
      );
    }
  )}

</g>
            {/* ========================================
                AREA
            ======================================== */}

           <defs>

  <linearGradient
    id="tpPaymentRevenueAreaGradient"
    x1="0"
    y1="0"
    x2="0"
    y2="1"
  >

    <stop
      offset="0%"
      stopColor="#5b4cf6"
      stopOpacity="0.30"
    />

    <stop
      offset="100%"
      stopColor="#5b4cf6"
      stopOpacity="0.02"
    />

  </linearGradient>

</defs>


<path
  d={areaPath}
  className="tp-payment-revenue-area"
/>


<path
  d={linePath}
  className="tp-payment-revenue-line"
/>


            {/* ========================================
                POINTS
            ======================================== */}

           {points.map(
  (point, index) => (

    <g
      key={`${point.label}-${index}`}
      className="tp-payment-revenue-point"

      onMouseEnter={() =>
        setRevenueTooltip({
          x: point.x,
          y: point.y,
          label: point.label,
          revenue: point.revenue,
        })
      }

      onMouseLeave={() =>
        setRevenueTooltip(null)
      }
    >

      <circle
        cx={point.x}
        cy={point.y}
        r="13"
        className="tp-payment-revenue-point__hit"
      />

      <circle
        cx={point.x}
        cy={point.y}
        r="4"
        className="tp-payment-revenue-point__outer"
      />

      <circle
        cx={point.x}
        cy={point.y}
        r="2"
        className="tp-payment-revenue-point__inner"
      />

    </g>

  )
)}

          </svg>

          {revenueTooltip && (

  <div
    className="tp-payment-revenue-tooltip"
    style={{
      left: `${
        (revenueTooltip.x /
          chartWidth) *
        100
      }%`,

      top: `${
        (revenueTooltip.y /
          chartHeight) *
        100
      }%`,
    }}
  >

    <span>
      {revenueTooltip.label}
    </span>

    <strong>
      Revenue:{" "}
      {formatCurrency(
        revenueTooltip.revenue
      )}
    </strong>

  </div>

)}


          {/* ==========================================
              X AXIS LABELS
          ========================================== */}

          <div className="tp-payment-revenue-labels">

            {chartData.map(
              (item, index) => (

                <span
                  key={`${item.label}-${index}`}
                  className="tp-payment-revenue-label"
                  title={item.label}
                >
                  {item.label}
                </span>

              )
            )}

          </div>

        </div>


        {/* ============================================
            CURRENT / TOTAL REVENUE
        ============================================ */}

        <div className="tp-payment-revenue-summary">

          <span>
            Total Revenue
          </span>

          <strong>
            {formatCurrency(
              chartData.reduce(
                (sum, item) =>
                  sum + item.revenue,
                0
              )
            )}
          </strong>

        </div>

      </div>

    );

  })() : (

    <div className="tp-payment-analytics__empty tp-payment-analytics__empty--chart">

      No revenue trend data available.

    </div>

  )}

</div>
       {/* ==================================================
    REVENUE BY TOP STATIONS
================================================== */}

<div className="tp-payment-analytics__card">

  <div className="tp-payment-analytics__card-header">

    <div>

      <h4>
        Revenue by Top Stations
      </h4>

      <p>
        Revenue generated by station
      </p>

    </div>

    <BarChart3
      size={18}
      strokeWidth={2}
    />

  </div>


  <div className="tp-payment-station-list">

    {topStations.length > 0 ? (

      topStations.map((station, index) => {

        const stationName =
          station?._id ||
          station?.station ||
          station?.name ||
          "Unknown Station";

        const revenue =
          Number(
            station?.revenue ||
            station?.amount ||
            station?.total ||
            0
          );

        const maxRevenue =
          Math.max(
            ...topStations.map(
              (item) =>
                Number(
                  item?.revenue ||
                  item?.amount ||
                  item?.total ||
                  0
                )
            ),
            1
          );

        const percentage =
          (revenue / maxRevenue) * 100;

        return (

          <div
            className="tp-payment-station-item"
            key={`${stationName}-${index}`}
          >

            <div className="tp-payment-station-item__top">

              <div className="tp-payment-station-item__info">

                <span className="tp-payment-station-item__rank">
                  {index + 1}
                </span>

                <span className="tp-payment-station-item__name">
                  {stationName}
                </span>

              </div>

              <strong className="tp-payment-station-item__amount">
                {formatCurrency(revenue)}
              </strong>

            </div>


            <div className="tp-payment-station-item__bar">

              <span
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

          </div>

        );

      })

    ) : (

      <div className="tp-payment-analytics__empty">

        No station revenue data available.

      </div>

    )}

  </div>

</div>

</div>

    </section>
  );
};

export default PaymentAnalytics;