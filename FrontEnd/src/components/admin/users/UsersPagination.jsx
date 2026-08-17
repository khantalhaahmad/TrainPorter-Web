import React from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "./UsersPagination.css";


const UsersPagination = ({
  pagination = {},
  onPageChange,
}) => {

  const {
    total = 0,
    page = 1,
    limit = 5,
    totalPages = 0,
    hasNext = false,
    hasPrevious = false,
  } = pagination;


  // ========================================================
  // EMPTY
  // ========================================================

  if (!total) {
    return null;
  }


  // ========================================================
  // DISPLAY RANGE
  // ========================================================

  const start =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const end =
    Math.min(
      page * limit,
      total
    );


  // ========================================================
  // PAGE NUMBERS
  // ========================================================

  const getPageNumbers = () => {

    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }


    const pages = [];


    if (page <= 3) {

      pages.push(
        1,
        2,
        3,
        4,
        "...",
        totalPages
      );

      return pages;
    }


    if (page >= totalPages - 2) {

      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );

      return pages;
    }


    pages.push(
      1,
      "...",
      page - 1,
      page,
      page + 1,
      "...",
      totalPages
    );

    return pages;
  };


  const pageNumbers =
    getPageNumbers();


  // ========================================================
  // HANDLERS
  // ========================================================

  const handlePrevious = () => {

    if (!hasPrevious) {
      return;
    }

    onPageChange?.(
      page - 1
    );
  };


  const handleNext = () => {

    if (!hasNext) {
      return;
    }

    onPageChange?.(
      page + 1
    );
  };


  const handlePageClick = (
    pageNumber
  ) => {

    if (
      pageNumber === "..." ||
      pageNumber === page
    ) {
      return;
    }

    onPageChange?.(
      pageNumber
    );
  };


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <div className="tp-users-pagination">

      {/* ==================================================
          RESULTS INFO
      ================================================== */}

      <div className="tp-users-pagination__info">

        Showing{" "}
        <strong>
          {start}
        </strong>
        {" "}to{" "}
        <strong>
          {end}
        </strong>
        {" "}of{" "}
        <strong>
          {total.toLocaleString(
            "en-IN"
          )}
        </strong>
        {" "}users

      </div>


      {/* ==================================================
          CONTROLS
      ================================================== */}

      <div className="tp-users-pagination__controls">

        {/* Previous */}

        <button
          type="button"
          className="tp-users-pagination__arrow"
          disabled={!hasPrevious}
          onClick={
            handlePrevious
          }
          aria-label="Previous page"
        >

          <ChevronLeft
            size={16}
          />

          <span>
            Previous
          </span>

        </button>


        {/* Page numbers */}

        <div className="tp-users-pagination__pages">

          {pageNumbers.map(
            (pageNumber, index) => {

              if (
                pageNumber === "..."
              ) {

                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="tp-users-pagination__ellipsis"
                  >
                    ...
                  </span>
                );
              }


              return (
                <button
                  key={pageNumber}
                  type="button"
                  className={`tp-users-pagination__page ${
                    pageNumber === page
                      ? "tp-users-pagination__page--active"
                      : ""
                  }`}
                  onClick={() =>
                    handlePageClick(
                      pageNumber
                    )
                  }
                  aria-current={
                    pageNumber === page
                      ? "page"
                      : undefined
                  }
                >
                  {pageNumber}
                </button>
              );
            }
          )}

        </div>


        {/* Next */}

        <button
          type="button"
          className="tp-users-pagination__arrow"
          disabled={!hasNext}
          onClick={
            handleNext
          }
          aria-label="Next page"
        >

          <span>
            Next
          </span>

          <ChevronRight
            size={16}
          />

        </button>

      </div>

    </div>
  );
};


export default UsersPagination;