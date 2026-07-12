import "./Header.css";
import { Bell, Clock3 } from "lucide-react";

const Header = ({ application }) => {

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusText = (status) => {
    switch (status) {
      case "approved":
        return "Application Approved";

      case "rejected":
        return "Application Rejected";

      case "pending":
      default:
        return "Pending Review";
    }
  };

  const getInitial = (name) => {
    if (!name) return "U";

    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="tpad-header">

      <div className="tpad-header-left">

        <h1 className="tpad-header-title">
          Hello, {application?.fullName || "User"} 👋
        </h1>

        <p className="tpad-header-subtitle">
          Track your porter application and verification status.
        </p>

      </div>

      <div className="tpad-header-right">

        <div className="tpad-header-status">

          <span className="tpad-header-status-dot"></span>

          {getStatusText(application?.status)}

        </div>

        <button className="tpad-header-bell">

          <Bell size={20} />

          <span className="tpad-header-notification">
            1
          </span>

        </button>

        <div className="tpad-header-user">

          <div className="tpad-header-avatar">

            {getInitial(application?.fullName)}

          </div>

          <div>

            <h4>
              {application?.fullName || "User"}
            </h4>

            <p>

              <Clock3 size={14} />

              Applied on {formatDate(application?.createdAt)}

            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;