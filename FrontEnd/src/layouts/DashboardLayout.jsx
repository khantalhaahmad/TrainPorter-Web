import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="dashboard-layout">
            {/* Dashboard Header */}
            <header className="dashboard-header">
                <div className="container header-container">
                    <Link to="/dashboard" className="header-logo">
                        <span className="logo-icon">🚂</span>
                        <span className="logo-text">TrainPorter</span>
                    </Link>

                    <div className="header-station">
                        <span className="station-icon">📍</span>
                        <div className="station-info">
                            <span className="station-label">Current Station</span>
                            <span className="station-name">New Delhi (NDLS)</span>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button className="icon-btn" title="Notifications">
                            <span className="icon">🔔</span>
                            <span className="notification-dot"></span>
                        </button>
                        <div className="user-profile" onClick={() => navigate('/profile')}>
                            <div className="user-avatar">AD</div>
                            <div className="user-info">
                                <strong>Ankit Das</strong>
                                <span>Premium Member</span>
                            </div>
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
        </div>
    );
};

export default DashboardLayout;
