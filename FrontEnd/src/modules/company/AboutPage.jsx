import React from "react";
import "./AboutPage.css";
import { Link } from "react-router-dom";
import "./AboutPage.css";
import trainLogo from "../../assets/hero.png"; // ya favicon1.png ko assets me move karke use karo
const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
<section className="about-hero">
  <div className="container">

    <div className="hero-content">

      <div className="hero-left">

        <span className="hero-badge">
          🚆 India's Railway Luggage Platform
        </span>

        <h1>
          Moving Luggage,
          <span> Simplifying Journeys</span>
        </h1>

        <p>
          TrainPorter connects travelers with verified railway porters,
          helping passengers move luggage safely and effortlessly across
          railway stations. Our mission is to make railway travel more
          comfortable, reliable and stress-free for millions of passengers.
        </p>

        <div className="hero-buttons">

          <Link
            to="/book"
            className="primary-btn"
          >
            Book Porter
          </Link>

          <Link
            to="/become-porter"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-btn"
          >
            Become a Porter
          </Link>

        </div>

      </div>

      <div className="hero-right">

        <img
          src={trainLogo}
          alt="TrainPorter"
          className="hero-image"
        />

      </div>

    </div>

    {/* Stats Section */}

    <div className="hero-stats">

      <div className="about-stat-card">
        <h3>10K+</h3>
        <p>Bookings Completed</p>
      </div>

      <div className="about-stat-card">
        <h3>500+</h3>
        <p>Verified Porters</p>
      </div>

      <div className="about-stat-card">
        <h3>25+</h3>
        <p>Stations Covered</p>
      </div>

      <div className="about-stat-card">
        <h3>4.9★</h3>
        <p>Customer Rating</p>
      </div>

    </div>

  </div>
</section>
      {/* Our Story */}
      <section className="about-section">
        <div className="container">
          <h2>Our Story</h2>

          <p>
            Every day, millions of passengers travel across India's railway
            network carrying heavy luggage, suitcases, and travel essentials.
            Finding reliable luggage assistance at crowded stations can be
            stressful and time-consuming.
          </p>

          <p>
            TrainPorter was created to bridge this gap by bringing railway
            luggage assistance into the digital age. We help travelers book
            verified porters in advance, ensuring a smooth and comfortable
            station experience.
          </p>
        </div>
      </section>
      <section className="timeline-section">
  <div className="container">
    <h2>Our Journey</h2>

    <div className="timeline">

      <div className="timeline-item">
        <span>2025</span>
        <h4>Idea Born</h4>
      </div>

      <div className="timeline-item">
        <span>2026</span>
        <h4>Platform Developed</h4>
      </div>

      <div className="timeline-item">
        <span>2026</span>
        <h4>First Station Launch</h4>
      </div>

      <div className="timeline-item">
        <span>2027</span>
        <h4>Nationwide Expansion</h4>
      </div>

    </div>
  </div>
</section>

      {/* Mission Vision */}
      <section className="mission-vision">
        <div className="container mission-grid">
          <div className="mission-card">
            <h2>🎯 Our Mission</h2>
            <p>
              To make railway travel more accessible, comfortable, and
              stress-free by providing reliable luggage assistance at every
              major railway station in India.
            </p>
          </div>

          <div className="mission-card">
            <h2>🚀 Our Vision</h2>
            <p>
              To become India's most trusted railway assistance platform,
              empowering both travelers and railway porters through technology.
            </p>
          </div>
        </div>
      </section>

<section className="why-section">
  <div className="container">
    <h2>Why Choose TrainPorter?</h2>

    <div className="why-grid">

      <div className="why-card">
        🛡️
        <h3>Verified Porters</h3>
      </div>

      <div className="why-card">
        📍
        <h3>Live Tracking</h3>
      </div>

      <div className="why-card">
        💳
        <h3>Secure Payments</h3>
      </div>

      <div className="why-card">
        ⚡
        <h3>Instant Booking</h3>
      </div>

      <div className="why-card">
        📞
        <h3>24/7 Support</h3>
      </div>

      <div className="why-card">
        🚉
        <h3>Station Coverage</h3>
      </div>

    </div>
  </div>
</section>

      {/* What We Do */}
      <section className="about-section">
        <div className="container">
          <h2>What We Do</h2>

          <div className="features-grid">
            <div className="feature-card">
              <h3>📱 Easy Booking</h3>
              <p>
                Book a verified porter in just a few clicks before arriving at
                the station.
              </p>
            </div>

            <div className="feature-card">
              <h3>🛡️ Verified Porters</h3>
              <p>
                Every porter is verified to ensure safety, reliability, and
                professionalism.
              </p>
            </div>

            <div className="feature-card">
              <h3>💰 Transparent Pricing</h3>
              <p>
                No hidden charges. Know the service fee before confirming your
                booking.
              </p>
            </div>

            <div className="feature-card">
              <h3>⚡ Real-Time Updates</h3>
              <p>
                Stay informed with booking updates and porter assignment status.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="testimonial-section">
  <div className="container">
    <h2>What Travelers Say</h2>

    <div className="testimonial-grid">

      <div className="testimonial-card">
        ⭐⭐⭐⭐⭐
        <p>
          Saved me during a last-minute platform change.
          Extremely helpful.
        </p>
        <h4>Rahul • Hyderabad</h4>
      </div>

      <div className="testimonial-card">
        ⭐⭐⭐⭐⭐
        <p>
          Perfect service for senior citizens carrying
          heavy luggage.
        </p>
        <h4>Priya • Bengaluru</h4>
      </div>

      <div className="testimonial-card">
        ⭐⭐⭐⭐⭐
        <p>
          Booking was simple and the porter arrived
          exactly on time.
        </p>
        <h4>Amit • Mumbai</h4>
      </div>

    </div>
  </div>
</section>


      {/* Core Values */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>

          <div className="values-grid">
            <div className="value-card">
              <h3>Trust</h3>
              <p>
                We prioritize safety, transparency, and reliability in every
                booking.
              </p>
            </div>

            <div className="value-card">
              <h3>Customer First</h3>
              <p>
                Every feature we build focuses on improving the passenger
                experience.
              </p>
            </div>

            <div className="value-card">
              <h3>Innovation</h3>
              <p>
                We use technology to solve real-world travel problems.
              </p>
            </div>

            <div className="value-card">
              <h3>Accessibility</h3>
              <p>
                Railway travel should be convenient and accessible for
                everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

<section className="safety-section">
  <div className="container">
    <h2>Safety & Trust</h2>

    <div className="safety-grid">

      <div className="safety-card">
        🔐
        <h3>ID Verification</h3>
      </div>

      <div className="safety-card">
        ⭐
        <h3>Rating System</h3>
      </div>

      <div className="safety-card">
        📞
        <h3>Customer Support</h3>
      </div>

      <div className="safety-card">
        🏦
        <h3>Secure Payments</h3>
      </div>

    </div>
  </div>
</section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <h2>Join Our Journey</h2>

          <p>
            Whether you're a traveler looking for hassle-free luggage support or
            a porter seeking new opportunities, TrainPorter is here to make
            every journey smoother.
          </p>

          <button className="cta-btn">
            Book a Porter
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;