import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import './DashboardPage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const DashboardPage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(() => {
  fetchDashboard();
}, []);

const fetchDashboard = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:8000/api/dashboard",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(
  "FULL DASHBOARD:",
  res.data.data
);

console.log(
  "ACTIVE BOOKING:",
  res.data.data.activeBooking
);
setDashboardData(
  res.data.data
);
     // 👇 YAHA ADD KARNA HAI
    console.log(
      "Dashboard API Response:",
      res.data.data
    );

    console.log(
      "Active Booking:",
      res.data.data.activeBooking
    );

    setDashboardData(
      res.data.data
    );

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

    const handleCancelBooking = async () => {
  try {

    const token =
      localStorage.getItem("token");

    await axios.put(
      `http://localhost:8000/api/bookings/cancel/${dashboardData.activeBooking._id}`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    );

    setShowCancelModal(false);

    await fetchDashboard(); // auto refresh

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Unable to cancel booking"
    );
  }
};

const [showCancelModal, setShowCancelModal] = useState(false);
const hasActiveBooking =
  !!dashboardData?.activeBooking;

  console.log(
  "hasActiveBooking:",
  hasActiveBooking
);

  const quickStats = [
  {
    label: 'Total Bookings',
    value: dashboardData?.totalBookings || 0,
    icon: '📦',
    color: 'blue'
  },
  {
    label: 'Money Saved',
    value: `₹${dashboardData?.moneySaved || 0}`,
    icon: '💰',
    color: 'green'
  },
  {
    label: 'Avg Rating',
    value: dashboardData?.avgRating || 0,
    icon: '⭐',
    color: 'gold'
  },
  {
    label: 'Success Rate',
    value: `${dashboardData?.successRate || 0}%`,
    icon: '🎯',
    color: 'purple'
  }
];

  return (
    <DashboardLayout>
      <div className="dashboard-page">

        {/* HERO SECTION */}
        <section className="dashboard-hero">
          <div className="hero-content">

            <div>
              <span className="hero-badge">
                👋 Good Evening, {dashboardData?.user?.name || "User"}
              </span>

              <h1>
               
              </h1>

             <div className="hero-train-info">

  <h2>
    {dashboardData?.activeBooking?.trainName || "No Active Booking"}
  </h2>

  {hasActiveBooking && (
    <div className="hero-details">

      <div className="hero-chip">
        <span></span>
        <div>
          <small>Coach </small>
          <strong>
            {dashboardData?.activeBooking?.coach}
          </strong>
        </div>
      </div>

      <div className="hero-chip">
        <span></span>
        <div>
          <small>Seat </small>
          <strong>
            {dashboardData?.activeBooking?.seatNumber}
          </strong>
        </div>
      </div>

    </div>
  )}

</div>
</div>
            <div className="hero-actions">
                {hasActiveBooking && (
  <div className="booking-warning">
    ⚠️ Complete or cancel your current booking before creating a new booking.
  </div>
)}
              <Button
                onClick={() => navigate('/assigned')}
              >
                Track Booking
              </Button>

              <Button
  variant="secondary"
  disabled={hasActiveBooking}
  onClick={() => {
    if (hasActiveBooking) {
      alert(
        'You already have an active porter booking. Complete or cancel it first.'
      );
      return;
    }

    navigate('/book');
  }}
>
  {hasActiveBooking
    ? 'Active Booking Exists'
    : 'Book New Porter'}
</Button>
            </div>

          </div>

          <div className="floating-train">
            🚂
          </div>
        </section>

        {/* STATS const ac*/}

        <section className="stats-grid">

          {quickStats.map((stat, index) => (
            <Card
              key={index}
              className="premium-stat-card"
            >
              <div className="stat-top">

                <div className="stat-icon">
                  {stat.icon}
                </div>

                <span className="growth-tag">
                  +12%
                </span>

              </div>

              <h2>{stat.value}</h2>

              <p>{stat.label}</p>

            </Card>
          ))}

        </section>

        {/* MAIN GRID */}

        <section className="dashboard-grid">

  {/* LEFT */}

<div className="left-section">

  {hasActiveBooking ? (
<Card className="active-booking-card">

  <div className="booking-header">

    <div>

      <Badge variant="primary">
        Active Booking
      </Badge>

      <h2 className="booking-title">
        {dashboardData?.activeBooking?.trainName}
      </h2>

    </div>

    <div className="booking-id-box">

      <small>
        Booking ID
      </small>

      <strong>
        #{dashboardData?.activeBooking?._id?.slice(-6)}
      </strong>

    </div>

  </div>

  <div className="booking-details-grid">

    <div className="detail-card">
      <div className="detail-icon">🚆</div>

      <div>

        <p>Train Number</p>

        <h4>
          {dashboardData?.activeBooking?.trainNumber}
        </h4>

      </div>

    </div>

    <div className="detail-card">

      <div className="detail-icon">
        📍
      </div>

      <div>

        <p>Station</p>

        <h4>
          {dashboardData?.activeBooking?.station}
        </h4>

      </div>

    </div>

    <div className="detail-card">

      <div className="detail-icon">
        🚪
      </div>

      <div>

        <p>Coach</p>

        <h4>
          {dashboardData?.activeBooking?.coach}
        </h4>

      </div>

    </div>

    <div className="detail-card">

      <div className="detail-icon">
        💺
      </div>

      <div>

        <p>Seat</p>

        <h4>
          {dashboardData?.activeBooking?.seatNumber}
        </h4>

      </div>

    </div>

    <div className="detail-card">

      <div className="detail-icon">
        🧳
      </div>

      <div>

        <p>Luggage</p>

        <h4>
          {dashboardData?.activeBooking?.luggageCount} Bags
        </h4>

      </div>

    </div>

    <div className="detail-card">

      <div className="detail-icon">
        💰
      </div>

      <div>

        <p>Amount</p>

        <h4>
          ₹{dashboardData?.activeBooking?.amount}
        </h4>

      </div>

    </div>

  </div>

  <div className="booking-status-card">

    <div className="porter-card">

      <div className="porter-avatar">
        👨‍✈️
      </div>

      <div className="porter-info">

        <h4>
          Porter Not Assigned
        </h4>

        <p>
          Waiting for porter assignment...
        </p>

        <small>
          You'll receive a notification once a porter accepts your booking.
        </small>

      </div>

      <Badge variant="warning">
        {dashboardData?.activeBooking?.status}
      </Badge>

    </div>

  </div>

  <div className="booking-actions">

    <Button
      className="track-btn"
      onClick={() => navigate('/assigned')}
    >
      Track Live Booking
    </Button>

    <Button
      className="cancel-btn-dashboard"
      onClick={() => setShowCancelModal(true)}
    >
      Cancel Booking
    </Button>

  </div>

</Card>

  ) : (

    <Card className="active-booking-card no-booking">

      <div className="empty-booking">

        <div className="empty-icon">
          🚂
        </div>

        <h2>
          No Active Booking
        </h2>

        <p>
          You currently don't have any active porter bookings.
        </p>

        <Button
          onClick={() => navigate('/book')}
        >
          Book a Porter
        </Button>

      </div>

    </Card>

  )}

  {/* QUICK ACTIONS */}

  <Card className="quick-actions-card">

    <h3>
      Quick Actions
    </h3>

    <div className="quick-grid">

      <button>📜 History</button>
      <button>🎧 Support</button>
      <button>👤 Profile</button>
      <button>💳 Refunds</button>
      <button>⭐ Reviews</button>
      <button>⚙ Settings</button>

    </div>

  </Card>

</div>

          {/* RIGHT */}

          <div className="right-section">

           
            <Card className="sidebar-card">

              <h3>
                Recent Activity
              </h3>

              <div className="activity-list">

              {dashboardData?.recentActivities
  ?.slice(0, 3)
  .map((activity) => (
    <div
      key={activity._id}
      className="activity-item"
    >
      <div className="activity-icon">
        📌
      </div>

      <div>
        <strong>
          {activity.title}
        </strong>

        <p>
          {activity.description}
        </p>

        <span>
          {new Date(
            activity.createdAt
          ).toLocaleString()}
        </span>
      </div>
    </div>
  )
)}

              </div>

              <Button
                variant="ghost"
                className="full-btn"
                onClick={() => navigate('/history')}
              >
                View All History
              </Button>

            </Card>

          </div>

                </section>

        {showCancelModal && (
          <div
            className="cancel-modal-overlay"
            onClick={() => setShowCancelModal(false)}
          >
            <div
              className="cancel-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Cancel Booking</h2>

              <p>
                Are you sure you want to cancel this porter booking?
              </p>

              <div className="cancel-fee-box">
                Cancellation Fee: ₹20
              </div>

              <div className="cancel-actions-modal">

                <button
                  className="keep-booking-btn"
                  onClick={() => setShowCancelModal(false)}
                >
                  Keep Booking
                </button>

                <button
  className="danger-btn"
  onClick={handleCancelBooking}
>
  Confirm Cancel
</button>

              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
    
  );
};

export default DashboardPage;