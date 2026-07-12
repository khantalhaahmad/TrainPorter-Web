import "./InfoBanner.css";
import {
  Info,
  ShieldCheck,
  BellRing,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const InfoBanner = ({ application }) => {

  const status = application?.status;

  const getStatusTitle = () => {
    switch (status) {
      case "approved":
        return "Congratulations! Your application has been approved.";

      case "rejected":
        return "Your application requires attention.";

      case "under_review":
        return "Your application is currently under review.";

      case "pending":
      default:
        return "Your application is under verification.";
    }
  };

  const getNextStep = () => {
    switch (status) {
      case "approved":
        return "Your Porter Dashboard will be available after your next login.";

      case "rejected":
        return "Please review the rejection reason and update your application before resubmitting.";

      default:
        return "Once approved, your Porter Dashboard will automatically become available after your next login.";
    }
  };

  return (
    <section className="tpad-info-banner">

      <div className="tpad-info-header">

        <div className="tpad-info-header-icon">
          <Info size={28} />
        </div>

        <div>

          <h2>Important Information</h2>

          <p>

            {getStatusTitle()}

          </p>

        </div>

      </div>

      <div className="tpad-info-list">

        {/* Document Verification */}

        <div className="tpad-info-item">

          <ShieldCheck size={22} />

          <div>

            <h4>Document Verification</h4>

            <p>

              {application?.isDocumentVerified
                ? "Your submitted documents have been verified successfully."
                : "Our verification team is currently reviewing your submitted documents."}

            </p>

          </div>

        </div>

        {/* Verification Time */}

        <div className="tpad-info-item">

          <Clock3 size={22} />

          <div>

            <h4>Verification Status</h4>

            <p>

              {status === "approved"
                ? "Verification completed successfully."
                : status === "rejected"
                ? "Verification has been completed. Please review the remarks below."
                : "Verification generally takes 2–3 business days depending on the number of applications."}

            </p>

          </div>

        </div>

        {/* Admin Remarks */}

        <div className="tpad-info-item">

          <BellRing size={22} />

          <div>

            <h4>Admin Remarks</h4>

            <p>

              {application?.adminRemarks
                ? application.adminRemarks
                : "No remarks from the verification team yet."}

            </p>

          </div>

        </div>

        {/* Next Step / Rejection */}

        <div className="tpad-info-item">

          <CheckCircle2 size={22} />

          <div>

            <h4>

              {status === "rejected"
                ? "Rejection Reason"
                : "Next Step"}

            </h4>

            <p>

              {status === "rejected"
                ? application?.rejectionReason ||
                  "No rejection reason provided."
                : getNextStep()}

            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default InfoBanner;