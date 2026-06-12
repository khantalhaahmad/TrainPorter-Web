import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './ui/Button';
import './Navbar.css';

const Navbar = ({ openAuth }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${!isHome ? 'navbar-solid' : ''}`}>
            <div className="container navbar-container">
                <Link to="/" className="navbar-logo-badge">
                    <div className="logo-icon-container">🚂</div>
                    <span className="logo-text">TrainPorter</span>
                </Link>

                {/* Desktop Links */}
                <div className="navbar-links desktop-only">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#how-it-works" className="nav-link">How it Works</a>
                    <a href="#stations" className="nav-link">Stations</a>
                    <Link to="/history" className="nav-link">My Bookings</Link>
                </div>

                <div className="navbar-actions desktop-only">
                    <button onClick={openAuth} className="login-link-btn">Login</button>
                    <Button size="sm" className="navbar-cta" onClick={openAuth}>Book Porter</Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-links">
                    <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
                    <a href="#stations" onClick={() => setMobileMenuOpen(false)}>Stations</a>
                    <Link to="/history">My Bookings</Link>
                    <button onClick={() => { setMobileMenuOpen(false); openAuth(); }} className="mobile-login-btn-link">Login</button>
                    <Button className="btn-full" onClick={() => { setMobileMenuOpen(false); openAuth(); }}>Book Porter Now</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
