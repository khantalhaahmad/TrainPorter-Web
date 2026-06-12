import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import './PaymentPage.css';

const PaymentPage = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [method, setMethod] = useState('');

    const handlePayment = (selectedMethod) => {
        setMethod(selectedMethod);
        // Simulate payment processing
        setTimeout(() => setIsSuccess(true), 2000);
    };

    if (isSuccess) {
        return (
            <DashboardLayout>
                <div className="payment-success-premium fade-in">
                    <div className="success-lottie-placeholder">🎊</div>
                    <h1 className="text-gradient">Payment Received!</h1>
                    <p className="text-muted">Your transaction was successful.</p>

                    <Card className="premium-receipt-card">
                        <div className="receipt-premium-header">
                            <div className="receipt-brand">
                                <span>🚂</span>
                                <strong>TrainPorter</strong>
                            </div>
                            <Badge variant="success">PAID</Badge>
                        </div>

                        <div className="receipt-premium-body">
                            <div className="premium-line">
                                <span>Transaction ID</span>
                                <strong>#TP-93847520</strong>
                            </div>
                            <div className="premium-line">
                                <span>Date & Time</span>
                                <strong>12 June 2024, 04:30 PM</strong>
                            </div>
                            <div className="premium-line divider">
                                <span>Porter Details</span>
                                <strong>Ramesh Kumar (ID: 420)</strong>
                            </div>
                            <div className="premium-line">
                                <span>Service</span>
                                <strong>Luggage Assistance (3 Items)</strong>
                            </div>
                            <div className="premium-line-total">
                                <span>Total Paid</span>
                                <h2 className="price-text">₹240.00</h2>
                            </div>
                        </div>

                        <div className="receipt-premium-footer">
                            <p>Verified by Indian Railways Support</p>
                        </div>
                    </Card>

                    <div className="success-footer-actions">
                        <Button size="lg" className="btn-full" onClick={() => navigate('/rate')}>
                            Next: Rate Experience
                        </Button>
                        <Button variant="secondary" className="btn-full">
                            Download PDF Receipt
                        </Button>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="payment-page-premium fade-in">
                <div className="payment-hero-premium text-center">
                    <h2>Total Payable</h2>
                    <h1 className="payment-price-hero">₹240.00</h1>
                    <p className="text-muted">Safe & Secure Payment</p>
                </div>

                <div className="payment-methods-premium">
                    <h3>Select Payment Method</h3>
                    <div className="methods-grid-premium">
                        <Card
                            className={`method-card-premium ${method === 'upi' ? 'active' : ''}`}
                            onClick={() => handlePayment('upi')}
                            hover
                        >
                            <div className="method-icon-bg">📱</div>
                            <div className="method-text-meta">
                                <strong>UPI / Online</strong>
                                <span>Instant payment via GPay, PhonePe, Paytm</span>
                            </div>
                            <div className="method-select-radio"></div>
                            {method === 'upi' && <div className="loader-mini"></div>}
                        </Card>

                        <Card
                            className={`method-card-premium ${method === 'cash' ? 'active' : ''}`}
                            onClick={() => handlePayment('cash')}
                            hover
                        >
                            <div className="method-icon-bg">💵</div>
                            <div className="method-text-meta">
                                <strong>Pay by Cash</strong>
                                <span>Hand over cash directly to the porter</span>
                            </div>
                            <div className="method-select-radio"></div>
                            {method === 'cash' && <div className="loader-mini"></div>}
                        </Card>
                    </div>
                </div>

                <div className="security-assurance">
                    <div className="assurance-item">
                        <span>🛡️</span>
                        <span>100% Secure</span>
                    </div>
                    <div className="assurance-item">
                        <span>🔒</span>
                        <span>PCI DSS Compliant</span>
                    </div>
                    <div className="assurance-item">
                        <span>🎧</span>
                        <span>24/7 Priority Support</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PaymentPage;
