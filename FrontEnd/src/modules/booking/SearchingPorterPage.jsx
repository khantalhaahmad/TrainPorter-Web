import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import './SearchingPorterPage.css';

const SearchingPorterPage = () => {

    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [statusIndex, setStatusIndex] = useState(0);

    const statuses = [
        {
            title: 'Booking Received',
            description: 'Your booking has been confirmed.'
        },
        {
            title: 'Searching Nearby Porter',
            description: 'Finding the closest verified porter.'
        },
        {
            title: 'Porter Assigned',
            description: 'Porter details will appear shortly.'
        },
        {
            title: 'Ready To Serve',
            description: 'Your porter is ready for pickup.'
        }
    ];

    useEffect(() => {

        const savedBooking = JSON.parse(
            localStorage.getItem('currentBooking')
        );

        if (!savedBooking) {
            navigate('/book');
            return;
        }

        setBooking(savedBooking);

       const timers = [];

timers.push(
    setTimeout(() => {
        setStatusIndex(1);
    }, 6000) // 6 sec
);

timers.push(
    setTimeout(() => {
        setStatusIndex(2);
    }, 13000) // 13 sec
);

timers.push(
    setTimeout(() => {
        setStatusIndex(3);
    }, 19000) // 19 sec
);

        const redirect = setTimeout(() => {

            navigate('/assigned');

        }, 25000);

        return () => {

           timers.forEach(clearTimeout);

clearTimeout(redirect);

        };

    }, [navigate]);

    const handleCancelBooking = async () => {

        try {

            if (!booking) return;

            const token =
                localStorage.getItem('token');

            const response = await fetch(

                `http://localhost:8000/api/bookings/cancel/${booking._id}`,

                {

                    method: 'PUT',

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                }

            );

            const data =
                await response.json();

            if (!response.ok)
                throw new Error(data.message);

            localStorage.removeItem(
                'currentBooking'
            );

            navigate('/book');

        } catch (err) {

            alert(err.message);

        }

    };

    return (

    <DashboardLayout>

    <div className="searching-page">

        {/* ================= HEADER ================= */}

        <div className="search-header">

            <h1>
                Assigning Your Porter
            </h1>

            <p>
                Please wait while we connect you with a verified railway porter.
            </p>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="search-layout">

            {/* ====================================================
                            LEFT CARD
            ==================================================== */}

            <Card className="radar-card">

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

                <div className="search-status">

                    <div className="live-dot"></div>

                    <span>
                        Searching nearby porters...
                    </span>

                </div>

            </Card>

            {/* ====================================================
                    RIGHT CARD
==================================================== */}

<Card className="porter-search-card">

    <div className="porter-search-top">

        <div className="porter-search-heading">

            <div className="porter-search-icon-box">
                🛡️
            </div>

            <div className="porter-search-heading-content">

                <h2>Finding the Best Porter</h2>

                <p>Connecting you with the nearest verified porter</p>

            </div>

        </div>

        <div className="eta-badge">
            ETA 2–5 min
        </div>

    </div>

    <div className="porter-search-list">

        {statuses.map((item, index) => (

            <div
                key={index}
                className={`porter-search-item ${
                    index < statusIndex
                        ? "completed"
                        : index === statusIndex
                        ? "active"
                        : "waiting"
                }`}
            >

                {/* LEFT */}

                <div className="porter-search-left">

                    <div className="porter-search-circle">

                        {index < statusIndex ? "✓" : ""}

                    </div>

                    {index !== statuses.length - 1 && (

                        <div className="porter-search-line"></div>

                    )}

                </div>

                {/* CENTER */}

                <div className="porter-search-center">

                    <h4>{item.title}</h4>

                    <small>{item.description}</small>

                </div>

                {/* RIGHT */}

                <div className="porter-search-right">

                    {index < statusIndex ? (

                        <>

                            <span className="porter-search-time">

                                {new Date().toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}

                            </span>

                            <span className="porter-search-status porter-search-completed">

                                Completed

                            </span>

                        </>

                    ) : index === statusIndex ? (

                        <span className="porter-search-status porter-search-active">

                            In Progress

                        </span>

                    ) : (

                        <span className="porter-search-status porter-search-waiting">

                            Waiting

                        </span>

                    )}

                </div>

            </div>

        ))}

    </div>
{/* ===================== BOTTOM ===================== */}

<Card className="trust-card">

    <div className="trust-left">

        <div className="trust-icon">
            🛡️
        </div>

        <div>

            <h3>100% Verified Railway Porter</h3>

            <p>
                OTP Protected Pickup • Live Tracking • Luggage Insurance
            </p>

        </div>

    </div>

    <div className="trust-actions">

        <Button
            className="cancel-btn"
            variant="secondary"
            onClick={handleCancelBooking}
        >
            ✕ Cancel Booking
        </Button>

    </div>

</Card>


                    </Card>

                </div>

                
            </div>

        </DashboardLayout>

    );

};

export default SearchingPorterPage;