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
                        onClick={() => navigate(-1)}
                    >
                        ← Back
                    </Button>

                    <h2>
                        Fare Breakdown
                    </h2>
                </div>

                <Card className="fare-card">

                    <div className="fare-summary-header">
                        <div className="receipt-icon">
                            🧾
                        </div>

                        <h3>
                            Booking Summary
                        </h3>

                        <p className="text-muted">
                            Dynamic pricing based
                            on luggage count,
                            demand and timing
                        </p>
                    </div>

                    <div className="fare-items">

                        <div className="fare-line">
                            <span>
                                Base Fare
                            </span>
                            <span>
                                ₹{fareData.baseFare}
                            </span>
                        </div>

                        <div className="fare-line">
                            <span>
                                Luggage Charge
                            </span>
                            <span>
                                ₹{fareData.luggageCharge}
                            </span>
                        </div>

                        <div className="fare-line">
                            <span>
                                Peak Hour Charge
                            </span>
                            <span>
                                ₹{fareData.peakCharge}
                            </span>
                        </div>

                        <div className="fare-line">
                            <span>
                                Night Charge
                            </span>
                            <span>
                                ₹{fareData.nightCharge}
                            </span>
                        </div>

                        <div className="fare-line">
                            <span>
                                Platform Fee
                            </span>
                            <span>
                                ₹{fareData.platformFee}
                            </span>
                        </div>

                        <div className="fare-line">
                            <span>
                                GST (5%)
                            </span>
                            <span>
                                ₹{fareData.gst}
                            </span>
                        </div>

                        <div className="fare-total">
                            <span>
                                Total Amount
                            </span>

                            <span>
                                ₹{fareData.total}
                            </span>
                        </div>
                    </div>

                </Card>

                <div className="payment-notice">
                    <h3>
                        Payment Method
                    </h3>

                    <Card className="payment-method-card">

                        <div className="payment-icon">
                            💵
                        </div>

                        <div className="payment-info">
                            <strong>
                                Pay After Service
                            </strong>

                            <span>
                                Cash / UPI after
                                successful luggage
                                delivery
                            </span>
                        </div>

                        <Badge variant="success">
                            Recommended
                        </Badge>

                    </Card>
                </div>

                <div className="fare-actions">

                    <Button
                        size="lg"
                        className="btn-full"
                        onClick={
                            handleConfirmBooking
                        }
                    >
                        Confirm & Find Porter
                    </Button>

                    <p className="cancel-text">
                        Free cancellation before
                        porter arrives
                    </p>

                </div>

            </div>
        </DashboardLayout>
    );
};

const Badge = ({
    children,
    variant,
}) => (
    <span
        className={`badge badge-${variant}`}
    >
        {children}
    </span>
);

export default FareBreakdownPage;