import React, { useState, useEffect } from "react";
import "./TrustSection.css";

import {
  Star,
  BadgeCheck,
  Quote,
} from "lucide-react";

const testimonials = [
  {
    name: "Ramesh Kumar",
    role: "Verified Porter • New Delhi",
    rating: 5,
    review:
      "TrainPorter completely changed the way I work. I now receive verified passenger bookings every day and payments are always on time.",
  },
  {
    name: "Imran Ali",
    role: "Verified Porter • Patna",
    rating: 5,
    review:
      "The application process was smooth and support was very helpful. Flexible working hours help me earn more during busy railway schedules.",
  },
  {
    name: "Sanjay Singh",
    role: "Verified Porter • Gaya Junction",
    rating: 5,
    review:
      "Passengers trust the platform and bookings are genuine. The weekly payment system is secure and transparent.",
  },
  {
    name: "Amit Sharma",
    role: "Verified Porter • Lucknow",
    rating: 5,
    review:
      "Since joining TrainPorter, my daily bookings have increased and I earn consistently while serving passengers professionally.",
  },
  {
    name: "Mohammed Arif",
    role: "Verified Porter • Howrah",
    rating: 5,
    review:
      "The verification process builds passenger trust. Payments are always received on time without any hassle.",
  },
  {
    name: "Rajesh Yadav",
    role: "Verified Porter • Varanasi",
    rating: 5,
    review:
      "I appreciate the easy booking system and excellent customer support. It has made my work more organized and reliable.",
  },
  {
    name: "Vikram Singh",
    role: "Verified Porter • Kanpur Central",
    rating: 5,
    review:
      "TrainPorter helped me connect with more genuine passengers. The platform is secure, transparent and easy to use.",
  },
  {
    name: "Ashok Das",
    role: "Verified Porter • Bhubaneswar",
    rating: 5,
    review:
      "Flexible working hours and regular bookings have significantly improved my monthly income. I highly recommend becoming a partner.",
  },
  {
    name: "Sunil Kumar",
    role: "Verified Porter • Prayagraj",
    rating: 5,
    review:
      "The app is simple to use and passengers appreciate verified porters. Every booking feels safe and professional.",
  },
  {
    name: "Pawan Mishra",
    role: "Verified Porter • Mumbai CSMT",
    rating: 5,
    review:
      "Excellent platform for porters. Transparent pricing, instant booking updates and dependable weekly payouts make it a great experience.",
  },
];
const TrustSection = () => {
    const [current, setCurrent] = useState(0);

useEffect(() => {

  const timer = setInterval(() => {

    setCurrent((prev) => (prev + 1) % testimonials.length);

  }, 3000);

  return () => clearInterval(timer);

}, []);
  return (

    <section className="bp-trust-section">

      {/* ================= TESTIMONIALS ================= */}
      {/* ================= BOTTOM ================= */}

      <div className="bp-trust-wrapper">

    <div className="bp-trust-left">

        <div className="bp-trust-left-icon">

            <BadgeCheck size={46}/>

        </div>

        <div>

            <h2>

                Trusted by Thousands of Porters Across India

            </h2>

            <p>

                Start your journey with TrainPorter today and become a part of India's most trusted luggage assistance network.

            </p>

        </div>

    </div>

    <div className="bp-trust-slider">

        <Quote
            size={34}
            className="bp-trust-quote"
        />

        <p>

            "{testimonials[current].review}"

        </p>

        <strong>

            - {testimonials[current].name}

        </strong>

        <span>

            {testimonials[current].role}

        </span>

        <div className="bp-trust-dots">

            {testimonials.map((_,index)=>(

                <span

                    key={index}

                    className={

                        current===index

                        ?

                        "bp-dot active"

                        :

                        "bp-dot"

                    }

                />

            ))}

        </div>

    </div>

</div>

<div className="bp-trust-footer">

  🔒 By continuing, you agree to our{" "}

  <span>Terms & Conditions</span>

  {" "}and{" "}

  <span>Privacy Policy</span>

</div>

    </section>

  );

};

export default TrustSection;