import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import porterPhoto from '../../assets/porter-profile.png';
import './PorterAssignedPage.css';


const PorterAssignedPage = () => {

    const navigate = useNavigate();

    const [booking, setBooking] =
        useState(null);

    useEffect(() => {

        const savedBooking =
            JSON.parse(
                localStorage.getItem(
                    'currentBooking'
                )
            );

        if (!savedBooking) {
            navigate('/book');
            return;
        }

        setBooking(savedBooking);

    }, [navigate]);

    const handleCancelBooking =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        'token'
                    );

                const response =
                    await fetch(
                        `http://localhost:8000/api/bookings/cancel/${booking._id}`,
                        {
                            method: 'PUT',
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message
                    );
                }

                alert(
                    'Booking cancelled successfully'
                );

                navigate('/book');

            } catch (error) {

                alert(
                    error.message
                );

            }
        };

    if (!booking) return null;

    const porter =
        booking.assignedPorter;

    return (
        <DashboardLayout>

            <div className="assigned-page fade-in">

               <div className="header-stack">

    <div className="success-lottie-placeholder">
        🎉
    </div>

    <h1>
        Porter Assigned Successfully
    </h1>

    <div className="success-divider">

        <span>
            ✔ Your porter is on the way.
        </span>

    </div>

</div>
                <div className="assigned-grid">

                    <Card className="porter-profile-premium">

                        <div className="porter-main-info">

                            <div className="porter-image-wrapper">

                                <img
                                    src={porterPhoto}
                                    alt="Porter"
                                />

                                <div className="online-indicator" />

                            </div>

                            <div className="porter-text-meta">

                                <div className="name-verify">

                                    <h2>
                                        {porter?.name}
                                    </h2>

                                    <span className="verify-badge">
                                        🛡️
                                    </span>

                                </div>

                                <div className="badge-row">

                                    <Badge variant="success">
                                        Verified Porter
                                    </Badge>

                                    <Badge variant="secondary">
                                        {porter?.porterId}
                                    </Badge>

                                </div>

                            </div>

                        </div>

                        <div className="experience-stats">

                            <div className="e-stat">
                                <strong>
                                    Assigned
                                </strong>

                                <span>
                                    Status
                                </span>
                            </div>

                            <div className="e-stat">
                                <strong>
                                    {booking.luggageCount}
                                </strong>

                                <span>
                                    Bags
                                </span>
                            </div>

                            <div className="e-stat">
                                <strong>
                                    ₹{booking.amount}
                                </strong>

                                <span>
                                    Fare
                                </span>
                            </div>

                        </div>

                        <div className="contact-actions">

                            <Button
                                variant="secondary"
                                className="btn-full"
                            >
                                📞 {porter?.phone}
                            </Button>

                        </div>

                    </Card>

                    <div className="assigned-meta-stack">

                     <Card className="arrival-card-premium">

    <div className="arrival-header">

        <div className="arrival-icon">
            📍
        </div>

        <div className="arrival-meta">

           <span className="label">
    PORTER STATUS
</span>

<h3 className="value">
    Walking towards Coach {booking.coach}
</h3>

<p className="sub-value">
    Destination • {booking.station} • Seat {booking.seatNumber}
</p>

        </div>

    </div>

    <div className="arrival-track">

        <div className="track-bar">

            <div
                className="track-fill"
                style={{ width: "40%" }}
            />

            <div className="track-pointer">
                👨‍✈️
            </div>

        </div>

    </div>
{/* 👇 YAHAN ADD KARNA HAI */}

    <div className="journey-info">

        <span>
            📍 Current: Platform Entry Gate
        </span>

        <span>
            🚶 45% Completed
        </span>

    </div>

</Card>

                       <Card className="otp-card-premium">

    <div className="status-top">

        <div>

            <span className="label">
                Booking Status
            </span>

            <div className="otp-value">
                {booking.status?.replace('_',' ').toUpperCase()}
            </div>

        </div>

        <div className="status-badge">
                    Live Tracking
        </div>

    </div>

</Card>

                        <Card className="otp-card-premium">

    <div className="status-top">

        <div>

            <span className="label">
                Total Fare
            </span>

            <div className="otp-value">
                ₹{booking.amount}
            </div>

        </div>

        <div className="status-badge">
            Secure Booking
        </div>

    </div>

</Card>
                        <div className="assigned-footer-actions">

                            <Button
                                size="lg"
                                className="btn-full"
                                onClick={() =>
                                    navigate(
                                        '/complete'
                                    )
                                }
                            >
                                Continue Service
                            </Button>

                            {booking.status !==
                                'arrived' &&
                                booking.status !==
                                    'in_progress' &&
                                booking.status !==
                                    'completed' && (

                                    <p className="cancel-note">

                                        Need to change?

                                        <button
                                            onClick={
                                                handleCancelBooking
                                            }
                                        >
                                            Cancel Booking
                                        </button>

                                    </p>
                                )}

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
};

export default PorterAssignedPage;