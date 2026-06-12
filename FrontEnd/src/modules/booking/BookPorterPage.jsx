import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import './BookPorterPage.css';

const BookPorterPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [luggage, setLuggage] = useState({
        small: 0,
        medium: 1,
        large: 0
    });

    const updateLuggage = (type, val) => {
        setLuggage(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + val)
        }));
    };

    const totalItems = luggage.small + luggage.medium + luggage.large;

    return (
        <DashboardLayout>
            <div className="book-page fade-in">
                {/* Progress Tracker */}
                <div className="booking-progress">
                    {[
                        { n: 1, l: 'Details' },
                        { n: 2, l: 'Luggage' },
                        { n: 3, l: 'Confirm' }
                    ].map((s) => (
                        <div key={s.n} className={`progress-step ${step >= s.n ? 'active' : ''}`}>
                            <div className="step-number">{s.n}</div>
                            <span className="step-label">{s.l}</span>
                        </div>
                    ))}
                    <div className="progress-line">
                        <div className="progress-line-fill" style={{ width: `${(step - 1) * 50}%` }}></div>
                    </div>
                </div>

                <div className="book-grid">
                    <div className="book-main">
                        {step === 1 && (
                            <Card className="booking-card-premium">
                                <div className="card-header-inner">
                                    <h2>Train Details</h2>
                                    <p className="text-muted">Where should your porter meet you?</p>
                                </div>
                                <div className="form-grid">
                                    <Input label="Train Number / Name" placeholder="e.g. 12424 / Rajdhani Exp" icon={<span>🚂</span>} />
                                    <div className="row-grid">
                                        <Input label="Coach" placeholder="e.g. B4" />
                                        <Input label="Seat/Berth" placeholder="e.g. 22" />
                                    </div>
                                    <Input label="Contact Number" placeholder="Enter mobile number" icon={<span>📱</span>} />
                                </div>
                                <div className="form-actions-premium">
                                    <Button size="lg" className="btn-full" onClick={() => setStep(2)}>Next: Luggage Selection</Button>
                                </div>
                            </Card>
                        )}

                        {step === 2 && (
                            <Card className="booking-card-premium">
                                <div className="card-header-inner">
                                    <h2>Select Luggage</h2>
                                    <p className="text-muted">Choose the items you need assistance with</p>
                                </div>
                                <div className="luggage-selection-grid">
                                    {[
                                        { id: 'small', label: 'Small Bag', sub: 'Handbags, Backpacks', icon: '🎒', color: '#F0FDF4' },
                                        { id: 'medium', label: 'Medium Suitcase', sub: 'Check-in luggage', icon: '🧳', color: '#EFF6FF' },
                                        { id: 'large', label: 'Extra Large', sub: 'Oversized trunks', icon: '📦', color: '#FFF7ED' },
                                    ].map((item) => (
                                        <div key={item.id} className="luggage-item-premium">
                                            <div className="luggage-visual" style={{ backgroundColor: item.color }}>{item.icon}</div>
                                            <div className="luggage-info">
                                                <strong>{item.label}</strong>
                                                <span>{item.sub}</span>
                                            </div>
                                            <div className="luggage-counter">
                                                <button onClick={() => updateLuggage(item.id, -1)}>−</button>
                                                <span>{luggage[item.id]}</span>
                                                <button onClick={() => updateLuggage(item.id, 1)}>+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="form-actions-premium dual">
                                    <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                                    <Button size="lg" className="btn-full" onClick={() => navigate('/fare')}>Next: Fare Breakdown</Button>
                                </div>
                            </Card>
                        )}
                    </div>

                    <div className="book-sidebar">
                        <Card className="booking-summary-sticky">
                            <h3>Booking Summary</h3>
                            <div className="summary-list">
                                <div className="summary-row">
                                    <span>Station</span>
                                    <strong>New Delhi (NDLS)</strong>
                                </div>
                                <div className="summary-row">
                                    <span>Service Mode</span>
                                    <Badge variant="secondary">Arrival</Badge>
                                </div>
                                <div className="summary-row">
                                    <span>Total Items</span>
                                    <strong>{totalItems} Items</strong>
                                </div>
                            </div>
                            <div className="summary-total">
                                <span>Est. Fare</span>
                                <strong>₹{totalItems * 80 + 50}.00*</strong>
                            </div>
                            <p className="fare-disclaimer">*Final fare calculated at checkout</p>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BookPorterPage;
