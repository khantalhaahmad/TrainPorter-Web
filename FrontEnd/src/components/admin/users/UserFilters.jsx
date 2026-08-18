import React from "react";

import {
  Search,
  ChevronDown,
  CalendarDays,
  X,
  RotateCcw,
} from "lucide-react";

import "./UserFilters.css";


const UserFilters = ({
  filters = {},
  onSearchChange,
  onFilterChange,
  onClearFilters,
  onDateChange,
}) => {

  const {
    search = "",
    status = "all",
    membership = "all",
    verification = "all",
    from = "",
    to = "",
  } = filters;


  const hasActiveFilters =
    search.trim() !== "" ||
    status !== "all" ||
    membership !== "all" ||
    verification !== "all" ||
    from !== "" ||
    to !== "";


  const formatDateRange = () => {

    if (from && to) {
      return `${from} - ${to}`;
    }

    if (from) {
      return `From ${from}`;
    }

    if (to) {
      return `Until ${to}`;
    }

    return "Date Range";
  };


  const handleDateChange = (
    field,
    value
  ) => {

    onDateChange?.({
      from:
        field === "from"
          ? value
          : from,

      to:
        field === "to"
          ? value
          : to,
    });

  };


  return (
    <section className="tp-users-filters">

      {/* ==================================================
          SEARCH
      ================================================== */}

      <div className="tp-users-search">

        <Search
          size={17}
          className="tp-users-search__icon"
        />

        <input
          type="text"
          value={search}
          placeholder="Search by name, phone number or user ID..."
          onChange={(event) =>
            onSearchChange?.(
              event.target.value
            )
          }
          aria-label="Search users"
        />

        {search && (
          <button
            type="button"
            className="tp-users-search__clear"
            onClick={() =>
              onSearchChange?.("")
            }
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}

      </div>


      {/* ==================================================
          STATUS
      ================================================== */}

      <div className="tp-users-select-wrapper">

        <select
          value={status}
          onChange={(event) =>
            onFilterChange?.(
              "status",
              event.target.value
            )
          }
          aria-label="Filter by status"
        >
          <option value="all">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>

          <option value="blocked">
            Blocked
          </option>
        </select>

        <ChevronDown
          size={15}
          className="tp-users-select-icon"
        />

      </div>


      {/* ==================================================
          MEMBERSHIP
      ================================================== */}

      <div className="tp-users-select-wrapper">

        <select
          value={membership}
          onChange={(event) =>
            onFilterChange?.(
              "membership",
              event.target.value
            )
          }
          aria-label="Filter by membership"
        >
          <option value="all">
            All Memberships
          </option>

          <option value="Bronze">
            Bronze
          </option>

          <option value="Silver">
            Silver
          </option>

          <option value="Gold">
            Gold
          </option>

          <option value="Platinum">
            Platinum
          </option>
        </select>

        <ChevronDown
          size={15}
          className="tp-users-select-icon"
        />

      </div>


      {/* ==================================================
          VERIFICATION
      ================================================== */}

      <div className="tp-users-select-wrapper">

        <select
          value={verification}
          onChange={(event) =>
            onFilterChange?.(
              "verification",
              event.target.value
            )
          }
          aria-label="Filter by verification"
        >
          <option value="all">
            All Verification
          </option>

          <option value="verified">
            Verified
          </option>

          <option value="unverified">
            Unverified
          </option>
        </select>

        <ChevronDown
          size={15}
          className="tp-users-select-icon"
        />

      </div>


      {/* ==================================================
          DATE RANGE
      ================================================== */}

      <div className="tp-users-filter-date">

        <div className="tp-users-filter-date__header">

          <CalendarDays
            size={15}
          />

          <span>
            {formatDateRange()}
          </span>

        </div>


        <div className="tp-users-filter-date__inputs">

          <input
            type="date"
            value={from}
            onChange={(event) =>
              handleDateChange(
                "from",
                event.target.value
              )
            }
            aria-label="Start date"
          />

          <span>
            to
          </span>

          <input
            type="date"
            value={to}
            min={from || undefined}
            onChange={(event) =>
              handleDateChange(
                "to",
                event.target.value
              )
            }
            aria-label="End date"
          />

        </div>

      </div>


      {/* ==================================================
          CLEAR FILTERS
      ================================================== */}

      <button
  type="button"
  className="tp-users-clear-filters"
  onClick={onClearFilters}
  disabled={!hasActiveFilters}
>
  <RotateCcw size={15} />

  <span>
    Clear Filters
  </span>
</button>
    </section>
  );
};

export default UserFilters;