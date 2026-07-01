import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import "./SearchingPorterPage.css";

const SearchingPorterPage = () => {
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [statusIndex, setStatusIndex] = useState(0);

    const statuses = [
        {
            title: "Booking Received",
            time: "10:24 AM",
        },
        {
            title: "Searching nearby porter",
        },
        {
            title: "Porter assigned",
        },
        {
            title: "Ready to serve",
        },
    ];

    useEffect(() => {
        const savedBooking = JSON.parse(
            localStorage.getItem("currentBooking")
        );

        if (!savedBooking) {
            navigate("/book");
            return;
        }

        setBooking(savedBooking);

        const timer = setInterval(() => {
            setStatusIndex((prev) =>
                prev < statuses.length - 1 ? prev + 1 : prev
            );
        }, 1200);

        const redirect = setTimeout(() => {
            navigate("/assigned");
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [navigate]);

    const handleCancelBooking = async () => {
        try {
            if (!booking) return;

            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8000/api/bookings/cancel/${booking._id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            localStorage.removeItem("currentBooking");

            navigate("/book");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <DashboardLayout>
            <div className="searching-page">

                {/* Header */}

                <div className="search-header">
                    <h1>Assigning Your Porter</h1>

                    <p>
                        Please wait while we connect you with a verified porter.
                    </p>
                </div>

                {/* Main Grid */}

                <div className="search-layout">

                    {/* LEFT */}

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

                    {/* RIGHT */}

                    <Card className="timeline-card">

                        <div className="timeline-top">

                            <div className="timeline-heading">

                                <div className="timeline-icon-box">
                                    🛡️
                                </div>

                                <h2>
                                    Finding the Best Porter
                                </h2>

                            </div>

                            <div className="eta-badge">
                                ETA 2–5 min
                            </div>

                        </div>

                        <div className="timeline-list">

                            {statuses.map((item, index) => (

                                <div
                                    key={index}
                                    className={`timeline-item ${
                                        index < statusIndex
                                            ? "completed"
                                            : index === statusIndex
                                            ? "active"
                                            : ""
                                    }`}
                                >

                                    <div className="timeline-left">

                                        <div className="timeline-circle">

                                            {index < statusIndex ? "✓" : ""}

                                        </div>

                                        {index !== statuses.length - 1 && (
                                            <div className="timeline-line"></div>
                                        )}

                                    </div>

                                    <div className="timeline-center">

                                        <h4>
                                            {item.title}
                                        </h4>

                                    </div>

                                    <div className="timeline-right">

                                        {index < statusIndex && (
                                            <>
                                                <span className="timeline-time">
                                                    {item.time || "10:24 AM"}
                                                </span>

                                                <span className="badge completed-badge">
                                                    Completed
                                                </span>
                                            </>
                                        )}

                                        {index === statusIndex && (
                                            <span className="badge active-badge">
                                                In Progress
                                            </span>
                                        )}

                                        {index > statusIndex && (
                                            <span className="badge waiting-badge">
                                                Waiting
                                            </span>
                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    </Card>

                </div>

                {/* Bottom */}

                <Card className="trust-card">

                    <div className="trust-left">

                        <div className="trust-icon">
                            🛡️
                        </div>

                        <div>

                            <h3>
                                100% Verified Railway Porter
                            </h3>

                            <p>
                                OTP Protected Pickup • Live Tracking • Luggage Safety
                            </p>

                        </div>

                    </div>

                    <Button
                        className="cancel-btn"
                        variant="secondary"
                        onClick={handleCancelBooking}
                    >
                        ✕ Cancel Booking
                    </Button>

                </Card>

            </div>
        </DashboardLayout>
    );
};

export default SearchingPorterPage;