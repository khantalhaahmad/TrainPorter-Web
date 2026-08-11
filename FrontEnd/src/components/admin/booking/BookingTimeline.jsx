import React from "react";

const BookingTimeline = ({
  booking,
}) => {

  if (!booking) {

    return null;

  }

  const steps = [

    "assigned",

    "accepted",

    "arrived",

    "in_progress",

    "completed",

  ];

  const currentIndex =
    steps.indexOf(
      booking.status
    );

  return (

    <div className="tp-booking-detail-card">

      <div className="tp-booking-card-header">

        <h3>

          Booking Timeline

        </h3>

      </div>

      <div className="tp-booking-timeline">

        {steps.map(
          (
            step,
            index
          ) => {

            const active =
              index <= currentIndex;

            return (

              <div
                key={step}
                className="tp-booking-step"
              >

                <div
                  className={`tp-booking-step-circle ${
                    active
                      ? "active"
                      : ""
                  }`}
                >

                  {index + 1}

                </div>

                <span>

                  {step

                    .replaceAll(
                      "_",
                      " "
                    )

                    .replace(
                      /\b\w/g,

                      (char) =>
                        char.toUpperCase()
                    )}

                </span>

              </div>

            );

          }
        )}

      </div>

    </div>

  );

};

export default BookingTimeline;