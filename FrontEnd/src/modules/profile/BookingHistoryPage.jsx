import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import axios from "axios";

import DashboardLayout from "../../layouts/DashboardLayout";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Input from "../../components/ui/Input";

import "./BookingHistoryPage.css";

const BookingHistoryPage = () => {

    const [bookings, setBookings] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [filter, setFilter] =
        useState("All");

    const [error, setError] =
        useState("");

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async (
        status = ""
    ) => {

        try {

            setLoading(true);

            const token =
                localStorage.getItem(
                    "token"
                );

            let url =
                "http://localhost:8000/api/bookings/my-bookings";

            if (
                status &&
                status !== "All"
            ) {

                const apiStatus =
                    status.toLowerCase();

                url +=
                    `?status=${apiStatus}`;

            }

            const res =
                await axios.get(
                    url,
                    {
                        headers: {
                            Authorization:
                                token,
                        },
                    }
                );

            setBookings(
                res.data.data
            );

        } catch (err) {

            console.log(err);

            setError(
                "Unable to load booking history."
            );

        } finally {

            setLoading(false);

        }

    };

    const filteredBookings =
        useMemo(() => {

            return bookings.filter(
                (booking) => {

                    const keyword =
                        search.toLowerCase();

                    return (

                        booking.trainName
                            ?.toLowerCase()
                            .includes(keyword)

                        ||

                        booking.trainNumber
                            ?.toLowerCase()
                            .includes(keyword)

                        ||

                        booking.station
                            ?.toLowerCase()
                            .includes(keyword)

                    );

                }
            );

        }, [
            bookings,
            search,
        ]);

    const getBadgeVariant = (
        status
    ) => {

        switch (status) {

            case "completed":

                return "success";

            case "cancelled":

                return "danger";

            case "assigned":

            case "accepted":

            case "arrived":

            case "in_progress":

                return "warning";

            default:

                return "secondary";

        }

    };

    const formatDate = (
        date
    ) => {

        return new Date(
            date
        ).toLocaleDateString(
            "en-IN",
            {

                day: "2-digit",

                month: "short",

                year: "numeric",

            }
        );
    };
    return (

    <DashboardLayout>

        <div className="history-page">

           <div className="history-hero">

    <div className="history-left">

        <span className="history-badge">
            📖 Booking History
        </span>

        <h1>
            Your Journey
            <br />
            History
        </h1>

        <p>
            View all your porter bookings,
            completed trips and cancellations.
        </p>

    </div>

    <div className="history-summary">

        <div className="summary-box">

            <h2>{bookings.length}</h2>

            <span>Total Bookings</span>

        </div>

    </div>

</div>
</div>
            <Card className="history-toolbar">

                <Input
                    placeholder="Search train, station or train number..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className="history-search"
                    icon={<span>🔍</span>}
                />

                <div className="filter-chips">

                    {[
                        "All",
                        "Active",
                        "Completed",
                        "Cancelled",
                    ].map((item)=>(

                        <button

                            key={item}

                            className={`filter-chip ${
                                filter===item
                                ?"active"
                                :""
                            }`}

                            onClick={()=>{

                                setFilter(item);

                                fetchBookings(item);

                            }}

                        >

                            {item}

                        </button>

                    ))}

                </div>

            </Card>

            {error && (

                <Card className="history-error">

                    {error}

                </Card>

            )}

            {loading && (

                <div className="history-list">

                    {[1,2,3].map((i)=>(

                        <Card
                            key={i}
                            className="history-card skeleton-card"
                        >

                            <div className="skeleton-line large"></div>

                            <div className="skeleton-line"></div>

                            <div className="skeleton-line small"></div>

                        </Card>

                    ))}

                </div>

            )}

            {!loading &&
            filteredBookings.length===0 && (

                <Card className="history-empty">

                    <div className="empty-icon">
                        📭
                    </div>

                    <h2>
                        No Booking Found
                    </h2>

                    <p>

                        You don't have any bookings matching your search.

                    </p>

                </Card>

            )}

            {!loading &&
            filteredBookings.length>0 && (

                <div className="history-list">
                    {filteredBookings.map((booking) => (

    <Card
        key={booking._id}
        className="history-card"
        hover
    >

        <div className="history-card-header">

            <div>

                <h3 className="history-train">

                    {booking.trainName}

                </h3>

                <span className="history-date">

                    {formatDate(
                        booking.createdAt
                    )}

                </span>

            </div>

            <Badge
                variant={getBadgeVariant(
                    booking.status
                )}
            >
                {booking.status
                    .replace(
                        "_",
                        " "
                    )
                    .toUpperCase()}
            </Badge>

        </div>

        <div className="history-grid">

            <div className="history-item">

                <small>
                    🚆 Train Number
                </small>

                <strong>
                    {booking.trainNumber}
                </strong>

            </div>

            <div className="history-item">

                <small>
                    📍 Station
                </small>

                <strong>
                    {booking.station}
                </strong>

            </div>

            <div className="history-item">

                <small>
                    🚪 Coach
                </small>

                <strong>
                    {booking.coach}
                </strong>

            </div>

            <div className="history-item">

                <small>
                    💺 Seat
                </small>

                <strong>
                    {booking.seatNumber}
                </strong>

            </div>

            <div className="history-item">

                <small>
                    🧳 Luggage
                </small>

                <strong>
                    {booking.luggageCount} Bags
                </strong>

            </div>

            <div className="history-item">

                <small>
                    💰 Amount
                </small>

                <strong>
                    ₹{booking.amount}
                </strong>

            </div>

        </div>

        <div className="history-porter">

            <div className="porter-avatar">
                👨‍✈️
            </div>

            <div className="porter-details">

                <h4>

                    {booking.assignedPorter
                        ?.name ||
                        "Not Assigned"}

                </h4>

                <span>

                    {booking.assignedPorter
                        ?.phone ||
                        "--"}

                </span>

            </div>

        </div>

        <div className="history-actions">

            <button
                className="history-btn"
            >
                View Receipt
            </button>

            <button
                className="history-btn"
            >
                Report Issue
            </button>

            {booking.status ===
                "completed" && (

                <button
                    className="history-btn primary"
                >
                    Book Again
                </button>

            )}

        </div>

    </Card>

))}
 </div>
 )}

 </DashboardLayout>

);

};

export default BookingHistoryPage;