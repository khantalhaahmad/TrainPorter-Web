import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import './ServiceCompletionPage.css';
import porterluggage from '../../assets/porter-with-luggage.png';
import successShield from "../../assets/success-shield.png";
import walletIcon from "../../assets/wallet.png";
const ServiceCompletionPage = () => {

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');

    const [booking, setBooking] =
        useState(null);
const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    useEffect(() => {

        const currentBooking =
            JSON.parse(
                localStorage.getItem(
                    'currentBooking'
                )
            );

        if (!currentBooking) {
            navigate('/book');
            return;
        }

        setBooking(currentBooking);

    }, [navigate]);
    useEffect(() => {

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {

        setTimeLeft((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

}, [timeLeft]);
const formatTime = (seconds) => {

    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

};
    const handleCompleteService =
        async () => {

            try {

                const token =
                    localStorage.getItem(
                        'token'
                    );

                const response =
                    await fetch(
                        `http://localhost:8000/api/bookings/${booking._id}/status`,
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type':
                                    'application/json',
                                Authorization:
                                    `Bearer ${token}`,
                            },
                            body: JSON.stringify({
                                status:
                                    'completed',
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
                    JSON.stringify(
                        data.data
                    )
                );

                navigate('/payment');

            } catch (error) {

                alert(
                    error.message ||
                    'Failed to complete service'
                );

            }

        };

    if (!booking) return null;

    return (
        <DashboardLayout>

            <div className="completion-page-premium fade-in">

                <div className="completion-hero">

    {/* LEFT HERO IMAGE */}

    <div className="hero-left">
<img
    src={porterluggage}
    alt="Porter"
/>

    </div>

    {/* CENTER */}

    <div className="hero-center">

    
        <h1>
            Complete Service
        </h1>

       <div className="hero-subtitle">

    <span>

        <span className="hero-check">

            ✓

        </span>

        Verification code shared by your porter

    </span>

</div>
    </div>

    {/* RIGHT HERO */}

   <div className="hero-right">

    <img
        src={successShield}
        alt="Success"
    />

    <p>

        Your luggage delivery is

        <br/>

        <strong>

            completed successfully!

        </strong>

    </p>

</div>

</div>

                <div className="completion-grid">

                    <Card className="otp-verification-card">

                        <div className="otp-input-area">

                            <div className="otp-title">

    <div className="otp-title-icon">
        🛡️
    </div>
    <div className="otp-status">

    🔒 Secure OTP Verification

</div>

    <div>

        <h3>
            Completion OTP
        </h3>

        <p>
            Verification code shared by your porter
        </p>

    </div>

</div>

                           <div className="otp-input-wrapper">

    <div className="otp-divider">

        <span></span>

        <p>
            Enter 4-Digit Code
        </p>

        <span></span>

    </div>

    <div className="otp-boxes">

    {[0,1,2,3].map((index)=>(

        <div
            key={index}
            className={`otp-box ${
                otp[index] ? "filled" : ""
            }`}
        >

            {otp[index] || ""}

        </div>

    ))}

    <input

        type="text"

        maxLength={4}

        value={otp}

        onChange={(e)=>
            setOtp(
                e.target.value
                    .replace(/\D/g,"")
            )
        }

        className="otp-hidden-input"

    />

</div>
</div>
<div className="otp-progress">

    <span>

        Delivery Completed

    </span>

</div>

<div className="otp-info">

    <p className="otp-hint">

        Enter the OTP shared by your porter after
        successful luggage delivery.

    </p>

   <div className="otp-tips">

    <div className="otp-tip-card">

        <div className="tip-icon">
            🕒
        </div>

        <div>

            <small>
                Expires In
            </small>

          <strong className={timeLeft <= 30 ? "timer-danger" : ""}>

    {timeLeft > 0 ? formatTime(timeLeft) : "Expired"}

</strong>

        </div>

    </div>

    <div className="otp-tip-card">

        <div className="tip-icon secure">
            🛡
        </div>

        <div>

            <small>
                Status
            </small>

            <strong>
                Secure Verification
            </strong>

        </div>

    </div>

</div>

</div>
</div>
<Button
size="lg"
className="btn-full"
disabled={otp.length!==4}
onClick={handleCompleteService}
>

<div className="verify-btn-content">

<span>

🛡 Verify & Finalize

</span>

<span>

➜

</span>

</div>

</Button>

                    </Card>

                    <Card className="service-details-card-premium">

                       <div className="recap-header">

    <div className="recap-left">

        <div className="recap-icon">
            📋
        </div>

        <h3>
            Service Recap
        </h3>

    </div>

    <span className="summary-badge">
        Summary
    </span>

</div>

                       <div className="recap-list">

    {/* Porter */}

    <div className="recap-row">

        <div className="row-left">

            <span className="row-icon">👤</span>

            <span>Porter Assigned</span>

        </div>

        <strong>
            {booking?.assignedPorter?.name}
        </strong>

    </div>

    {/* Porter ID */}

    <div className="recap-row">

        <div className="row-left">

            <span className="row-icon">🆔</span>

            <span>Porter ID</span>

        </div>

        <strong>
            {booking?.assignedPorter?.porterId}
        </strong>

    </div>

    {/* Station */}

    <div className="recap-row">

        <div className="row-left">

            <span className="row-icon">🚉</span>

            <span>Station</span>

        </div>

        <strong>
            {booking?.station}
        </strong>

    </div>

    {/* Coach */}

    <div className="recap-row">

        <div className="row-left">

            <span className="row-icon">🚆</span>

            <span>Coach</span>

        </div>

        <strong>
            {booking?.coach}
        </strong>

    </div>

    {/* Seat */}

    <div className="recap-row">

        <div className="row-left">

            <span className="row-icon">💺</span>

            <span>Seat Number</span>

        </div>

        <strong>
            {booking?.seatNumber}
        </strong>

    </div>

    {/* Luggage */}

    <div className="recap-row">

        <div className="row-left">

            <span className="row-icon">🧳</span>

            <span>Luggage Count</span>

        </div>

        <strong>
            {booking?.luggageCount} Items
        </strong>

    </div>

    {/* Status */}

    <div className="recap-row">

        <div className="row-left">

            <span className="row-icon">🟢</span>

            <span>Booking Status</span>

        </div>

        <strong className="status-success">

            {booking?.status
                ?.replace("_", " ")
                .toUpperCase()}

        </strong>

    </div>

    {/* Amount */}
<div className="recap-row-total">

    <div className="amount-label">
        Total Amount Due
    </div>

    <div className="amount-price">
        ₹{booking?.amount}
    </div>

    <div className="amount-wallet">

        <img
    src={walletIcon}
    alt="Wallet"
/>

    </div>

</div>
</div>
                       <div className="trust-section">

    <div className="trust-badge-small">

        <span>🔒</span>

        <p>Secure Railway Verified Service</p>

        <span>✅</span>

    </div>

    <div className="secure-note">

        🔒 Your data is 100% secure and encrypted

    </div>

</div>
                    </Card>
<div className="service-features-strip">

    <div className="feature-box">

        <span className="feature-icon">🛡</span>

        <div>

            <h4>Railway Verified</h4>

            <p>Trusted & Secure</p>

        </div>

    </div>

    <div className="feature-box">

        <span className="feature-icon">🔒</span>

        <div>

            <h4>OTP Protection</h4>

            <p>100% Safe</p>

        </div>

    </div>

    <div className="feature-box">

        <span className="feature-icon">📍</span>

        <div>

            <h4>Live Tracking</h4>

            <p>Real-time Updates</p>

        </div>

    </div>

    <div className="feature-box">

        <span className="feature-icon">☂</span>

        <div>

            <h4>Insured Service</h4>

            <p>Complete Protection</p>

        </div>

    </div>

</div>
                </div>

            </div>

        </DashboardLayout>
    );
};

export default ServiceCompletionPage;