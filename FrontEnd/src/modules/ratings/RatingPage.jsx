import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import './RatingPage.css';

const RatingPage = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <DashboardLayout>
            <div className="rating-page fade-in">
                <div className="rating-container">
                    <div className="porter-preview-centered">
                        <div className="porter-avatar-xxl">👨‍✈️</div>
                        <h2>Rate Ramesh Kumar</h2>
                        <p className="text-muted">How was your service today?</p>
                    </div>

                    <div className="star-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                className={`star-btn ${star <= (hover || rating) ? 'active' : ''}`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                            >
                                ⭐
                            </button>
                        ))}
                    </div>

                    <div className="feedback-section">
                        <textarea
                            placeholder="Share your experience (optional)..."
                            className="feedback-textarea"
                        ></textarea>
                        <div className="chip-group">
                            {['Punctual', 'Professional', 'Helpful', 'Safe Handling'].map(chip => (
                                <button key={chip} className="chip">{chip}</button>
                            ))}
                        </div>
                    </div>

                    <Button
                        size="lg"
                        className="btn-full"
                        disabled={rating === 0}
                        onClick={() => navigate('/dashboard')}
                    >
                        Submit & Finish
                    </Button>

                    <button className="skip-btn" onClick={() => navigate('/dashboard')}>
                        Skip for now
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default RatingPage;
