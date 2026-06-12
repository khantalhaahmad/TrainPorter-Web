import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import './DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();

    const quickStats = [
        { label: 'Total Bookings', value: '12', icon: '📦' },
        { label: 'Money Saved', value: '₹450', icon: '💰' },
        { label: 'Avg Rating', value: '4.9', icon: '⭐' },
    ];

    const activities = [
        { id: 1, title: 'Booking Completed', desc: 'Rajdhani Exp at New Delhi', time: '2 hours ago', icon: '✅' },
        { id: 2, title: 'Refund Processed', desc: 'Transaction #TP-12345', time: 'Yesterday', icon: '💸' },
        { id: 3, title: 'Support Ticket Closed', desc: 'Issue with luggage weight', time: '2 days ago', icon: '🎧' },
    ];

    return (
        <DashboardLayout>
            <div className="dashboard-content fade-in">
                <header className="dashboard-header-inner">
                    <div className="welcome-text">
                        <h1>Hello, Talha 🚂</h1>
                        <p className="text-muted">You have 1 active booking for today</p>
                    </div>
                    <Button onClick={() => navigate('/book')}>Book New Porter</Button>
                </header>

                {/* Quick Stats */}
                <div className="quick-stats-grid">
                    {quickStats.map((stat, i) => (
                        <Card key={i} className="stat-card-premium" padding="sm">
                            <div className="stat-icon-bg">{stat.icon}</div>
                            <div className="stat-meta">
                                <h3 className="stat-v">{stat.value}</h3>
                                <span className="stat-l">{stat.label}</span>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="dashboard-main-grid">
                    {/* Active Booking */}
                    <div className="dashboard-col-left">
                        <Card className="active-booking-premium">
                            <div className="card-header-flex">
                                <Badge variant="primary">Active Booking</Badge>
                                <span className="booking-id">ID: #TP-8842</span>
                            </div>
                            <div className="active-booking-body">
                                <div className="train-info">
                                    <h2>Rajdhani Express</h2>
                                    <span className="coach-seat">Coach B4 • Seat 22</span>
                                </div>
                                <div className="porter-preview">
                                    <div className="porter-avatar">👨‍✈️</div>
                                    <div className="porter-meta">
                                        <strong>Ramesh Kumar assigned</strong>
                                        <span>Arriving at Platform 4 in 5 mins</span>
                                    </div>
                                    <Badge variant="success">Verified</Badge>
                                </div>
                            </div>
                            <div className="active-booking-footer">
                                <Button variant="ghost" className="btn-full" onClick={() => navigate('/assigned')}>Track & Manage</Button>
                            </div>
                        </Card>

                        <div className="quick-actions">
                            <h3>Quick Actions</h3>
                            <div className="action-btns">
                                <Button variant="secondary" className="action-btn">History</Button>
                                <Button variant="secondary" className="action-btn">Help Desk</Button>
                                <Button variant="secondary" className="action-btn">Profile</Button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="dashboard-col-right">
                        <Card className="activity-card-premium">
                            <h3>Recent Activity</h3>
                            <div className="activity-list">
                                {activities.map(activity => (
                                    <div key={activity.id} className="activity-item">
                                        <div className="activity-icon-sm">{activity.icon}</div>
                                        <div className="activity-text">
                                            <strong>{activity.title}</strong>
                                            <p>{activity.desc}</p>
                                            <span>{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="btn-full" onClick={() => navigate('/history')}>View All History</Button>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
