import React from "react";

const PorterFilters = () => {
  return (

    <section className="tp-porter-filter-wrapper">

      <div className="tp-porter-filter-card">

        <div className="tp-porter-filter-bar">

          {/* =========================
              Left
          ========================= */}

          <div className="tp-porter-filter-left">

            <button
              className="tp-porter-filter-chip tp-porter-filter-chip-active"
            >
              All (9)
            </button>

            <button
              className="tp-porter-filter-chip"
            >
              Pending (7)
            </button>

            <button
              className="tp-porter-filter-chip"
            >
              Approved (2)
            </button>

            <button
              className="tp-porter-filter-chip"
            >
              Rejected (0)
            </button>

          </div>

          {/* =========================
              Right
          ========================= */}

          <div className="tp-porter-filter-right">

            <select
              className="tp-porter-sort"
            >

              <option>
                Sort By: Newest First
              </option>

              <option>
                Oldest First
              </option>

              <option>
                Name (A-Z)
              </option>

              <option>
                Experience
              </option>

            </select>

          </div>

        </div>

      </div>

    </section>

  );

};

export default PorterFilters;