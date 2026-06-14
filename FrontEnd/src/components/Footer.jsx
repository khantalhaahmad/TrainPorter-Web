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

                      {/* COMPANY */}
<div className="footer-col">
    <h4>Company</h4>

    <Link to="/about">About Us</Link>
    <Link to="/blog">Blog</Link>
    <Link to="/careers">Careers</Link>
    <Link to="/press">Press Kit</Link>

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

            <div className="porter-arrow">
                →
            </div>

        </div>
    </a>
</div>
                        {/* SERVICES */}
                        <div className="footer-col">
                            <h4>Services</h4>

                            <Link to="/book">Book Porter</Link>
                            <Link to="/stations">Station Search</Link>
                            <Link to="/corporate">Corporate Solutions</Link>
                            <Link to="/bulk">Bulk Booking</Link>
                        </div>

                        {/* SUPPORT */}
                        <div className="footer-col">
                            <h4>Support</h4>

                            <Link to="/help">Help Center</Link>
                            <Link to="/contact">Contact Us</Link>
                            <Link to="/safety">Safety & Trust</Link>
                            <Link to="/cancellation">Cancellation Policy</Link>
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
                            Join our newsletter for travel tips, offers and
                            platform updates.
                        </p>

                        <div className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email"
                            />
                            <button type="button">
                                ➜
                            </button>
                        </div>
                    </div>

                </div>

                {/* FOOTER BOTTOM */}
                <div className="footer-bottom">
                    <p>
                        © 2026 TrainPorter Technologies Pvt. Ltd.
                        All Rights Reserved.
                    </p>

                    <div className="footer-bottom-links">
                        <Link to="/privacy">
                            Privacy Policy
                        </Link>

                        <Link to="/terms">
                            Terms of Service
                        </Link>

                        <Link to="/cookies">
                            Cookie Policy
                        </Link>
                    </div>
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

