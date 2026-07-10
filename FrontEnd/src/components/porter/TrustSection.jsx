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