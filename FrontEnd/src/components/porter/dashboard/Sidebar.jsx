import reviewIllustration from "../../../assets/porter-review.png";
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
  return (
    <aside className="tpad-sidebar">
      {/* Logo */}

      <div className="tpad-sidebar-logo">
        <div className="tpad-sidebar-logo-icon">
          <Train size={28} />
        </div>

        <div>
          <h2>TrainPorter</h2>
          <p>Application Portal</p>
        </div>
      </div>

      {/* Navigation */}

      <nav className="tpad-sidebar-nav">
        <button className="tpad-sidebar-link tpad-sidebar-link-active">
          <LayoutDashboard size={18} />
          <span>Application Dashboard</span>
        </button>

        <button className="tpad-sidebar-link">
          <ClipboardCheck size={18} />
          <span>Application Status</span>
        </button>

        <button className="tpad-sidebar-link">
          <FileText size={18} />
          <span>My Documents</span>
        </button>

        <button className="tpad-sidebar-link">
          <User size={18} />
          <span>Profile Details</span>
        </button>

        <button className="tpad-sidebar-link">
          <Headphones size={18} />
          <span>Help & Support</span>
        </button>
      </nav>

      {/* Logout */}

      <button className="tpad-sidebar-logout">
        <LogOut size={18} />
        <span>Logout</span>
      </button>

      {/* Bottom Guide */}

     <div className="tpad-sidebar-guide">

  <div className="tpad-sidebar-guide-text">

    <h3>
      {application?.status === "approved"
        ? "Application Approved"
        : application?.status === "rejected"
        ? "Application Rejected"
        : "Application Review"}
    </h3>

    <p>
  {application?.status === "approved"
    ? "Your application has been approved successfully."
    : application?.status === "rejected"
    ? "Please update your application and submit it again."
    : "We're reviewing your application. You'll receive an update shortly."}
</p>

  </div>

  <div className="tpad-sidebar-guide-image">
    <img
      src={reviewIllustration}
      alt="Application Review"
    />
  </div>

</div>
   </aside>
  );
};

export default Sidebar;