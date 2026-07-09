import React from "react";
import "./ProgressSteps.css";

const progressSteps = [
  "Personal",
  "Address",
  "Railway",
  "Identity",
  "Bank",
  "Emergency",
  "Documents",
];

const ProgressSteps = ({
  currentStep = 1,
  totalSteps = 7,
}) => {

  const progressPercentage =
    ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (

    <section className="bp-progress-section">

      <div className="bp-progress-card">

        {/* ================= HEADER ================= */}

        <div className="bp-progress-header">

          <div className="bp-progress-header-left">

            <h2 className="bp-progress-title">
              Porter Registration Progress
            </h2>

            <p className="bp-progress-description">
              Complete each step to become a verified TrainPorter Partner.
            </p>

          </div>

          <div className="bp-progress-counter">

            <span className="bp-progress-counter-current">
              {currentStep}
            </span>

            <span className="bp-progress-counter-divider">
              /
            </span>

            <span className="bp-progress-counter-total">
              {totalSteps}
            </span>

          </div>

        </div>

        {/* ================= PROGRESS BAR ================= */}

        <div className="bp-progress-bar-wrapper">

          <div className="bp-progress-bar-track">

            <div
              className="bp-progress-bar-fill"
              style={{
                width: `${progressPercentage}%`,
              }}
            />

          </div>

        </div>

        {/* ================= STEP LIST ================= */}

        <div className="bp-progress-step-list">

          {progressSteps.map((stepTitle, index) => {

            const stepNumber = index + 1;

            const isCompleted =
              stepNumber < currentStep;

            const isActive =
              stepNumber === currentStep;

            return (

              <div
                key={stepNumber}
                className={`

                  bp-progress-step-item

                  ${
                    isCompleted
                      ? "bp-progress-step-completed"
                      : ""
                  }

                  ${
                    isActive
                      ? "bp-progress-step-active"
                      : ""
                  }

                `}
              >

                <div className="bp-progress-step-circle">

                  {isCompleted ? "✓" : stepNumber}

                </div>

                <p className="bp-progress-step-label">

                  {stepTitle}

                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>

  );

};

export default ProgressSteps;