import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import './DashboardPage.css';


const DashboardPage = () => {
  const navigate = useNavigate();
const [showCancelModal, setShowCancelModal] = useState(false);
const [hasActiveBooking, setHasActiveBooking] = useState(true);
  const quickStats = [
    {
      label: 'Total Bookings',
      value: '12',
      icon: '📦',
      color: 'blue'
    },
    {
      label: 'Money Saved',
      value: '₹450',
      icon: '💰',
      color: 'green'
    },
    {
      label: 'Avg Rating',
      value: '4.9',
      icon: '⭐',
      color: 'gold'
    },
    {
      label: 'Success Rate',
      value: '100%',
      icon: '🎯',
      color: 'purple'
    }
  ];

  const activities = [
    {
      id: 1,
      title: 'Booking Completed',
      desc: 'Rajdhani Express - NDLS',
      time: '2 hours ago',
      icon: '✅'
    },
    {
      id: 2,
      title: 'Refund Processed',
      desc: 'Transaction #TP-12345',
      time: 'Yesterday',
      icon: '💸'
    },
    {
      id: 3,
      title: 'Support Ticket Closed',
      desc: 'Issue with luggage weight',
      time: '2 days ago',
      icon: '🎧'
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
                👋 Good Evening, Talha
              </span>

              <h1>
                Your Porter is on the way 🚂
              </h1>

              <p>
                Rajdhani Express • Coach B4 • Seat 22
              </p>
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

        {/* STATS */}

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

    <Card className="active-booking-card">

      <div className="booking-header">

        <Badge variant="primary">
          Active Booking
        </Badge>

        <span className="booking-id">
          #TP-8842
        </span>

      </div>

      <div className="booking-body">

        <h2>
          Rajdhani Express
        </h2>

        <p>
          Coach B4 • Seat 22
        </p>

        <div className="booking-status-card">

          <div className="porter-card">

            <div className="porter-avatar">
              👨‍✈️
            </div>

            <div className="porter-info">
              <h4>
                Ramesh Kumar Assigned
              </h4>

              <span>
                Arriving at Platform 4 in 5 mins
              </span>
            </div>

            <Badge variant="success">
              Verified
            </Badge>

          </div>
          </div>
               {/* Timeline */}

<div className="booking-status-card">

```
<div className="booking-progress">

    <div className="progress-step active">
        <span className="step-icon">✔</span>
        <span>Booking</span>
        <small>Completed</small>
    </div>

    <div className="progress-step active">
        <span className="step-icon">✔</span>
        <span>Assigned</span>
        <small>Completed</small>
    </div>

    <div className="progress-step current">
        <span className="step-icon">🚶</span>
        <span>Arriving</span>
        <small>In Progress</small>
    </div>

    <div className="progress-step">
        <span className="step-icon">📦</span>
        <span>Pickup</span>
        <small>Pending</small>
    </div>

    <div className="progress-step">
        <span className="step-icon">🏁</span>
        <span>Complete</span>
        <small>Pending</small>
    </div>

</div>

</div>

</div> {/* booking-body close */}

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
                Upcoming Journey
              </h3>

              <div className="journey-box">

                <h4>
                  Rajdhani Express
                </h4>

                <p>
                  Departure: 11:40 PM
                </p>

                <p>
                  Platform: 4
                </p>

              </div>

            </Card>

            <Card className="sidebar-card">

              <h3>
                Recent Activity
              </h3>

              <div className="activity-list">

                {activities.map(activity => (
                  <div
                    key={activity.id}
                    className="activity-item"
                  >

                    <div className="activity-icon">
                      {activity.icon}
                    </div>

                    <div>

                      <strong>
                        {activity.title}
                      </strong>

                      <p>
                        {activity.desc}
                      </p>

                      <span>
                        {activity.time}
                      </span>

                    </div>

                  </div>
                ))}

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
  onClick={() => {
    setHasActiveBooking(false);
    setShowCancelModal(false);
  }}
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