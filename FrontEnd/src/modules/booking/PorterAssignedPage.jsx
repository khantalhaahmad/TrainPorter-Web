import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import porterPhoto from '../../assets/porter-profile.png';
import './PorterAssignedPage.css';

const PorterAssignedPage = () => {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="assigned-page fade-in">
                <div className="header-stack text-center">
                    <div className="success-lottie-placeholder">🎉</div>
                    <h1>Porter Found & Assigned!</h1>
                    <p className="text-muted">Ramesh is heading to Platform 4 to meet you.</p>
                </div>

                <div className="assigned-grid">
                    {/* Porter Profile Card */}
                    <Card className="porter-profile-premium">
                        <div className="porter-main-info">
                            <div className="porter-image-wrapper">
                                <img src={porterPhoto} alt="Porter Ramesh Kumar" />
                                <div className="online-indicator"></div>
                            </div>
                            <div className="porter-text-meta">
                                <div className="name-verify">
                                    <h2>Ramesh Kumar</h2>
                                    <span className="verify-badge">🛡️</span>
                                </div>
                                <div className="badge-row">
                                    <Badge variant="success">Level 4 Porter</Badge>
                                    <Badge variant="secondary">ID: #TP-420</Badge>
                                </div>
                                <div className="rating-pill">
                                    <span className="star">⭐</span>
                                    <strong>4.9</strong>
                                    <span className="count">(1,240 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div className="experience-stats">
                            <div className="e-stat">
                                <strong>5+ Yrs</strong>
                                <span>Experience</span>
                            </div>
                            <div className="e-stat">
                                <strong>15k+</strong>
                                <span>Items Handled</span>
                            </div>
                            <div className="e-stat">
                                <strong>99%</strong>
                                <span>On-time</span>
                            </div>
                        </div>

                        <div className="contact-actions">
                            <Button variant="secondary" className="btn-full">
                                <span>📞</span> Call Ramesh
                            </Button>
                            <Button variant="secondary" className="btn-full">
                                <span>💬</span> Message
                            </Button>
                        </div>
                    </Card>

                    {/* Arrival Details */}
                    <div className="assigned-meta-stack">
                        <Card className="arrival-card-premium">
                            <div className="arrival-icon">📍</div>
                            <div className="arrival-meta">
                                <span className="label">Estimated Arrival</span>
                                <h3 className="value">5 Minutes</h3>
                                <p className="sub-value">Current Location: Near Waiting Room</p>
                            </div>
                            <div className="arrival-track">
                                <div className="track-bar">
                                    <div className="track-fill" style={{ width: '70%' }}></div>
                                    <div className="track-pointer">👨‍✈️</div>
                                </div>
                            </div>
                        </Card>

                        <Card className="otp-card-premium">
                            <div className="otp-header">
                                <span className="label">Service Start OTP</span>
                                <span className="warning-text">Share only after meeting</span>
                            </div>
                            <div className="otp-value">4 2 8 5</div>
                        </Card>

                        <div className="assigned-footer-actions">
                            <Button size="lg" className="btn-full" onClick={() => navigate('/complete')}>
                                Track Live Arrival
                            </Button>
                            <p className="cancel-note">Need to change? <button onClick={() => navigate('/book')}>Cancel Booking</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PorterAssignedPage;
