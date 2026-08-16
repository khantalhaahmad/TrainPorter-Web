import React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "../../../styles/admin/payments/PaymentPagination.css";

const PaymentPagination = ({
  pagination = {},
  onPageChange,
}) => {
  const {
    page = 1,
    totalPages = 1,
    total = 0,
    limit = 10,
    hasNext = false,
    hasPrevious = false,
  } = pagination;

  // ========================================================
  // Calculate Visible Range
  // ========================================================

  const start =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const end =
    total === 0
      ? 0
      : Math.min(
          page * limit,
          total
        );

  // ========================================================
  // Page Change
  // ========================================================

  const handlePageChange = (newPage) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      newPage === page
    ) {
      return;
    }

    onPageChange?.(newPage);
  };

  // ========================================================
  // No Pagination
  // ========================================================

  if (total === 0) {
    return null;
  }

  return (
    <div className="tp-payment-pagination">

      {/* ==================================================
          Result Information
      ================================================== */}

      <div className="tp-payment-pagination__info">

        Showing{" "}

        <strong>
          {start}
        </strong>

        {" "}–{" "}

        <strong>
          {end}
        </strong>

        {" "}of{" "}

        <strong>
          {total}
        </strong>

        {" "}payments

      </div>


      {/* ==================================================
          Controls
      ================================================== */}

      <div className="tp-payment-pagination__controls">

        <button
          type="button"
          className="tp-payment-pagination__button"
          disabled={!hasPrevious}
          onClick={() =>
            handlePageChange(page - 1)
          }
          aria-label="Previous page"
        >
          <ChevronLeft
            size={16}
            strokeWidth={2}
          />

          <span>
            Previous
          </span>
        </button>


        {/* ================================================
            Page Indicator
        ================================================ */}

        <div className="tp-payment-pagination__page">

          <span>
            Page
          </span>

          <strong>
            {page}
          </strong>

          <span>
            of
          </span>

          <strong>
            {totalPages}
          </strong>

        </div>


        <button
          type="button"
          className="tp-payment-pagination__button"
          disabled={!hasNext}
          onClick={() =>
            handlePageChange(page + 1)
          }
          aria-label="Next page"
        >
          <span>
            Next
          </span>

          <ChevronRight
            size={16}
            strokeWidth={2}
          />

        </button>

      </div>

    </div>
  );
};

export default PaymentPagination;