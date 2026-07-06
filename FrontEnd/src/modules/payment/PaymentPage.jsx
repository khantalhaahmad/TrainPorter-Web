import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import './PaymentPage.css';

const PaymentPage = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const [method, setMethod] = useState('');
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [isSavingReview, setIsSavingReview] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const booking = React.useMemo(() => {

    return JSON.parse(
        localStorage.getItem("currentBooking")
    );

}, []);

useEffect(() => {

    if (!booking) {

        navigate("/history", {
            replace: true
        });

    }

}, [booking, navigate]);
    const transactionId =`TP-${Date.now()}`;
    const [paymentTime, setPaymentTime] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const handlePayment = (selectedMethod) => {

    setMethod(selectedMethod);

    setIsProcessing(true);

    setTimeout(() => {

        const now = new Date();

        const formatted = now.toLocaleString("en-IN",{
            day:"2-digit",
            month:"long",
            year:"numeric",
            hour:"2-digit",
            minute:"2-digit",
            hour12:true
        });

        setPaymentTime(formatted);

        setIsProcessing(false);

        setIsSuccess(true);

    },10000);

};
const handleSubmitRating = () => {

    setShowRatingPopup(false);

    setIsSavingReview(true);

    setTimeout(() => {

        localStorage.removeItem("currentBooking");

        navigate("/history", {
            replace: true
        });

    }, 2500);

};

const handleSkipRating = () => {

    setShowRatingPopup(false);

    setIsSavingReview(true);

    setTimeout(() => {

        localStorage.removeItem("currentBooking");

        navigate("/history", {
            replace: true
        });

    }, 2500);

};

if (isProcessing) {

    return (

        <DashboardLayout>

            <div className="payment-loader-page">

                <div className="payment-loader-card">

                    <div className="payment-loader-spinner"></div>

                    <h2>
                        Processing Payment...
                    </h2>

                    <p>

                        Please wait while we securely
                        verify your payment.

                    </p>

                    <div className="loader-progress">

                        <div className="loader-progress-fill"></div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}
    if (isSuccess) {
        return (
            <DashboardLayout>
                <div className="payment-success-premium fade-in">
                   <div className="payment-success-header">

    <div className="success-lottie-placeholder">

        🎉

    </div>

    <h1>

        Payment Successful

    </h1>

    <div className="payment-success-badge">

        ✔ Amount received successfully

    </div>

</div>
                    <Card className="premium-receipt-card">
                   <div className="receipt-premium-header">

    <div className="receipt-brand">

        🚂

        <div>

            <strong>

                TrainPorter

            </strong>

            <small>

                Digital Receipt

            </small>

        </div>

    </div>

    <Badge variant="success">

        PAID

    </Badge>

</div>

                        <div className="receipt-premium-body">
                            <div className="premium-line">
                                <span>Transaction ID</span>
                                
<strong>

#{transactionId}

</strong>
                            </div>
                            <div className="premium-line">

    <span>Date & Time</span>

    <strong>
        {paymentTime}
    </strong>

</div>
                            <div className="premium-line divider">
                                <span>Porter Details</span>
                                <strong>

{booking?.assignedPorter?.name}
(ID:
{booking?.assignedPorter?.porterId})

</strong>
                            </div>
                            <div className="premium-line">
                                <span>Service</span>
                                <strong>

Luggage Assistance
(
{booking?.luggageCount} Items)

</strong>
                            </div>
                            <div className="premium-line-total">
                                <span>Total Paid</span>
                               <h2 className="price-text">

₹{booking?.amount}

</h2>
                            </div>
                            <Button
className="done-btn"
onClick={() => setShowRatingPopup(true)}
>
✅ Done
</Button>
                        </div>
                    
                     {showRatingPopup && (

<div className="rating-popup-overlay">

    <div className="apple-rating-popup">

        <div className="apple-rating-icon">

            ⭐

        </div>

        <h2>

            Rate Your Porter

        </h2>

        <p>

            How was your luggage service?

        </p>

        <div className="apple-stars">

            {[1,2,3,4,5].map((star)=>(

                <span

                    key={star}

                    className={`apple-star ${
                        star <= (hoverRating || rating)
                        ? "active"
                        : ""
                    }`}

                    onMouseEnter={()=>
                        setHoverRating(star)
                    }

                    onMouseLeave={()=>
                        setHoverRating(0)
                    }

                    onClick={()=>
                        setRating(star)
                    }

                >

                    ★

                </span>

            ))}

        </div>

        {rating > 0 && (

            <>

                <textarea

                    className="apple-feedback"

                    rows="3"

                    placeholder="Tell us about your experience (optional)..."

                    value={feedback}

                    onChange={(e)=>
                        setFeedback(e.target.value)
                    }

                />

                <Button

                    className="apple-submit-btn"

                    onClick={handleSubmitRating}

                >

                    Submit Review

                </Button>

            </>

        )}

        <button

            className="apple-notnow-btn"

            onClick={handleSkipRating}

        >

            Not Now

        </button>

    </div>

</div>

)}

{isSavingReview && (

<div className="saving-overlay">

    <div className="saving-card">

        <div className="saving-spinner">

        </div>

        <h2>

            Saving your feedback...

        </h2>

        <p>

            Please wait while we update your booking history.

        </p>

        <div className="saving-progress">

            <div className="saving-progress-fill">

            </div>

        </div>

    </div>

</div>

)}

                        <div className="receipt-premium-footer">
                            <p>Verified by Indian Railways Support</p>
                        </div>
                    </Card>

                    <div className="success-footer-actions">

<Button
variant="secondary"
className="btn-full secondary-btn"
onClick={() => window.print()}
>

📄 Download Receipt

</Button>

</div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="payment-page-premium fade-in">
         <div className="payment-hero-premium">

    <div className="payment-hero-icon">
        💳
    </div>

    <h2>
        Total Payable
    </h2>

    <h1 className="payment-price-hero">
₹{booking?.amount}
</h1>
    <div className="payment-security-badge">

        <span>🛡 Secure Payment</span>

        <span>🔒 SSL Protected</span>

    </div>

</div>

                <div className="payment-methods-premium">
                    <h3>Select Payment Method</h3>
                    <div className="methods-grid-premium">
                        <Card
className={`method-card-premium ${
method==="upi" ? "active" : ""
}`}
onClick={()=>handlePayment("upi")}
hover
>

    <div className="method-left">

        <div className="method-icon-bg">
            📱
        </div>

        <div className="method-text-meta">

            <strong>
                UPI / Online
            </strong>

            <span>
                GPay • PhonePe • Paytm
            </span>

            <div className="payment-tags">

                <span>
                    Instant
                </span>

                <span>
                    Recommended
                </span>

            </div>

        </div>

    </div>

    <div className="method-right">

        <div className="method-select-radio"></div>

    </div>

</Card>
                        <Card
className={`method-card-premium ${
method==="cash" ? "active" : ""
}`}
onClick={()=>handlePayment("cash")}
hover
>

    <div className="method-left">

        <div className="method-icon-bg">
            💵
        </div>

        <div className="method-text-meta">

            <strong>
                Pay by Cash
            </strong>

            <span>
                Pay directly to porter
            </span>

            <div className="payment-tags">

                <span>
                    Offline
                </span>

            </div>

        </div>

    </div>

    <div className="method-right">

        <div className="method-select-radio"></div>

    </div>

</Card>

                    </div>
                </div>
                

                <div className="security-assurance">
                    <div className="assurance-item">
                        <span>🛡️</span>
                        <span>100% Secure</span>
                    </div>
                    <div className="assurance-item">
                        <span>🔒</span>
                        <span>PCI DSS Compliant</span>
                    </div>
                    <div className="assurance-item">
                        <span>🎧</span>
                        <span>24/7 Priority Support</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};



export default PaymentPage;
