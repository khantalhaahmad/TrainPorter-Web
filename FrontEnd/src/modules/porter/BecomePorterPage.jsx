
import { motion } from "framer-motion";
import "./BecomePorterPage.css";
import React, { useState } from "react";
import porterImage from "../../assets/porter-profile copy.png";
import CountUp from "react-countup";

const benefits = [
  {
    title: "Flexible Working Hours",
    desc: "Work whenever you want and earn according to your schedule.",
    icon: "⏰",
  },
  {
    title: "Daily Earnings",
    desc: "Receive payments quickly and track your income in real-time.",
    icon: "💰",
  },
  {
    title: "Verified Customers",
    desc: "Serve genuine passengers through TrainPorter.",
    icon: "✅",
  },
  {
    title: "Performance Bonuses",
    desc: "Top-rated porters get extra rewards every month.",
    icon: "🏆",
  },
];

const documents = [
  "Aadhaar Card",
  "PAN Card",
  "Passport Size Photo",
  "Bank Account Details",
  "Mobile Number",
  "Police Verification Certificate",
];

const eligibility = [
  "18+ years age",
  "Indian Citizen",
  "Physically fit",
  "Basic smartphone usage",
  "Valid Aadhaar",
  "No serious criminal record",
];

const processSteps = [
  {
    icon: "📝",
    title: "Apply Online",
    desc: "Fill out the TrainPorter application form with your personal and contact details."
  },
  {
    icon: "📄",
    title: "Upload Documents",
    desc: "Submit Aadhaar Card, PAN Card, bank details and passport-size photograph."
  },
  {
    icon: "🔍",
    title: "Verification",
    desc: "Our team verifies your identity, documents and background information."
  },
  
  {
    icon: "✅",
    title: "Account Approval",
    desc: "Receive approval and activate your verified TrainPorter partner account."
  },
  {
    icon: "💰",
    title: "Start Earning",
    desc: "Accept porter requests, assist passengers and earn daily income."
  }
];


const testimonials = [
  {
    name: "Ramesh Kumar",
    station: "New Delhi Junction",
    earning: "₹24,500/month",
    jobs: "1280+",
    experience: "3 Years",
    rating: "4.9",
    image: porterImage
  },
  {
    name: "Mohammed Salim",
    station: "Secunderabad Junction",
    earning: "₹18,700/month",
    jobs: "940+",
    experience: "2 Years",
    rating: "4.8",
    image: porterImage
  },
  {
    name: "Ravi Kumar",
    station: "Patna Junction",
    earning: "₹21,300/month",
    jobs: "1560+",
    experience: "4 Years",
    rating: "5.0",
    image: porterImage
  }
];
const openings = [
  "New Delhi Railway Station - 12 Openings",
  "Howrah Junction - 20 Openings",
  "Patna Junction - 15 Openings",
  "Secunderabad Junction - 8 Openings",
  "Mumbai CST - 18 Openings",
  "Bengaluru City - 10 Openings",
];

const faqs = [
  {
    q: "How much can I earn?",
    a: "Most active porters earn between ₹15,000 and ₹60,000 per month depending on station traffic and working hours.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. TrainPorter provides onboarding guidance and training.",
  },
  {
    q: "How long does verification take?",
    a: "Verification generally takes between 24 to 72 hours.",
  },
  {
    q: "Can I work part-time?",
    a: "Yes. You can choose flexible working hours.",
  },
];

const BecomePorterPage = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

const toggleFAQ = (index) => {
  setOpenFAQ(openFAQ === index ? null : index);
};
  return (
    <div className="become-porter-page">
      {/* HERO SECTION */}

      <section className="porter-hero">
        <div className="container porter-hero-container">
          <motion.div
            className="porter-hero-content"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="hero-badge">
              🚉 India's First Digital Porter Platform
            </span>

       <h1>
  Become a Verified Railway Porter &
  <span> Earn With TrainPorter</span>
</h1>

            <p>
              Join India's fastest-growing railway assistance network.
              Help travelers, earn daily income and build a trusted
              career with TrainPorter.
            </p>

            <div className="hero-actions">
              <a
                href="/porter-application"
                className="primary-btn"
              >
                Apply Now
              </a>

              <a
                href="#process"
                className="secondary-btn"
              >
                Learn More
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <h3>500+</h3>
                <p>Verified Porters</p>
              </div>

              <div>
                <h3>50+</h3>
                <p>Stations</p>
              </div>

              <div>
                <h3>₹60K</h3>
                <p>Monthly Potential</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="porter-hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <img
              src={porterImage}
              alt="TrainPorter Porter"
            />
          </motion.div>
        </div>
      </section>

      {/* BENEFITS */}

      <section className="benefits-section">
        <div className="container">
          <div className="section-header">
            <span>WHY JOIN US</span>
            <h2>Benefits of Becoming a Porter</h2>
          </div>

          <div className="benefits-grid">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                className="benefit-card"
                whileHover={{ y: -8 }}
              >
                <div className="benefit-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}

      <section
        className="process-section"
        id="process"
      >
        <div className="container">
          <div className="section-header">
            <span>APPLICATION PROCESS</span>
            <h2>How To Become A Porter</h2>
          </div>

         <div className="timeline">

  {processSteps.map((step, index) => (
    <motion.div
      key={index}
      className="timeline-card"
      initial={{
        opacity: 0,
        y: 50
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: index * 0.15
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -12,
        scale: 1.04
      }}
    >
      <div className="timeline-icon">
        {step.icon}
      </div>

      <div className="timeline-number">
        {index + 1}
      </div>

      <h3>{step.title}</h3>

      <p>{step.desc}</p>
    </motion.div>
  ))}

</div>
        </div>
      </section>

      {/* EARNINGS */}

      <section className="earnings-section">
        <div className="container">
          <div className="section-header">
            <span>EARNINGS</span>
            <h2>Your Income Potential</h2>
          </div>

          <div className="earnings-grid">
            <div className="earning-card">
              <h3>₹600+</h3>
              <p>Average Daily Earnings</p>
            </div>

            <div className="earning-card">
              <h3>₹4,200+</h3>
              <p>Average Weekly Earnings</p>
            </div>

            <div className="earning-card">
              <h3>₹25K - ₹60K</h3>
              <p>Monthly Income Potential</p>
            </div>
          </div>
        </div>
      </section>

      {/* ELIGIBILITY */}

      <section className="eligibility-section">
        <div className="container">
          <div className="section-header">
            <span>ELIGIBILITY</span>
            <h2>Who Can Apply?</h2>
          </div>

          <div className="eligibility-grid">
            {eligibility.map((item, index) => (
              <div
                key={index}
                className="eligibility-card"
              >
                ✅ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}

      <section className="documents-section">
        <div className="container">
          <div className="section-header">
            <span>DOCUMENTS</span>
            <h2>Required Documents</h2>
          </div>

          <div className="documents-grid">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="document-card"
              >
                📄 {doc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}

      <section className="opening-section">
        <div className="container">
          <div className="section-header">
            <span>CURRENT OPENINGS</span>
            <h2>Stations Hiring Now</h2>
          </div>

          <div className="opening-grid">
            {openings.map((item, index) => (
              <div
                key={index}
                className="opening-card"
              >
                🚉 {item}
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* SUCCESS STORIES */}

<section className="testimonial-section">
  <div className="container">

    <div className="section-header">
      <span>SUCCESS STORIES</span>
      <h2>Meet Our Top Porters</h2>
      <p>
        Real TrainPorter partners serving passengers across India's busiest railway stations.
      </p>
    </div>

    <div className="testimonial-grid">

      {testimonials.map((item, index) => (
        <motion.div
          key={index}
          className="porter-card"
          initial={{
            opacity: 0,
            y: 60
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.15
          }}
          viewport={{
            once: true
          }}
          whileHover={{
            y: -12,
            scale: 1.03
          }}
        >

          <div className="porter-card-top">

            <img
              src={item.image}
              alt={item.name}
              className="porter-avatar"
            />

            <div className="verified-badge">
              ✓ Verified
            </div>

          </div>

          <div className="porter-card-body">

            <h3>{item.name}</h3>

            <p className="porter-station">
              🚉 {item.station}
            </p>

            <div className="porter-rating">
              ⭐⭐⭐⭐⭐
              <span> {item.rating}</span>
            </div>

            <div className="porter-stats-box">

              <div className="porter-stat">
                <strong>{item.jobs}</strong>
                <span>Jobs Done</span>
              </div>

              <div className="porter-stat">
                <strong>{item.experience}</strong>
                <span>Experience</span>
              </div>

            </div>

            <div className="porter-income-box">
              <span>Average Earnings</span>
              <strong>{item.earning}</strong>
            </div>

          </div>

        </motion.div>
      ))}

    </div>

  </div>
</section>

      {/* FAQ */}

<section className="faq-section">
  <div className="container">
    <div className="section-header">
      <span>FAQ</span>
      <h2>Frequently Asked Questions</h2>
    </div>

    <div className="faq-list">
      {faqs.map((item, index) => (
        <div
          key={index}
          className={`faq-card ${
            openFAQ === index ? "active" : ""
          }`}
        >
          <div
            className="faq-question"
            onClick={() => toggleFAQ(index)}
          >
            <h3>{item.q}</h3>

            <span className="faq-icon">
              {openFAQ === index ? "−" : "+"}
            </span>
          </div>

          <div
            className={`faq-answer ${
              openFAQ === index ? "show" : ""
            }`}
          >
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* FINAL CTA */}

      <section className="apply-cta">
        <div className="container">
          <motion.div
            className="apply-cta-box"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>
              Ready To Start Your Journey With TrainPorter?
            </h2>

            <p>
              Join hundreds of verified railway porters already
              earning through India's fastest growing porter
              network.
            </p>

            <a
              href="/porter-application"
              className="apply-btn-large"
            >
              Apply Now →
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BecomePorterPage;