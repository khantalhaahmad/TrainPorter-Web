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

                <div className="completion-hero text-center">

                    <div className="completion-icon-wrapper">
                        📦
                    </div>

                    <h1>
                        Complete Service
                    </h1>

                    <p className="text-muted">

                        Enter the verification code
                        shared by the porter to
                        complete your service.

                    </p>

                </div>

                <div className="completion-grid">

                    <Card className="otp-verification-card">

                        <div className="otp-input-area">

                            <label>
                                Completion OTP
                            </label>

                            <Input
                                placeholder="0000"
                                maxLength="4"
                                value={otp}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value.replace(
                                            /\D/g,
                                            ''
                                        )
                                    )
                                }
                                className="otp-entry-field"
                            />

                            <p className="otp-hint">

                                Enter the OTP provided
                                by the porter after
                                luggage delivery.

                            </p>

                        </div>

                        <Button
                            size="lg"
                            className="btn-full"
                            disabled={
                                otp.length !== 4
                            }
                            onClick={
                                handleCompleteService
                            }
                        >
                            Verify & Finalize
                        </Button>

                    </Card>

                    <Card className="service-details-card-premium">

                        <h3>
                            Service Recap
                        </h3>

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

                            <span>🔒</span>

                            Secure Railway Verified
                            Service

                        </div>

                    </Card>

                </div>

            </div>

        </DashboardLayout>
    );
};

export default ServiceCompletionPage;