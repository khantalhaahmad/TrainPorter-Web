import React, { useState } from "react";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  UserCheck,
  CreditCard,
  BarChart3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAdminAuth } from "../../context/AdminAuthContext";

import "./AdminLoginPage.css";


const AdminLoginPage = () => {

  const navigate = useNavigate();

  const { login } = useAdminAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  /* ==========================================================
     INPUT CHANGE
  ========================================================== */

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };


  /* ==========================================================
     LOGIN
  ========================================================== */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    try {

      setLoading(true);

      await login(
        formData.email,
        formData.password
      );

      navigate("/admin");

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <main className="tp-admin-login-page">

      <div className="tp-admin-login-shell">


        {/* ==================================================
            LEFT BRAND / VISUAL PANEL
        ================================================== */}

        <section className="tp-admin-login-visual">


          {/* Background image */}

          <div className="tp-admin-login-visual-image" />


          {/* Dark overlay */}

          <div className="tp-admin-login-visual-overlay" />


          {/* Content */}

          <div className="tp-admin-login-visual-content">


            {/* BRAND */}

            <div className="tp-admin-brand">

              <img
                src="/logo.png"
                alt="TrainPorter"
              />

              <div>

                <strong>
                  TrainPorter
                </strong>

                <span>
                  Admin Portal
                </span>

              </div>

            </div>


            {/* HERO */}

            <div className="tp-admin-login-hero">

              <h1>

                Smart. Secure.

                <span>
                  Seamless.
                </span>

              </h1>

              <p>

                Manage porters, bookings, and
                operations all in one powerful
                admin dashboard.

              </p>

            </div>


            {/* FEATURES */}

            <div className="tp-admin-login-features">


              <div className="tp-admin-feature">

                <div className="tp-admin-feature-icon">
                  <CalendarCheck size={18} />
                </div>

                <span>
                  Real-time Booking Management
                </span>

              </div>


              <div className="tp-admin-feature">

                <div className="tp-admin-feature-icon">
                  <UserCheck size={18} />
                </div>

                <span>
                  Porter Verification & Tracking
                </span>

              </div>


              <div className="tp-admin-feature">

                <div className="tp-admin-feature-icon">
                  <CreditCard size={18} />
                </div>

                <span>
                  Secure Payments & Reports
                </span>

              </div>


              <div className="tp-admin-feature">

                <div className="tp-admin-feature-icon">
                  <BarChart3 size={18} />
                </div>

                <span>
                  Analytics & Insights
                </span>

              </div>


            </div>


            {/* TRUST CARD */}

            <div className="tp-admin-trust-card">

              <div className="tp-admin-trust-icon">

                <ShieldCheck size={27} />

              </div>

              <div>

                <strong>
                  Trusted by 10,000+ users
                </strong>

                <span>
                  Powering smarter railway
                  services across India.
                </span>

              </div>

            </div>


          </div>

        </section>


        {/* ==================================================
            RIGHT LOGIN PANEL
        ================================================== */}

        <section className="tp-admin-login-form-panel">


          {/* Decorative dots */}

          <div className="tp-login-decoration" />


          <div className="tp-admin-login-form-wrapper">


            {/* HEADER */}

            <div className="tp-admin-form-header">

              <div className="tp-admin-mobile-brand">

                <img
                  src="/logo.png"
                  alt="TrainPorter"
                />

                <span>
                  TrainPorter
                </span>

              </div>


              <h2>
                Welcome Back! <span>👋</span>
              </h2>

              <p>
                Login to your TrainPorter admin account
              </p>

            </div>


            {/* FORM */}

            <form
              className="tp-admin-login-form"
              onSubmit={handleSubmit}
            >


              {/* EMAIL */}

              <div className="tp-admin-form-group">

                <label htmlFor="admin-email">
                  Email Address
                </label>

                <div className="tp-admin-input">

                  <Mail size={18} />

                  <input
                    id="admin-email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div className="tp-admin-form-group">

                <label htmlFor="admin-password">
                  Password
                </label>

                <div className="tp-admin-input">

                  <Lock size={18} />

                  <input
                    id="admin-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="tp-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>


              {/* OPTIONS */}

              <div className="tp-admin-login-options">

                <label className="tp-remember-me">

                  <input
                    type="checkbox"
                    defaultChecked
                  />

                  <span>
                    Remember Me
                  </span>

                </label>


                <button
                  type="button"
                  className="tp-forgot-password"
                >
                  Forgot Password?
                </button>

              </div>


              {/* LOGIN */}

              <button
                type="submit"
                className="tp-admin-login-btn"
                disabled={loading}
              >

                <span>

                  {loading
                    ? "Signing In..."
                    : "Login to Dashboard"}

                </span>


                {!loading && (
                  <ArrowRight size={18} />
                )}

              </button>


              {/* DIVIDER */}

              <div className="tp-login-divider">

                <span />

                <small>
                  or continue with
                </small>

                <span />

              </div>


              {/* GOOGLE */}

              <button
                type="button"
                className="tp-google-login-btn"
              >

                <span className="tp-google-icon">
                  G
                </span>

                <span>
                  Login with Google
                </span>

              </button>


              {/* SECURITY */}

              <div className="tp-login-security">

                <ShieldCheck size={16} />

                <span>
                  Secure access. Only authorized
                  administrators.
                </span>

              </div>


            </form>

          </div>

        </section>


      </div>

    </main>

  );

};


export default AdminLoginPage;