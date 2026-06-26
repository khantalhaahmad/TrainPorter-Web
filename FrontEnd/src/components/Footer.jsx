import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import porterProfile from "../assets/porter-profile copy.png";
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-top">

                    {/* BRAND */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="logo-icon">🚂</span>
                            <span className="logo-text">TrainPorter</span>
                        </Link>

                        <p className="footer-description">
                            India's first premium railway luggage assistance
                            platform. We connect travelers with verified railway
                            porters for a safe, seamless and hassle-free journey.
                        </p>

                        <div className="social-links">
                            <a href="#" className="social-icon">𝕏</a>
                            <a href="#" className="social-icon">📸</a>
                            <a href="#" className="social-icon">🔗</a>
                            <a href="#" className="social-icon">🎵</a>
                        </div>
                    </div>

                    {/* LINKS */}
                    <div className="footer-links-grid">

                     <div className="footer-col">
    <h4>Company</h4>

    <a href="/about" target="_blank" rel="noopener noreferrer">
        About Us
    </a>

    <a href="/blog" target="_blank" rel="noopener noreferrer">
        Blog
    </a>

    <a href="/careers" target="_blank" rel="noopener noreferrer">
        Careers
    </a>

    <a href="/press" target="_blank" rel="noopener noreferrer">
        Press Kit
    </a>

    <a
        href="/become-porter"
        target="_blank"
        rel="noopener noreferrer"
        className="porter-link"
    >
        <div className="porter-link-content">
            <img
                src={porterProfile}
                alt="TrainPorter Partner"
                className="porter-link-image"
            />

            <div className="porter-link-text">
                <span className="porter-title">
                    Become a Porter
                </span>

                <span className="porter-subtitle">
                    Earn daily income with TrainPorter
                </span>
            </div>

            <div className="porter-arrow">→</div>
        </div>
    </a>
</div>
                        {/* SERVICES */}
                       <div className="footer-col">
    <h4>Services</h4>

    <a href="/book" target="_blank" rel="noopener noreferrer">
        Book Porter
    </a>

    <a href="/stations" target="_blank" rel="noopener noreferrer">
        Station Search
    </a>

    <a href="/corporate" target="_blank" rel="noopener noreferrer">
        Corporate Solutions
    </a>

    <a href="/bulk" target="_blank" rel="noopener noreferrer">
        Bulk Booking
    </a>
</div>

                        {/* SUPPORT */}
                       <div className="footer-col">
    <h4>Support</h4>

    <a href="/help" target="_blank" rel="noopener noreferrer">
        Help Center
    </a>

    <a href="/contact" target="_blank" rel="noopener noreferrer">
        Contact Us
    </a>

    <a href="/safety" target="_blank" rel="noopener noreferrer">
        Safety & Trust
    </a>

    <a href="/cancellation" target="_blank" rel="noopener noreferrer">
        Cancellation Policy
    </a>
</div>
                    </div>

                    {/* APP DOWNLOAD */}
                    <div className="footer-app">
                        <h4>Download Our App</h4>

                        <div className="app-btns">
                            <div className="app-btn-mock">
                                📱 App Store
                            </div>

                            <div className="app-btn-mock">
                                ▶ Google Play
                            </div>
                        </div>

                        <p className="newsletter-text">
                            
                        </p>

                        <div className="newsletter-form">
                            
                        </div>
                    </div>

                </div>

                {/* FOOTER BOTTOM */}
               <div className="footer-bottom-links">
    <a href="/privacy" target="_blank" rel="noopener noreferrer">
        Privacy Policy
    </a>

    <a href="/terms" target="_blank" rel="noopener noreferrer">
        Terms of Service
    </a>

    <a href="/cookies" target="_blank" rel="noopener noreferrer">
        Cookie Policy
    </a>
</div>
            </div>

            {/* Railway Track Animation */}
            <div className="footer-illustration">
                <div className="track-line"></div>
            </div>
        </footer>
    );
};

export default Footer;

