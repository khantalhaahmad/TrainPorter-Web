import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import './FareBreakdownPage.css';

const FareBreakdownPage = () => {
    const navigate = useNavigate();

    const [bookingData, setBookingData] = useState(null);
    const [fareData, setFareData] = useState(null);

    useEffect(() => {
        const savedData = JSON.parse(
            localStorage.getItem('bookingData')
        );

        if (!savedData) {
            navigate('/book');
            return;
        }

        setBookingData(savedData);

        const luggageCount =
            savedData.luggageCount || 1;

        const currentHour =
            new Date().getHours();

        const baseFare = 50;

        const luggageCharge =
            luggageCount * 20;

        let peakCharge = 0;
        let nightCharge = 0;

        if (
            (currentHour >= 7 &&
                currentHour <= 10) ||
            (currentHour >= 17 &&
                currentHour <= 21)
        ) {
            peakCharge = 30;
        }

        if (
            currentHour >= 22 ||
            currentHour <= 5
        ) {
            nightCharge = 40;
        }

        const platformFee = 10;

        const subtotal =
            baseFare +
            luggageCharge +
            peakCharge +
            nightCharge +
            platformFee;

        const gst = Math.round(
            subtotal * 0.05
        );

        const total =
            subtotal + gst;

        setFareData({
            baseFare,
            luggageCharge,
            peakCharge,
            nightCharge,
            platformFee,
            gst,
            total,
        });
    }, [navigate]);

    const handleConfirmBooking = async () => {
        try {
            const token =
                localStorage.getItem('token');

            const response =
                await fetch(
                    'http://localhost:8000/api/bookings',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type':
                                'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            trainNumber:
                                bookingData.trainNumber,
                            trainName:
                                bookingData.trainName,
                            station:
                                bookingData.station,
                            coach:
                                bookingData.coach,
                            seatNumber:
                                bookingData.seatNumber,
                            luggageCount:
                                bookingData.luggageCount,
                        }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message
                );
            }

            localStorage.setItem(
                'currentBooking',
                JSON.stringify(data.data)
            );

            navigate('/searching');
        } catch (error) {
            alert(
                error.message ||
                    'Booking failed'
            );
        }
    };

    if (!fareData) return null;

    return (
        <DashboardLayout>
            <div className="fare-page fade-in">

               <div className="fare-header">

    <Button
        variant="ghost"
        size="sm"
        className="back-btn"
        onClick={() => navigate(-1)}
    >
        ← Back
    </Button>

    <div className="fare-title">

        <span className="fare-badge">
            🧾 Booking Review
        </span>

        <h1>
            Fare Breakdown
        </h1>

        <p>
            Review your booking details and confirm
            your porter in just one click.
        </p>

    </div>

</div>

<Card className="fare-card">

    <div className="booking-top">

        <div className="train-icon">
            🚆
        </div>

        <div>

            <h3>
                {bookingData.trainName}
            </h3>

            <p>
                Train No.
                {" "}
                {bookingData.trainNumber}
            </p>

        </div>

    </div>

    <div className="trip-info">

        <div className="trip-item">
            <span>📍 Station</span>
            <strong>
                {bookingData.station}
            </strong>
        </div>

        <div className="trip-item">
            <span>💺 Coach</span>
            <strong>
                {bookingData.coach}
            </strong>
        </div>

        <div className="trip-item">
            <span>🪑 Seat</span>
            <strong>
                {bookingData.seatNumber}
            </strong>
        </div>

        <div className="trip-item">
            <span>🧳 Luggage</span>
            <strong>
                {bookingData.luggageCount}
                {" "}
                Bags
            </strong>
        </div>

    </div>

    <div className="fare-divider"></div>

    <div className="fare-items">

        <div className="fare-line">
            <span>Base Fare</span>
            <strong>
                ₹{fareData.baseFare}
            </strong>
        </div>

        <div className="fare-line">
            <span>Luggage Charge</span>
            <strong>
                ₹{fareData.luggageCharge}
            </strong>
        </div>

        <div className="fare-line">
            <span>Peak Hour</span>
            <strong>
                ₹{fareData.peakCharge}
            </strong>
        </div>

        <div className="fare-line">
            <span>Night Charge</span>
            <strong>
                ₹{fareData.nightCharge}
            </strong>
        </div>

        <div className="fare-line">
            <span>Platform Fee</span>
            <strong>
                ₹{fareData.platformFee}
            </strong>
        </div>

        <div className="fare-line">
            <span>GST (5%)</span>
            <strong>
                ₹{fareData.gst}
            </strong>
        </div>

    </div>

    <div className="total-card">

        <div>

            <p>Total Payable</p>

            <small>
                Includes all taxes
            </small>

        </div>

        <h2>
            ₹{fareData.total}
        </h2>

    </div>

</Card>

                <div className="payment-notice">
                    <h3>
                        Payment Method
                    </h3>

                    <Card className="payment-method-card">

    <div className="payment-left">

        <div className="payment-icon">
            💵
        </div>

        <div>

            <h4>
                Pay After Service
            </h4>

            <p>
                Cash / UPI after successful luggage delivery.
            </p>

            <Badge variant="success">
                Recommended
            </Badge>

        </div>

    </div>

    <div className="payment-check">
        ✔
    </div>

</Card>
                </div>

<div className="fare-actions">

    {/* ================= Service Includes ================= */}

    <div className="service-section">

        <div className="section-heading">

            <span className="section-tag">
                WHY CHOOSE US
            </span>

            <h3>Service Includes</h3>

            <p>
                Every TrainPorter booking comes with premium
                safety, security and real-time assistance.
            </p>

        </div>

        <div className="service-grid">

            <div className="service-card">
                <div className="service-icon">🛡️</div>
                <h4>Railway Verified</h4>
                <p>Authorized and verified porter service.</p>
            </div>

            <div className="service-card">
                <div className="service-icon">📍</div>
                <h4>Live Tracking</h4>
                <p>Track your porter in real-time.</p>
            </div>

            <div className="service-card">
                <div className="service-icon">🔐</div>
                <h4>OTP Pickup</h4>
                <p>Secure luggage handover using OTP.</p>
            </div>

            <div className="service-card">
                <div className="service-icon">🧳</div>
                <h4>Luggage Insurance</h4>
                <p>Your luggage stays protected.</p>
            </div>

            <div className="service-card">
                <div className="service-icon">👷</div>
                <h4>Verified Porter</h4>
                <p>Background verified professionals.</p>
            </div>

            <div className="service-card">
                <div className="service-icon">🎧</div>
                <h4>24×7 Support</h4>
                <p>Instant help whenever you need it.</p>
            </div>

        </div>

    </div>

    {/* ================= Secure Payment ================= */}

    <div className="secure-note">

        <div className="secure-left">

            <div className="secure-icon">
                🔒
            </div>

            <div>

                <h4>No Advance Payment</h4>

                <p>
                    Pay only after your luggage is safely
                    delivered.
                </p>

            </div>

        </div>

        <div className="secure-badge">
            100% Secure
        </div>

    </div>

    {/* ================= Footer ================= */}

    <div className="cancel-wrapper">

        <span className="cancel-line"></span>

        <p className="cancel-text">
            ✔ Free cancellation before porter is assigned
        </p>

        <span className="cancel-line"></span>

    </div>

</div>

{/* ================= Sticky Booking Bar ================= */}

<div className="sticky-booking-bar">

    <div className="sticky-booking-content">
<div className="sticky-price">

    <span>Total Payable</span>

    <h3>₹{fareData.total}</h3>

    <small>Average arrival: 2–5 min</small>

</div>
        <Button
            size="lg"
            className="sticky-btn"
            onClick={handleConfirmBooking}
        >
            Confirm & Find Porter →
        </Button>

    </div>

</div>

</div>
</DashboardLayout>
    );
};

const Badge = ({
    children,
    variant,
}) => (
    <span className={`badge badge-${variant}`}>
        {children}
    </span>
);

export default FareBreakdownPage;