import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import './BookPorterPage.css';
import { motion } from "framer-motion";
import {
    Train,
    Package,
    CreditCard,
    MapPin,
    Phone,
    Ticket,
    Hash
} from "lucide-react";

const BookPorterPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [luggage, setLuggage] = useState({
        small: 0,
        medium: 0,
        large: 0
    });

const [bookingData, setBookingData] = useState({
    trainNumber: '',
    trainName: '',
    station: '',
    coach: '',
    seatNumber: '',
    phone: '',
});

    const updateLuggage = (type, val) => {
        setLuggage(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + val)
        }));
    };

    const totalItems = luggage.small + luggage.medium + luggage.large;

 const handleNextStep = () => {

    if (
        bookingData.trainNumber.length < 5 ||
        bookingData.trainNumber.length > 6
    ) {
        alert('Train number must be 5-6 digits');
        return;
    }

  if (bookingData.trainName.trim().length < 3) {
    alert('Train name is too short');
    return;
}

    if (!bookingData.coach.trim()) {
        alert('Enter coach number');
        return;
    }

    if (
        Number(bookingData.seatNumber) < 1 ||
        Number(bookingData.seatNumber) > 99
    ) {
        alert('Enter valid seat number');
        return;
    }

    if (bookingData.phone.length !== 10) {
        alert('Enter valid mobile number');
        return;
    }

    setStep(2);
};
const handleFarePage = () => {

    if (totalItems === 0) {
        alert("Select at least one luggage item");
        return;
    }

    localStorage.setItem(
        "bookingData",
        JSON.stringify({
            ...bookingData,
            luggageCount: totalItems,
        })
    );

    navigate("/fare");
};

    return (
        <DashboardLayout>
            <div className="book-page fade-in">
                <div className="booking-hero">

    <div className="hero-badge">
        VERIFIED RAILWAY PORTER SERVICE
    </div>

    <h1>
        Book Your Porter
    </h1>

    <p>
        Secure luggage assistance with verified railway porters.
        Fast pickup, OTP verification and live tracking.
    </p>

</div>
                {/* Progress Tracker */}
                <div className="booking-progress">
                    {[
                        { n: 1, l: 'Details' },
                        { n: 2, l: 'Luggage' },
                        { n: 3, l: 'Confirm' }
                    ].map((s) => (
                        <div key={s.n} className={`progress-step ${step >= s.n ? 'active' : ''}`}>
                            <div className="step-number">{s.n}</div>
                           <div className="step-text">

<strong>

{s.title}

</strong>

<small>

{s.sub}

</small>

</div>
                        </div>
                    ))}
                    <div className="progress-line">
                        <div className="progress-line-fill" style={{ width: `${(step - 1) * 50}%` }}></div>
                    </div>
                </div>

                <div className="book-grid">
                    <div className="book-main">
                        {step === 1 && (
                            <Card className="booking-card-premium">
                               <div className="card-header-inner">

<div className="card-icon">

</div>

<div>

<h2>

Journey Information

</h2>

<p>

Provide your train details to connect with the nearest verified porter.

</p>

</div>

</div>

<div className="form-grid">

    <Input
    label="Train Number"
    placeholder="Train number"
    maxLength={6}
    value={bookingData.trainNumber}
    onChange={(e) => {
        const value = e.target.value.replace(/\D/g, '');

        if (value.length <= 6) {
            setBookingData({
                ...bookingData,
                trainNumber: value,
            });
        }
    }}
    icon={<Train size={18}/>}
/>

    <Input
        label="Train Name"
        placeholder="Train Name"
        icon={<Train size={18}/>}
        value={bookingData.trainName}
        onChange={(e) => {
    const value = e.target.value;

    if (/^[A-Za-z\s]*$/.test(value)) {
        setBookingData({
            ...bookingData,
            trainName: value,
        });
    }
}}
    />

    <Input
        label="Station"
        placeholder="Station Name"
       icon={<MapPin size={18}/>}
        value={bookingData.station}
        onChange={(e) =>
            setBookingData({
                ...bookingData,
                station: e.target.value,
            })
        }
    />

    <div className="row-grid">
       <Input
    label="Coach"
    placeholder="Coach Number"
    maxLength={3}
    icon={<Ticket size={18}/>}
    value={bookingData.coach}
    onChange={(e) => {
        let value = e.target.value.toUpperCase();

        if (/^[A-Z]{0,2}[0-9]{0,2}$/.test(value)) {
            setBookingData({
                ...bookingData,
                coach: value,
            });
        }
    }}
/>
        <Input
    label="Seat/Berth"
    placeholder="Seat/Berth Number"
    maxLength={2}
   icon={<Hash size={18} />}
    value={bookingData.seatNumber}
    onChange={(e) => {
        const value = e.target.value.replace(/\D/g, '');

        if (value.length <= 2) {
            setBookingData({
                ...bookingData,
                seatNumber: value,
            });
        }
    }}
/>

    </div>

    <Input
        label="Contact Number"
        placeholder="Enter mobile number"
       icon={<Phone size={18}/>}
        value={bookingData.phone}
        onChange={(e) => {
    const value = e.target.value.replace(/\D/g, '');

    if (value.length <= 10) {
        setBookingData({
            ...bookingData,
            phone: value,
        });
    }
}}
    />
</div>
<div className="trust-box">

  <div className="trust-item">
    <span>✔</span>
    Railway Verified
  </div>

  <div className="trust-item">
    <span>✔</span>
    OTP Protection
  </div>

  <div className="trust-item">
    <span>✔</span>
    Live Tracking
  </div>

  <div className="trust-item">
    <span>✔</span>
    Insured Service
  </div>

</div>
<div className="form-actions-premium">
    <Button
        size="lg"
        className="btn-full"
        onClick={handleNextStep}
    >
        Next: Select Luggage →
    </Button>
</div>
                            </Card>
                        )}

                        {step === 2 && (
                          <motion.div

initial={{
opacity:0,
y:40
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.45
}}

>

<Card
className="booking-card-premium">
                                <div className="card-header-inner">
                                    <h2>Select Luggage</h2>
                                    <p className="text-muted">Choose the items you need assistance with</p>
                                </div>
                                <div className="luggage-selection-grid">
                                    {[
                                        { id: 'small', label: 'Small Bag', sub: 'Handbags, Backpacks', icon: '🎒', color: '#F0FDF4' },
                                        { id: 'medium', label: 'Medium Suitcase', sub: 'Check-in luggage', icon: '🧳', color: '#EFF6FF' },
                                        { id: 'large', label: 'Extra Large', sub: 'Oversized trunks', icon: '📦', color: '#FFF7ED' },
                                    ].map((item) => (
                                      
                                      <motion.div

layout

whileHover={{

y:-5,

scale:1.02

}}

whileTap={{

scale:.98

}}

className={`luggage-item-premium ${
luggage[item.id]>0 ? "selected":""
}`}


>
    
                                            <div className="luggage-visual" style={{ backgroundColor: item.color }}>{item.icon}</div>
                                            <div className="luggage-info">
                                                <strong>{item.label}</strong>
                                                <span>{item.sub}</span>
                                            </div>
                                            <div className="luggage-counter">
                                                <button onClick={() => updateLuggage(item.id, -1)}>−</button>
                                                <span>{luggage[item.id]}</span>
                                                <button onClick={() => updateLuggage(item.id, 1)}>+</button>
                                            </div>
                                            
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="form-actions-premium dual">
                                    <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                                    <Button size="lg" className="btn-full" onClick={handleFarePage}>Next: Fare Breakdown</Button>
                                </div>
                                </Card>
                            </motion.div>
                        )}
                    </div>
<div className="book-sidebar">

    <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
    >

        <Card className="booking-summary-sticky">

            <h3>Booking Summary</h3>

            <div className="summary-list">

                <div className="summary-row">
                    <span>📍 Station</span>
                    <strong>{bookingData.station || "--"}</strong>
                </div>

                <div className="summary-row">
                    <span>🚆 Service</span>

                    <Badge variant="secondary">
                        Arrival
                    </Badge>
                </div>

                <div className="summary-row">
                    <span>🧳 Total Items</span>

                    <strong>
                        {totalItems} {totalItems === 1 ? "Item" : "Items"}
                    </strong>
                </div>

            </div>

            <div className="summary-total">

                <span>Estimated Fare</span>

                <strong>
                    ₹{totalItems === 0 ? 0 : 50 + totalItems * 20}
                </strong>

            </div>

            <p className="fare-disclaimer">

                {totalItems === 0
                    ? "Select luggage to see estimated fare."
                    : "Final fare may vary based on station and timing."}

            </p>

            {/* ===== BOOKING BENEFITS ===== */}

            <div className="booking-summary-benefits">

                {/* Avg Arrival */}

                <div className="booking-benefit-card booking-green">

                    <div className="booking-benefit-icon">
                        ⚡
                    </div>

                    <div className="booking-benefit-content">
                        <div className="booking-benefit-title">
                            Avg Arrival
                        </div>
                    </div>

                    <div className="booking-benefit-value booking-green-text">
                        2 <small>mins</small>
                    </div>

                </div>

                {/* Rating */}

                <div className="booking-benefit-card booking-yellow">

                    <div className="booking-benefit-icon">
                        ⭐
                    </div>

                    <div className="booking-benefit-content">
                        <div className="booking-benefit-title">
                            Rating
                        </div>
                    </div>

                    <div className="booking-benefit-value booking-yellow-text">
                        4.9 <small>/ 5</small>
                    </div>

                </div>

                {/* Verified */}

                <div className="booking-benefit-card booking-blue">

                    <div className="booking-benefit-icon">
                        🛡
                    </div>

                    <div className="booking-benefit-content">
                        <div className="booking-benefit-title">
                            Verified
                        </div>
                    </div>

                    <div className="booking-benefit-value booking-blue-text">
                        100%
                    </div>

                </div>

            </div>

        </Card>

    </motion.div>

</div>
                    </div>
                </div>
            
            
        </DashboardLayout>
    );
};

export default BookPorterPage;
