import "./OverviewCards.css";
import verificationImage from "../../../assets/verification-card.png";
import {
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  Clock3,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

const OverviewCards = ({ application }) => {
const [copied, setCopied] = useState(false);
  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Approved";

      case "rejected":
        return "Rejected";

      case "under_review":
        return "Under Review";

      case "pending":
      default:
        return "Pending Review";
    }
  };
const copyApplicationId = async () => {

  const id = getApplicationId(application);

  await navigator.clipboard.writeText(id);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);

};
  const getStatusSubText = (status) => {
    switch (status) {
      case "approved":
        return "Application Approved";

      case "rejected":
        return "Application Rejected";

      case "under_review":
        return "Verification In Progress";

      case "pending":
      default:
        return "Under Verification";
    }
  };

  // ==========================
  // Application ID
  // ==========================

  const getApplicationId = (application) => {

    if (!application) return "N/A";

    // New Applications
    if (application.applicationId) {
      return application.applicationId;
    }

    // Old Applications (Fallback)

    const year = new Date(
      application.createdAt
    ).getFullYear();

    const suffix = application._id
      ?.slice(-6)
      ?.toUpperCase();

    return `TP-${year}-${suffix}`;
  };

  // ==========================
  // Date Format
  // ==========================

  const formatDateTime = (date) => {

    if (!date) return "--";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

  };

  return (
  <section className="tpad-overview">

    <div className="tpad-overview-card">

      {/* Column 1 */}
      <div className="tpad-overview-section">
        <div className="tpad-overview-section tpad-overview-id-section"></div>
<div className="tpad-overview-icon tpad-overview-blue tpad-overview-id-icon">
    <ClipboardList size={18} />
</div>

       <div className="tpad-overview-content">

  <p className="tpad-overview-label tpad-overview-id-label">
    Application ID
  </p>

 <div className="tpad-overview-id-row">

  <h2>
    {getApplicationId(application)}
  </h2>

<button
  className="tpad-copy-btn"
  onClick={copyApplicationId}
  aria-label="Copy Application ID"
>

  {copied ? (
    <Check size={16} />
  ) : (
    <Copy size={16} />
  )}

  <span className="tpad-copy-tooltip">
    {copied ? "Copied!" : "Copy"}
  </span>

</button>

</div>
  <div className="tpad-overview-date">

    <span>Submitted On</span>

    <small>
      {formatDateTime(application?.createdAt)}
    </small>

  </div>

</div>

      </div>

     <div className="tpad-overview-divider tpad-overview-status-divider"></div>

      {/* Column 2 */}

      <div className="tpad-overview-section tpad-overview-status-section">

 

  <div className="tpad-overview-content">

 <p className="tpad-overview-label tpad-overview-status-label">
  Current Status
</p>

<div className={`tpad-overview-status-title ${application?.status}`}>

  <Clock3 size={22} />

  <h2>{getStatusText(application?.status)}</h2>

</div>

    <p className="tpad-overview-description">

      {application?.status === "approved"
        ? "Your application has been approved successfully."
        : application?.status === "rejected"
        ? "Your application needs updates before resubmission."
        : application?.status === "under_review"
        ? "Your application is currently under review by our admin team."
        : "Your application is under review by our admin team."}

    </p>

  </div>

</div>

<div className="tpad-overview-divider tpad-overview-status-divider"></div>
      {/* Column 3 */}

      <div className="tpad-overview-section tpad-overview-verification-section">

  

  <div className="tpad-overview-content">

  <p className="tpad-overview-label tpad-overview-verification-label">
    Expected Verification
  </p>

  <div className="tpad-overview-verification-row">

    <div className="tpad-overview-icon tpad-overview-green">
      <CalendarClock size={20} />
    </div>

    <h2>
      2 - 3 Days
    </h2>

  </div>

  <p className="tpad-overview-description">
    We will notify you once there is any update.
  </p>

</div>

</div>
      {/* Column 4 */}

      <div className="tpad-overview-illustration">
<img
  src={verificationImage}
  alt="Verification"
/>

      </div>

    </div>

  </section>
);
};

export default OverviewCards;