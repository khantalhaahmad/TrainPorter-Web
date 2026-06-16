import React from "react";
import "./BlogPage.css";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaClock,
  FaUser,
  FaSearch
} from "react-icons/fa";

import trainLogo from "../../assets/hero.png";

const blogs = [
  {
    id: 1,
    category: "Travel Tips",
    title: "How to Book a Railway Porter Online",
    description:
      "Learn how TrainPorter helps passengers book verified railway porters before reaching the station.",
    image: trainLogo,
    author: "TrainPorter Team",
    date: "June 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Railway Guide",
    title: "Indian Railway Luggage Rules Explained",
    description:
      "Everything you need to know about carrying luggage on Indian Railways.",
    image: trainLogo,
    author: "TrainPorter Team",
    date: "June 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "Safety",
    title: "Traveling Safely with Heavy Luggage",
    description:
      "Tips to ensure a safe and stress-free railway journey.",
    image: trainLogo,
    author: "TrainPorter Team",
    date: "June 2026",
    readTime: "6 min read",
  },
  {
    id: 4,
    category: "Travel Tips",
    title: "Platform Change? Here's What To Do",
    description:
      "A complete guide to handling last-minute platform changes.",
    image: trainLogo,
    author: "TrainPorter Team",
    date: "June 2026",
    readTime: "3 min read",
  },
  {
    id: 5,
    category: "Senior Citizens",
    title: "Travel Guide for Senior Citizens",
    description:
      "How elderly passengers can enjoy comfortable railway journeys.",
    image: trainLogo,
    author: "TrainPorter Team",
    date: "June 2026",
    readTime: "7 min read",
  },
  {
    id: 6,
    category: "Station Guide",
    title: "Benefits of Advance Porter Booking",
    description:
      "Why booking a porter before arriving at the station saves time.",
    image: trainLogo,
    author: "TrainPorter Team",
    date: "June 2026",
    readTime: "4 min read",
  },
];

const BlogPage = () => {
  return (
    <div className="blog-page">

      {/* HERO */}
      <section className="blog-hero">
        <div className="container">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="blog-badge">
              🚆 TrainPorter Insights
            </span>

            <h1>
              Travel Smarter,
              <span> Journey Better</span>
            </h1>

            <p>
              Discover railway travel guides, luggage assistance tips,
              station insights and expert advice from TrainPorter.
            </p>

            <div className="search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search articles..."
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* FEATURED */}
      <section className="featured-section">
        <div className="container">

          <h2>Featured Article</h2>

          <motion.div
            className="featured-card"
            whileHover={{ scale: 1.01 }}
          >
            <img
              src={trainLogo}
              alt="Featured Blog"
            />

            <div className="featured-content">
              <span className="category">
                Travel Guide
              </span>

              <h3>
                How to Book a Railway Porter Online
              </h3>

              <p>
                Learn how TrainPorter simplifies luggage assistance
                by helping passengers connect with verified railway
                porters before reaching the station.
              </p>

              <button>
                Read Article <FaArrowRight />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="container">

          <h2>Explore Topics</h2>

          <div className="categories">
            <button>Travel Tips</button>
            <button>Railway Guides</button>
            <button>Safety</button>
            <button>Station Updates</button>
            <button>Porter Services</button>
            <button>Senior Citizens</button>
          </div>

        </div>
      </section>

      {/* BLOG GRID */}
      <section className="latest-blogs">
        <div className="container">

          <h2>Latest Articles</h2>

          <div className="blog-grid">

            {blogs.map((blog) => (
              <motion.div
                key={blog.id}
                className="blog-card"
                whileHover={{
                  y: -10,
                }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                />

                <div className="blog-content">

                  <span className="blog-category">
                    {blog.category}
                  </span>

                  <h3>{blog.title}</h3>

                  <p>{blog.description}</p>

                  <div className="blog-meta">

                    <span>
                      <FaUser />
                      {blog.author}
                    </span>

                    <span>
                      <FaClock />
                      {blog.readTime}
                    </span>

                  </div>

                  <button className="read-btn">
                    Read More
                    <FaArrowRight />
                  </button>

                </div>
              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter-section">
        <div className="container">

          <h2>
            Get Travel Tips in Your Inbox
          </h2>

          <p>
            Subscribe to receive railway travel guides,
            luggage tips and TrainPorter updates.
          </p>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>
              Subscribe
            </button>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="blog-cta">
        <div className="container">

          <h2>
            Need Help With Your Luggage?
          </h2>

          <p>
            Book a verified railway porter and enjoy
            a stress-free journey.
          </p>

          <button>
            Book a Porter
          </button>

        </div>
      </section>

    </div>
  );
};

export default BlogPage;