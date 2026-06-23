import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import './SearchingPorterPage.css';

const SearchingPorterPage = () => {

    const navigate = useNavigate();

    const [booking, setBooking] =
        useState(null);

    const [statusIndex, setStatusIndex] =
        useState(0);

    const statuses = [
        'Booking received',
        'Searching nearby porter',
        'Porter assigned',
        'Ready to serve'
    ];

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

        const timer = setInterval(() => {

            setStatusIndex((prev) =>
                prev < statuses.length - 1
                    ? prev + 1
                    : prev
            );

        }, 1200);

        const redirectTimer =
            setTimeout(() => {

                navigate('/assigned');

            }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(
                redirectTimer
            );
        };

    }, [navigate]);

    const handleCancelBooking =
        async () => {

            try {

                if (!booking) return;

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

                localStorage.removeItem(
                    'currentBooking'
                );

                navigate('/book');

            } catch (error) {

                alert(
                    error.message
                );

            }

        };

    return (
        <DashboardLayout>

            <div className="searching-page fade-in">

                <div className="searching-container-premium">

                    <div className="radar-orbit">

                        <div className="radar-scanner"></div>

                        <div className="radar-circles">
                            <div className="c1"></div>
                            <div className="c2"></div>
                            <div className="c3"></div>
                        </div>

                        <div className="center-icon">
                            👨‍✈️
                        </div>

                        <div className="dot d1"></div>
                        <div className="dot d2"></div>
                        <div className="dot d3"></div>

                    </div>

                    <div className="searching-text-premium">

                        <h1 className="text-gradient">
                            Assigning Your Porter
                        </h1>

                        <p className="text-muted">

                            Please wait while we
                            connect you with a
                            verified porter.

                        </p>

                    </div>

                    {booking && (

                        <Card className="booking-preview-card">

                            <h3>
                                Booking Details
                            </h3>

                            <div className="booking-preview-row">
                                <span>
                                    Train
                                </span>

                                <strong>
                                    {
                                        booking.trainNumber
                                    }
                                </strong>
                            </div>

                            <div className="booking-preview-row">
                                <span>
                                    Train Name
                                </span>

                                <strong>
                                    {
                                        booking.trainName
                                    }
                                </strong>
                            </div>

                            <div className="booking-preview-row">
                                <span>
                                    Station
                                </span>

                                <strong>
                                    {
                                        booking.station
                                    }
                                </strong>
                            </div>

                            <div className="booking-preview-row">
                                <span>
                                    Luggage
                                </span>

                                <strong>
                                    {
                                        booking.luggageCount
                                    } Bags
                                </strong>
                            </div>

                            <div className="booking-preview-row">
                                <span>
                                    Fare
                                </span>

                                <strong>
                                    ₹
                                    {
                                        booking.amount
                                    }
                                </strong>
                            </div>

                        </Card>

                    )}

                    <Card className="status-timeline-card">

                        <div className="status-timeline">

                            {statuses.map(
                                (
                                    status,
                                    index
                                ) => (

                                    <div
                                        key={
                                            index
                                        }
                                        className={`status-line-item ${
                                            index <
                                            statusIndex
                                                ? 'completed'
                                                : index ===
                                                  statusIndex
                                                ? 'active'
                                                : ''
                                        }`}
                                    >

                                        <div className="status-node">

                                            {index <
                                            statusIndex
                                                ? '✓'
                                                : ''}

                                        </div>

                                        <span className="status-msg">
                                            {
                                                status
                                            }
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </Card>

                    <div className="searching-actions">

                        <Button
                            variant="secondary"
                            className="btn-full"
                            onClick={
                                handleCancelBooking
                            }
                        >
                            Cancel Request
                        </Button>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
};

export default SearchingPorterPage;