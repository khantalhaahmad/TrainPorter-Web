import "./ProgressTimeline.css";
import { Check, Clock3 } from "lucide-react";

const ProgressTimeline = ({ application }) => {

  const isPending =
    application?.status === "pending";

  const isUnderReview =
    application?.status === "under_review";

  const isApproved =
    application?.status === "approved";

  const isRejected =
    application?.status === "rejected";

  return (
    <section className="tpad-progress-card">

      <div className="tpad-progress-header">

        <h2>Application Progress</h2>

        <p>
          Track every stage of your porter verification process.
        </p>

      </div>

      <div className="tpad-progress-timeline">

        {/* STEP 1 */}

        <div className="tpad-progress-item completed">

      <div className="tpad-progress-icon completed">
    <Check size={15} strokeWidth={3} />
</div>
          <div className="tpad-progress-content">

            <div className="tpad-progress-title">

              <h3>Application Submitted</h3>

              <span className="tpad-progress-badge completed">
                Completed
              </span>

            </div>

            <p>
              Submitted on{" "}
              {new Date(
                application?.createdAt
              ).toLocaleDateString("en-IN")}
            </p>

          </div>

        </div>

        {/* STEP 2 */}

        <div
          className={`tpad-progress-item ${
            application?.isDocumentVerified
              ? "completed"
              : "active"
          }`}
        >
<div
  className={`tpad-progress-icon ${
    application?.isDocumentVerified
      ? "completed"
      : "active"
  }`}
>
  {application?.isDocumentVerified ? (
    <Check size={18} strokeWidth={3} />
  ) : (
    <Clock3 size={16} strokeWidth={2.5} />
  )}
</div>

          <div className="tpad-progress-content">

            <div className="tpad-progress-title">

              <h3>Documents Verification</h3>

              <span
                className={`tpad-progress-badge ${
                  application?.isDocumentVerified
                    ? "completed"
                    : "active"
                }`}
              >
                {application?.isDocumentVerified
                  ? "Completed"
                  : "In Progress"}
              </span>

            </div>

            <p>
              {application?.isDocumentVerified
                ? "Your submitted documents have been verified successfully."
                : "Our verification team is reviewing your uploaded documents."}
            </p>

          </div>

        </div>

        {/* STEP 3 */}

        <div
          className={`tpad-progress-item ${
            application?.isDocumentVerified
              ? "active"
              : ""
          }`}
        >
<div className="tpad-progress-icon pending"></div>

          <div className="tpad-progress-content">

            <div className="tpad-progress-title">

              <h3>Railway Verification</h3>

              <span className="tpad-progress-badge pending">

                Pending

              </span>

            </div>

           <p>
  Your details will be verified with railway records.
</p>
          </div>

        </div>

        {/* STEP 4 */}

        <div
          className={`tpad-progress-item ${
            isApproved
              ? "completed"
              : isPending || isUnderReview
              ? "active"
              : ""
          }`}
        >

      <div
  className={`tpad-progress-icon ${
    isApproved
      ? "completed"
      : "pending"
  }`}
>
  {isApproved && (
    <Check size={14} strokeWidth={3} />
  )}
</div>

          <div className="tpad-progress-content">

            <div className="tpad-progress-title">

              <h3>Admin Approval</h3>

              <span
                className={`tpad-progress-badge ${
                  isApproved
                    ? "completed"
                    : isRejected
                    ? "pending"
                    : "active"
                }`}
              >

                {isApproved
                  ? "Approved"
                  : isRejected
                  ? "Rejected"
                  : "Pending"}

              </span>

            </div>

           <p>
  {application?.adminRemarks
    ? application.adminRemarks
    : "Application will be reviewed by our admin team."}
</p>

          </div>

        </div>

        {/* STEP 5 */}

        <div
          className={`tpad-progress-item ${
            isApproved
              ? "completed"
              : ""
          }`}
        >

  <div
  className={`tpad-progress-icon ${
    isApproved
      ? "completed"
      : "pending"
  }`}
>
  {isApproved && (
    <Check size={14} strokeWidth={3} />
  )}
</div>

          <div className="tpad-progress-content">

            <div className="tpad-progress-title">

              <h3>Account Activated</h3>

              <span
                className={`tpad-progress-badge ${
                  isApproved
                    ? "completed"
                    : "pending"
                }`}
              >

                {isApproved
                  ? "Activated"
                  : "Pending"}

              </span>

            </div>

        <p>
  {isApproved
    ? "Your porter account has been activated."
    : "Your porter account will be activated after approval."}
</p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ProgressTimeline;