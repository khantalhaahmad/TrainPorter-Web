import "./OverviewCards.css";
import {
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  Clock3,
} from "lucide-react";

const OverviewCards = ({ application }) => {

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

      {/* Card 1 */}

      <div className="tpad-overview-card">

        <div className="tpad-overview-icon tpad-overview-blue">

          <ClipboardList size={28} />

        </div>

        <div className="tpad-overview-content">

          <p className="tpad-overview-label">

            Application ID

          </p>

          <h2>

            {getApplicationId(application)}

          </h2>

          <span>

            Submitted On

          </span>

          <small
            style={{
              display: "block",
              marginTop: "6px",
              fontWeight: "600",
              color: "#475569",
            }}
          >

            {formatDateTime(application?.createdAt)}

          </small>

        </div>

      </div>

      {/* Card 2 */}

      <div className="tpad-overview-card">

        <div className="tpad-overview-icon tpad-overview-orange">

          <Clock3 size={28} />

        </div>

        <div className="tpad-overview-content">

          <p className="tpad-overview-label">

            Current Status

          </p>

          <h2>

            {getStatusText(application?.status)}

          </h2>

          <span className="tpad-overview-status">

            <BadgeCheck size={16} />

            {getStatusSubText(application?.status)}

          </span>

        </div>

      </div>

      {/* Card 3 */}

      <div className="tpad-overview-card">

        <div className="tpad-overview-icon tpad-overview-green">

          <CalendarClock size={28} />

        </div>

        <div className="tpad-overview-content">

          <p className="tpad-overview-label">

            Preferred Station

          </p>

          <h2>

            {application?.preferredStation || "--"}

          </h2>

          <span>

            {application?.stationCode || "Station Not Available"}

          </span>

        </div>

      </div>

    </section>

  );
};

export default OverviewCards;