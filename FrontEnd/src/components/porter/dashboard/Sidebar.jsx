import "./Sidebar.css";
import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  User,
  Headphones,
  LogOut,
  Train,
  ArrowRight,
} from "lucide-react";

const Sidebar = ({ application }) => {

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Application Approved";

      case "under_review":
        return "Under Review";

      case "rejected":
        return "Application Rejected";

      case "pending":
      default:
        return "Pending Review";
    }
  };

  return (
    <aside className="tpad-sidebar">

      <div className="tpad-sidebar-logo">

        <div className="tpad-sidebar-logo-icon">
          <Train size={28} />
        </div>

        <div>
          <h2>TrainPorter</h2>
          <p>Application Portal</p>
        </div>

      </div>

      {/* Applicant Info */}

      <div
        style={{
          padding: "20px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >

        {application?.profilePhoto?.url ? (

          <img
            src={application.profilePhoto.url}
            alt={application.fullName}
            style={{
              width: 82,
              height: 82,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #ffffff22",
            }}
          />

        ) : (

          <div
            style={{
              width: 82,
              height: 82,
              borderRadius: "50%",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "700",
              background: "#1f2937",
              color: "#fff",
            }}
          >
            {application?.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>

        )}

        <h3
          style={{
            marginTop: 14,
            color: "#fff",
            fontSize: "18px",
          }}
        >
          {application?.fullName || "Applicant"}
        </h3>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "14px",
            marginTop: "4px",
          }}
        >
          {getStatusText(application?.status)}
        </p>

      </div>

      <nav className="tpad-sidebar-nav">

        <button className="tpad-sidebar-link tpad-sidebar-link-active">
          <LayoutDashboard size={20} />
          <span>Application Dashboard</span>
        </button>

        <button className="tpad-sidebar-link">
          <ClipboardCheck size={20} />
          <span>Application Status</span>
        </button>

        <button className="tpad-sidebar-link">
          <FileText size={20} />
          <span>My Documents</span>
        </button>

        <button className="tpad-sidebar-link">
          <User size={20} />
          <span>Profile Details</span>
        </button>

        <button className="tpad-sidebar-link">
          <Headphones size={20} />
          <span>Help & Support</span>
        </button>

      </nav>

      <div className="tpad-sidebar-guide">

        <h3>Become a Verified Porter</h3>

        <p>

          {application?.status === "approved"
            ? "Congratulations! Your porter account has been approved."
            : application?.status === "rejected"
            ? "Your application was rejected. Please check the remarks and update your application."
            : "Your application is currently under review. Complete verification to unlock your Porter Dashboard."}

        </p>

        <button className="tpad-sidebar-guide-btn">

          Learn More

          <ArrowRight size={18} />

        </button>

      </div>

      <button className="tpad-sidebar-logout">

        <LogOut size={20} />

        Logout

      </button>

    </aside>
  );
};

export default Sidebar;