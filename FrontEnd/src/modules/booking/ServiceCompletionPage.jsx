import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import './ServiceCompletionPage.css';

const ServiceCompletionPage = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    return (
        <DashboardLayout>
            <div className="completion-page-premium fade-in">
                <div className="completion-hero text-center">
                    <div className="completion-icon-wrapper">📦</div>
                    <h1>Complete Service</h1>
                    <p className="text-muted">Enter the 4-digit code provided by Ramesh to verify delivery.</p>
                </div>

                <div className="completion-grid">
                    <Card className="otp-verification-card">
                        <div className="otp-input-area">
                            <label>Completion OTP</label>
                            <Input
                                placeholder="0 0 0 0"
                                maxLength="4"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                className="otp-entry-field"
                            />
                            <p className="otp-hint">A secure code to ensure your luggage reached you safely.</p>
                        </div>
                        <Button
                            size="lg"
                            className="btn-full"
                            disabled={otp.length !== 4}
                            onClick={() => navigate('/payment')}
                        >
                            Verify & Finalize
                        </Button>
                    </Card>

                    <Card className="service-details-card-premium">
                        <h3>Service Recap</h3>
                        <div className="recap-list">
                            <div className="recap-row">
                                <span>Porter Assigned</span>
                                <strong>Ramesh Kumar</strong>
                            </div>
                            <div className="recap-row">
                                <span>Station</span>
                                <strong>New Delhi (NDLS)</strong>
                            </div>
                            <div className="recap-row">
                                <span>Luggage Count</span>
                                <strong>3 Items</strong>
                            </div>
                            <div className="recap-row-total">
                                <span>Total Amount Due</span>
                                <h2 className="price-text">₹240.00</h2>
                            </div>
                        </div>
                        <div className="trust-badge-small">
                            <span>🔒</span>
                            Secure Railway Verified Service
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ServiceCompletionPage;
