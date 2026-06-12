import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import './BookingHistoryPage.css';

const BookingHistoryPage = () => {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const bookings = [
        { id: 1, station: 'New Delhi (NDLS)', date: '12 June 2024', amount: 240, status: 'Completed', train: 'Rajdhani Exp', porter: 'Ramesh Kumar' },
        { id: 2, station: 'Mumbai Central', date: '05 June 2024', amount: 180, status: 'Completed', train: 'August Kranti', porter: 'Suresh P' },
        { id: 3, station: 'Kolkata (HWH)', date: '28 May 2024', amount: 320, status: 'Cancelled', train: 'Howrah Mail', porter: 'N/A' },
    ];

    const filteredBookings = bookings.filter(b =>
        (filter === 'All' || b.status === filter) &&
        (b.station.toLowerCase().includes(search.toLowerCase()) || b.train.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <DashboardLayout>
            <div className="history-page fade-in">
                <div className="history-header">
                    <h2>Booking History</h2>
                    <p className="text-muted">Manage and track all your luggage assistance requests</p>
                </div>

                <div className="history-controls">
                    <Input
                        placeholder="Search by station or train..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="history-search"
                        icon={<span>🔍</span>}
                    />
                    <div className="filter-chips">
                        {['All', 'Completed', 'Cancelled', 'Upcoming'].map(f => (
                            <button
                                key={f}
                                className={`filter-chip ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="history-list-expanded">
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map(booking => (
                            <Card key={booking.id} className="history-card" hover>
                                <div className="history-card-header">
                                    <div className="h-station-info">
                                        <strong>{booking.station}</strong>
                                        <span>{booking.date} • {booking.train}</span>
                                    </div>
                                    <Badge variant={booking.status === 'Completed' ? 'success' : booking.status === 'Cancelled' ? 'danger' : 'warning'}>
                                        {booking.status}
                                    </Badge>
                                </div>
                                <div className="history-card-body">
                                    <div className="h-detail">
                                        <span className="h-label">Porter</span>
                                        <span className="h-value">{booking.porter}</span>
                                    </div>
                                    <div className="h-detail">
                                        <span className="h-label">Amount</span>
                                        <span className="h-value">₹{booking.amount}</span>
                                    </div>
                                </div>
                                <div className="history-card-footer">
                                    <button className="text-btn">View Receipt</button>
                                    <button className="text-btn">Report Issue</button>
                                    {booking.status === 'Completed' && <button className="text-btn primary-text">Rebook Porter</button>}
                                </div>
                            </Card>
                        ))
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">📭</div>
                            <h3>No bookings found</h3>
                            <p className="text-muted">You haven't made any bookings that match your filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BookingHistoryPage;
