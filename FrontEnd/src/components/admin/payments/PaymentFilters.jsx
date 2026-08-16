import React from "react";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  CalendarDays,
} from "lucide-react";

import "../../../styles/admin/payments/PaymentFilters.css";

const PaymentFilters = ({
  filters = {},
  onChange,
  onClear,
}) => {

  const {
    search = "",
    status = "all",
    method = "all",
    bookingStatus = "all",
    from = "",
    to = "",
  } = filters;


  // ========================================================
  // Handle Input Change
  // ========================================================

  const handleChange = (field, value) => {

    onChange?.({
      ...filters,
      [field]: value,
    });

  };


  // ========================================================
  // Clear Filters
  // ========================================================

  const handleClear = () => {

    onClear?.();

  };


  return (
    <section className="tp-payment-filters">

      {/* ====================================================
          Header
      ==================================================== */}

      <div className="tp-payment-filters__header">

        <div className="tp-payment-filters__heading">

          <div className="tp-payment-filters__heading-icon">
            <SlidersHorizontal
              size={17}
              strokeWidth={2}
            />
          </div>

          <div>
            <h3>
              Payments
            </h3>

            <p>
              Search and filter payment transactions
            </p>
          </div>

        </div>


        <button
          type="button"
          className="tp-payment-filters__clear"
          onClick={handleClear}
        >
          <RotateCcw
            size={15}
            strokeWidth={2}
          />

          Clear Filters
        </button>

      </div>


      {/* ====================================================
          Filter Controls
      ==================================================== */}

      <div className="tp-payment-filters__controls">


        {/* ==================================================
            Search
        ================================================== */}

        <div className="tp-payment-filter tp-payment-filter--search">

          <Search
            className="tp-payment-filter__search-icon"
            size={18}
            strokeWidth={2}
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              handleChange(
                "search",
                event.target.value
              )
            }
            placeholder="Search booking, transaction, train or station..."
          />

        </div>


        {/* ==================================================
            Payment Status
        ================================================== */}

        <div className="tp-payment-filter">

          <label>
            Payment Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              handleChange(
                "status",
                event.target.value
              )
            }
          >

            <option value="all">
              All Payments
            </option>

            <option value="paid">
              Paid
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="failed">
              Failed
            </option>

            <option value="refunded">
              Refunded
            </option>

          </select>

        </div>


        {/* ==================================================
            Payment Method
        ================================================== */}

        <div className="tp-payment-filter">

          <label>
            Payment Method
          </label>

          <select
            value={method}
            onChange={(event) =>
              handleChange(
                "method",
                event.target.value
              )
            }
          >

            <option value="all">
              All Methods
            </option>

            <option value="UPI">
              UPI
            </option>

            <option value="CARD">
              Card
            </option>

            <option value="NET_BANKING">
              Net Banking
            </option>

            <option value="WALLET">
              Wallet
            </option>

            <option value="COD">
              Cash on Delivery
            </option>

          </select>

        </div>


        {/* ==================================================
            Booking Status
        ================================================== */}

       

        {/* ==================================================
            From Date
        ================================================== */}

        <div className="tp-payment-filter tp-payment-filter--date">

          <label>
            From
          </label>

          <div className="tp-payment-filter__date-wrapper">

            <CalendarDays
              size={16}
              strokeWidth={2}
            />

            <input
              type="date"
              value={from}
              onChange={(event) =>
                handleChange(
                  "from",
                  event.target.value
                )
              }
            />

          </div>

        </div>


        {/* ==================================================
            To Date
        ================================================== */}

        <div className="tp-payment-filter tp-payment-filter--date">

          <label>
            To
          </label>

          <div className="tp-payment-filter__date-wrapper">

            <CalendarDays
              size={16}
              strokeWidth={2}
            />

            <input
              type="date"
              value={to}
              onChange={(event) =>
                handleChange(
                  "to",
                  event.target.value
                )
              }
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default PaymentFilters;