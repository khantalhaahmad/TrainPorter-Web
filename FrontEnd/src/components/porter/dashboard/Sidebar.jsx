import reviewIllustration from "../../../assets/porter-review.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

import "./Sidebar.css";

import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  User,
  Headphones,
  LogOut,
  Train,
} from "lucide-react";

const Sidebar = ({ application }) => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    logout();

    setShowLogoutModal(false);

    navigate("/");
  };

  return (
    <>
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

        <button
          className="tpad-sidebar-logout"
          onClick={() => setShowLogoutModal(true)}
        >
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

      {/* Logout Modal */}

      {showLogoutModal && (
        <div
          className="logout-modal-overlay"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="logout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="logout-icon">
              🚂
            </div>

            <h3>Logout Confirmation</h3>

            <p>
              Are you sure you want to logout from TrainPorter?
            </p>

            <div className="logout-actions">
              <button
                className="cancel-btn"
                onClick={() =>
                  setShowLogoutModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-btn"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <span className="spinner-ui"></span>
                    Logging Out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;