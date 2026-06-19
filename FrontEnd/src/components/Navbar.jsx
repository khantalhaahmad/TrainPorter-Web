import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ openAuth }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const isHome = location.pathname === '/';

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);

        return () =>
            window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <nav
            className={`navbar ${
                scrolled ? 'navbar-scrolled' : ''
            } ${!isHome ? 'navbar-solid' : ''}`}
        >
            <div className="container navbar-container">

                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-logo-badge"
                >
                    <div className="logo-icon-container">
                        🚂
                    </div>

                    <span className="logo-text">
                        TrainPorter
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="navbar-links desktop-only">
                    <a href="#features" className="nav-link">
                        Features
                    </a>

                    <a href="#how-it-works" className="nav-link">
                        How it Works
                    </a>

                    <a href="#stations" className="nav-link">
                        Stations
                    </a>

                    <Link
                        to="/history"
                        className="nav-link"
                    >
                        My Bookings
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="navbar-actions desktop-only">

                    {isLoggedIn ? (
                        <>
                            <button
                                className="login-link-btn"
                                onClick={() =>
                                    navigate('/dashboard')
                                }
                            >
                                Dashboard
                            </button>

                            <Button
                                size="sm"
                                className="navbar-cta"
                                onClick={() =>
                                    navigate('/dashboard')
                                }
                            >
                                My Account
                            </Button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={openAuth}
                                className="login-link-btn"
                            >
                                Login
                            </button>

                            <Button
                                size="sm"
                                className="navbar-cta"
                                onClick={openAuth}
                            >
                                Book Porter
                            </Button>
                        </>
                    )}

                </div>

                {/* Mobile Toggle */}
                <button
                    className={`mobile-toggle ${
                        mobileMenuOpen ? 'open' : ''
                    }`}
                    onClick={() =>
                        setMobileMenuOpen(!mobileMenuOpen)
                    }
                    aria-label="Toggle Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Drawer */}
            <div
                className={`mobile-menu-drawer ${
                    mobileMenuOpen ? 'open' : ''
                }`}
            >
                <div className="mobile-menu-links">

                    <a
                        href="#features"
                        onClick={() =>
                            setMobileMenuOpen(false)
                        }
                    >
                        Features
                    </a>

                    <a
                        href="#how-it-works"
                        onClick={() =>
                            setMobileMenuOpen(false)
                        }
                    >
                        How it Works
                    </a>

                    <a
                        href="#stations"
                        onClick={() =>
                            setMobileMenuOpen(false)
                        }
                    >
                        Stations
                    </a>

                    <Link
                        to="/history"
                        onClick={() =>
                            setMobileMenuOpen(false)
                        }
                    >
                        My Bookings
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <button
                                className="mobile-login-btn-link"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    navigate('/dashboard');
                                }}
                            >
                                Dashboard
                            </button>

                            <Button
                                className="btn-full"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    navigate('/dashboard');
                                }}
                            >
                                My Account
                            </Button>
                        </>
                    ) : (
                        <>
                            <button
                                className="mobile-login-btn-link"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    openAuth();
                                }}
                            >
                                Login
                            </button>

                            <Button
                                className="btn-full"
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    openAuth();
                                }}
                            >
                                Book Porter Now
                            </Button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;