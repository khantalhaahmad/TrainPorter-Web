import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import './ServiceCompletionPage.css';

const ServiceCompletionPage = () => {

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');

    const [booking, setBooking] =
        useState(null);

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

    <div className="completion-icon-wrapper">
        📦
    </div>

    <h1>
        Complete Service
    </h1>

    <div className="hero-subtitle">

        <span>
            ✔ Verification code shared by your porter
        </span>

    </div>

</div>

                <div className="completion-grid">

                    <Card className="otp-verification-card">

                        <div className="otp-input-area">

                            <div className="otp-title">

    <div className="otp-title-icon">
        🛡️
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

            <strong>
                05:00
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
    disabled={otp.length !== 4}
    onClick={handleCompleteService}
>

    🛡 Verify & Finalize

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

                            <div className="recap-row">

                                <span>
                                    Porter Assigned
                                </span>

                                <strong>
                                    {
                                        booking
                                            ?.assignedPorter
                                            ?.name
                                    }
                                </strong>

                            </div>

                            <div className="recap-row">

                                <span>
                                    Porter ID
                                </span>

                                <strong>
                                    {
                                        booking
                                            ?.assignedPorter
                                            ?.porterId
                                    }
                                </strong>

                            </div>

                            <div className="recap-row">

                                <span>
                                    Station
                                </span>

                                <strong>
                                    {
                                        booking
                                            ?.station
                                    }
                                </strong>

                            </div>

                            <div className="recap-row">

                                <span>
                                    Coach
                                </span>

                                <strong>
                                    {
                                        booking
                                            ?.coach
                                    }
                                </strong>

                            </div>

                            <div className="recap-row">

                                <span>
                                    Seat Number
                                </span>

                                <strong>
                                    {
                                        booking
                                            ?.seatNumber
                                    }
                                </strong>

                            </div>

                            <div className="recap-row">

                                <span>
                                    Luggage Count
                                </span>

                                <strong>
                                    {
                                        booking
                                            ?.luggageCount
                                    } Items
                                </strong>

                            </div>

                            <div className="recap-row">

                                <span>
                                    Booking Status
                                </span>

                                <strong>
                                    {booking?.status
                                        ?.replace(
                                            '_',
                                            ' '
                                        )
                                        .toUpperCase()}
                                </strong>

                            </div>

                            <div className="recap-row-total">

                                <span>
                                    Total Amount Due
                                </span>

                                <h2 className="price-text">
                                    ₹
                                    {
                                        booking?.amount
                                    }
                                </h2>

                            </div>

                        </div>

                       <div className="trust-badge-small">

    <span>
        🔒
    </span>

    <p>
        Secure Railway Verified Service
    </p>

    <span>
        ✅
    </span>

</div>
<p className="secure-note">

    🔒 Your data is 100% secure and encrypted

</p>

                    </Card>

                </div>

            </div>

        </DashboardLayout>
    );
};

export default ServiceCompletionPage;