import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import './FareBreakdownPage.css';

const FareBreakdownPage = () => {
    const navigate = useNavigate();

    const fareItems = [
        { label: 'Base Fare (2 Trolley)', amount: 160 },
        { label: 'Weight Surcharge (Heavy)', amount: 40 },
        { label: 'Platform Fee', amount: 35 },
        { label: 'GST (5%)', amount: 5 },
    ];

    const total = fareItems.reduce((acc, item) => acc + item.amount, 0);

    return (
        <DashboardLayout>
            <div className="fare-page fade-in">
                <div className="fare-header">
                    <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>← Back</Button>
                    <h2>Fare Breakdown</h2>
                </div>

                <Card className="fare-card">
                    <div className="fare-summary-header">
                        <div className="receipt-icon">🧾</div>
                        <h3>Booking Summary</h3>
                        <p className="text-muted">Review your items before confirming</p>
                    </div>

                    <div className="fare-items">
                        {fareItems.map((item, index) => (
                            <div key={index} className="fare-line">
                                <span>{item.label}</span>
                                <span>₹{item.amount}.00</span>
                            </div>
                        ))}
                        <div className="fare-total">
                            <span>Total Amount</span>
                            <span>₹{total}.00</span>
                        </div>
                    </div>

                    <div className="fare-info-box">
                        <span>💡</span>
                        <p>This is an estimated fare. Final amount will be calculated based on actual weight at the station.</p>
                    </div>
                </Card>

                <div className="payment-notice">
                    <h3>Payment Method</h3>
                    <Card padding="sm" className="payment-method-card">
                        <div className="payment-icon">💵</div>
                        <div className="payment-info">
                            <strong>Pay After Service</strong>
                            <span>Cash or UPI at destination</span>
                        </div>
                        <Badge variant="success">Recommended</Badge>
                    </Card>
                </div>

                <div className="fare-actions">
                    <Button size="lg" className="btn-full" onClick={() => navigate('/searching')}>
                        Confirm & Find Porter
                    </Button>
                    <p className="cancel-text">You can cancel for free before porter arrives</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

// Internal Badge for standalone
const Badge = ({ children, variant }) => (
    <span className={`badge badge-${variant}`}>{children}</span>
);

export default FareBreakdownPage;
