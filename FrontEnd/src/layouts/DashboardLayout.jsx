import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';
import { useAuth } from '../context/AuthContext';
const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
const [showLogoutModal, setShowLogoutModal] = useState(false);
const [isLoggingOut, setIsLoggingOut] = useState(false);
const handleLogout = async () => {

    setIsLoggingOut(true);

    await new Promise(resolve =>
        setTimeout(resolve, 2000)
    );

    logout();

    setShowLogoutModal(false);

    navigate('/');
};

    return (
        <div className="dashboard-layout">
            {/* Dashboard Header */}
            <header className="dashboard-header">
  <div className="container header-container">

    {/* Logo */}
    <Link to="/dashboard" className="header-logo">
      <span className="logo-icon">🚂</span>
      <div>
        <span className="logo-text">TrainPorter</span>
        <small className="logo-tagline">Smart Luggage Assistance</small>
      </div>
    </Link>

    {/* Search Bar */}
    <div className="header-search">
      <input
        type="text"
        placeholder="Search PNR, Station..."
      />
      <span>🔍</span>
    </div>

    {/* Current Station */}
    <div className="header-station">
      <span className="station-icon">📍</span>

      <div className="station-info">
        <span className="station-label">
          Current Station
        </span>

        <span className="station-name">
          New Delhi (NDLS)
        </span>
      </div>
    </div>

    {/* Actions */}
    <div className="header-actions">

      <button className="wallet-btn">
        💰 ₹120
      </button>

      <button
        className="icon-btn"
        title="Notifications"
      >
        <span className="icon">🔔</span>
        <span className="notification-dot"></span>
      </button>

      <div className="profile-dropdown-wrapper">

        <div
          className="user-profile"
          onClick={() =>
            setShowProfileMenu(!showProfileMenu)
          }
        >
          <div className="user-avatar">
            TA
          </div>

          <div className="user-info">
            <strong>Talha Ahmad</strong>
            <span>Premium Member</span>
          </div>
        </div>

        {showProfileMenu && (
          <div className="profile-dropdown">

            <button
              className="dropdown-item"
              onClick={() =>
                navigate('/profile')
              }
            >
              👤 My Profile
            </button>

            <button
              className="dropdown-item"
              onClick={() =>
                navigate('/history')
              }
            >
              📜 Booking History
            </button>

            <button
              className="dropdown-item"
              onClick={() =>
                navigate('/support')
              }
            >
              🎧 Help & Support
            </button>

            <button
              className="dropdown-item logout-item"
              onClick={() => {
                setShowProfileMenu(false);
                setShowLogoutModal(true);
              }}
            >
              🚪 Logout
            </button>

          </div>
        )}

      </div>
    </div>

  </div>
</header>

            {/* Main Content */}
            <main className="dashboard-main">
                <div className="container">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="mobile-nav">
                <Link to="/dashboard" className="mobile-nav-item active">
                    <span className="nav-icon">🏠</span>
                    <span>Home</span>
                </Link>
                <Link to="/book" className="mobile-nav-item">
                    <span className="nav-icon">➕</span>
                    <span>Book</span>
                </Link>
                <Link to="/history" className="mobile-nav-item">
                    <span className="nav-icon">🕒</span>
                    <span>History</span>
                </Link>
                <Link to="/profile" className="mobile-nav-item">
                    <span className="nav-icon">👤</span>
                    <span>Profile</span>
                </Link>
            </nav>
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
                    onClick={() => setShowLogoutModal(false)}
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
        </div>
    );
};

export default DashboardLayout;
