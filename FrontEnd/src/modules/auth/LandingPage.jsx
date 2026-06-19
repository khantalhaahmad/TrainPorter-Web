import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import heroImg from '../../assets/hero-bg.png';
import './LandingPage.css';

const LandingPage = ({ openAuth }) => {
    const [activeFaq, setActiveFaq] = useState(null);

    const stats = [
        { label: 'Passengers Served', value: '10,000+' },
        { label: 'Luggage Deliveries', value: '25,000+' },
        { label: 'Stations Covered', value: '50+' },
        { label: 'Average Rating', value: '4.8/5' },
    ];

    const faqs = [
        { q: "How does TrainPorter work?", a: "Simply enter your train details and luggage count. A verified porter will be assigned to meet you at your coach." },
        { q: "When do I pay?", a: "We believe in trust. You only pay after your service is completed and your luggage is safely delivered." },
        { q: "Are porters verified?", a: "Yes, every porter on our platform is background-checked and officially registered with railway authorities." },
        { q: "Can I cancel my booking?", a: "Yes, you can cancel your booking for free any time before the porter arrives at your coach." },
    ];

    return (
        <div className="landing-page">
            <Navbar openAuth={openAuth} />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <img src={heroImg} alt="Indian Railway Station" />
                    <div className="hero-overlay"></div>
                </div>
                
                    <div className="container hero-container">


<div className="landing-hero-content fade-in">

    <Badge
        variant="primary"
        className="landing-hero-badge"
    >
        #1 Railway Assistance App
    </Badge>

    <h1>
        Travel Light,
        <br />
        Travel Right.
    </h1>

    <p className="landing-hero-description">
        Experience the future of railway luggage assistance.
        Book verified porters in seconds and enjoy your journey
        without the heavy lifting.
    </p>

    <div className="landing-hero-actions">

        <Button
            size="lg"
            onClick={openAuth}
        >
            Get Started Now
        </Button>

        <Button
            variant="secondary"
            size="lg"
            className="landing-hero-secondary-btn"
        >
            Watch How it Works
        </Button>

    </div>

</div>

<div className="landing-hero-visuals fade-in">

    <div className="landing-glass-card stat-card-1">
        <span className="landing-stat-icon">✅</span>

        <div className="landing-stat-info">
            <strong>500+</strong>
            <span>Verified Porters</span>
        </div>
    </div>

    <div className="landing-glass-card stat-card-2">
        <span className="landing-stat-icon">⭐</span>

        <div className="landing-stat-info">
            <strong>4.9/5</strong>
            <span>User Rating</span>
        </div>
    </div>

    <div className="landing-glass-card stat-card-3">
        <span className="landing-stat-icon">⏱️</span>

        <div className="landing-stat-info">
            <strong>5 Min</strong>
            <span>Avg. Arrival</span>
        </div>
    </div>



</div>

                </div>
            </section>

            {/* Trust Strip */}
            <div className="trust-strip">
                <div className="container trust-container">
                    <div className="trust-item">
                        <span className="trust-icon">🛡️</span>
                        <span>Railway Verified</span>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">🔒</span>
                        <span>OTP Secured</span>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">💸</span>
                        <span>Pay After Service</span>
                    </div>
                    <div className="trust-item">
                        <span className="trust-icon">📍</span>
                        <span>Real-Time Tracking</span>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <section className="statistics">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, i) => (
                            <div key={i} className="stat-item-premium">
                                <h2 className="stat-value">{stat.value}</h2>
                                <p className="stat-label">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features">
                <div className="container">
                    <div className="section-header text-center">
                        <Badge variant="secondary">Core Features</Badge>
                        <h2>Premium Service for Every Passenger</h2>
                        <p className="text-muted">Built with the highest standards of safety and convenience.</p>
                    </div>

                    <div className="features-grid">
                        {[
                            { t: 'Unified Pricing', d: 'Transparent, weight-based pricing with no hidden charges or bargaining.', i: '💰', c: '#EFF6FF' },
                            { t: 'Live Tracking', d: 'Track your assigned porter in real-time as they navigate to your coach.', i: '📍', c: '#F0FDF4' },
                            { t: 'Insured Luggage', d: 'Your belongings are protected. We guarantee safe handling of all items.', i: '🛡️', c: '#FFFBEB' },
                            { t: '24/7 Support', d: 'Round-the-clock assistance available at all major Indian railway stations.', i: '🎧', c: '#FEF2F2' },
                        ].map((f, i) => (
                            <Card key={i} hover className="feature-card-premium">
                                <div className="feature-icon-wrapper" style={{ backgroundColor: f.c }}>{f.i}</div>
                                <h3>{f.t}</h3>
                                <p>{f.d}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works - Timeline */}
            <section id="how-it-works" className="how-it-works">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Seamless Experience</h2>
                        <p className="text-muted">Booking a porter has never been this easy.</p>
                    </div>

                    <div className="timeline">
                        <div className="timeline-track"></div>
                        {[
                            { s: 'Book Porter', d: 'Enter train, coach and bag details.', i: '📱' },
                            { s: 'Match Found', d: 'Verified porter assigned in minutes.', i: '👨‍✈️' },
                            { s: 'Luggage Picked', d: 'Porter arrives at your seat.', i: '🧳' },
                            { s: 'Service Done', d: 'Pay after safe delivery.', i: '✅' },
                        ].map((step, i) => (
                            <div key={i} className="timeline-item">
                                <div className="timeline-node">{step.i}</div>
                                <div className="timeline-content">
                                    <h4>{step.s}</h4>
                                    <p>{step.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Trusted by Thousands</h2>
                    </div>
                    <div className="testimonials-grid">
                        {[
                            { name: 'Priya Sharma', station: 'New Delhi', text: 'Amazing service! The porter arrived exactly when the train stopped. Highly recommended for families.', rating: 5 },
                            { name: 'Rahul Verma', station: 'Mumbai Central', text: 'No more bargaining with porters at the station. Transparent pricing is a game changer.', rating: 5 },
                            { name: 'Arjun Gupta', station: 'Bangalore', text: 'The live tracking feature really helps in crowded stations. Very professional staff.', rating: 5 },
                        ].map((t, i) => (
                            <Card key={i} className="testimonial-card">
                                <div className="stars">{'⭐'.repeat(t.rating)}</div>
                                <p>"{t.text}"</p>
                                <div className="testimonial-user">
                                    <div className="user-avatar-placeholder">{t.name[0]}</div>
                                    <div className="user-meta">
                                        <strong>{t.name}</strong>
                                        <span>{t.station} Station</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Frequently Asked Questions</h2>
                    </div>
                    <div className="faq-accordion">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`} onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                                <div className="faq-question">
                                    <h3>{faq.q}</h3>
                                    <span className="faq-icon">{activeFaq === i ? '−' : '+'}</span>
                                </div>
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer is added in App.jsx or individually */}
        </div>
    );
};

export default LandingPage;
