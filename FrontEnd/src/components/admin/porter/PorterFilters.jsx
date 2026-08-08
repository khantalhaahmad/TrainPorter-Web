import React from "react";

const PorterFilters = ({
  applications = [],
  statusFilter = "all",
  setStatusFilter = () => {},
  sortBy = "newest",
  setSortBy = () => {},
}) => {

  const totalCount = applications.length;

  const pendingCount = applications.filter(
    (item) => item.status === "pending"
  ).length;

  const approvedCount = applications.filter(
    (item) => item.status === "approved"
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "rejected"
  ).length;

  return (

    <section className="tp-porter-filter-section">

      <div className="tp-porter-filter-card">

        <div className="tp-porter-filter-bar">

          {/* =========================
                Left
          ========================= */}

          <div className="tp-porter-filter-left">

            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`tp-porter-filter-chip ${
                statusFilter === "all"
                  ? "tp-porter-filter-chip-active"
                  : ""
              }`}
            >
              All ({totalCount})
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("pending")}
              className={`tp-porter-filter-chip ${
                statusFilter === "pending"
                  ? "tp-porter-filter-chip-active"
                  : ""
              }`}
            >
              Pending ({pendingCount})
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("approved")}
              className={`tp-porter-filter-chip ${
                statusFilter === "approved"
                  ? "tp-porter-filter-chip-active"
                  : ""
              }`}
            >
              Approved ({approvedCount})
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("rejected")}
              className={`tp-porter-filter-chip ${
                statusFilter === "rejected"
                  ? "tp-porter-filter-chip-active"
                  : ""
              }`}
            >
              Rejected ({rejectedCount})
            </button>

          </div>

          {/* =========================
                Right
          ========================= */}

          <div className="tp-porter-filter-right">

            <select
              className="tp-porter-sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >

              <option value="newest">
                Sort By: Newest First
              </option>

              <option value="oldest">
                Sort By: Oldest First
              </option>

              <option value="name">
                Sort By: Name (A-Z)
              </option>

              <option value="experience">
                Sort By: Experience
              </option>

            </select>

          </div>

        </div>

      </div>

    </section>

  );

};

export default PorterFilters;