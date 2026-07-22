import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import './AuthDrawer.css';
import axios from "axios";
import { useAuth } from '../context/AuthContext';

const AuthDrawer = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('login'); // login, otp, success
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [otpError, setOtpError] = useState(false);
    const [toast, setToast] = useState(null); // { type: 'success' | 'error', title: '', message: '' }
    const [isInputFocused, setIsInputFocused] = useState(false);
    const navigate = useNavigate();
    const otpRefs = useRef([]);
    const toastTimerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const { login } = useAuth();
    useEffect(() => {
        if (step === 'otp' && timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
    if (isOpen) {
        setIsVisible(true);
    } else {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 450);

        return () => clearTimeout(timeout);
    }
}, [isOpen]);

    const showToast = (type, title, message) => {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToast({ type, title, message });
        toastTimerRef.current = setTimeout(() => setToast(null), 3000);
    };

    const validateMobile = (num) => {
        if (num.length === 0) return { valid: false, msg: '' };
        if (num.length < 10) return { valid: false, msg: 'Please enter a valid 10-digit mobile number' };
        if (!/^[6-9]/.test(num)) return { valid: false, msg: 'Mobile number must start with 6, 7, 8, or 9' };
        return { valid: true, msg: '' };
    };

    const handleMobileChange = (val) => {
        const cleaned = val.replace(/\D/g, '').slice(0, 10);
        setMobile(cleaned);
        setError('');
    };

    const handleSendOTP = async (e) => {
    e.preventDefault();

    const { valid, msg } = validateMobile(mobile);

    if (!valid) {
        setError(msg || "Invalid mobile number");

        showToast(
            "error",
            "Invalid Mobile Number",
            "Please enter a valid 10-digit Indian mobile number before continuing."
        );

        return;
    }

    try {
        setIsLoading(true);

        await axios.post(
            "http://localhost:8000/api/auth/send-otp",
            {
                phone: mobile,
            }
        );
await new Promise(resolve =>
    setTimeout(resolve, 2000)
);
        setStep("otp");
        setTimer(30);
        setOtp(["", "", "", "", "", ""]);

        showToast(
            "success",
            "OTP Sent Successfully",
            "Verification code has been sent to your mobile number."
        );

    } catch (error) {

        console.error(error);

        showToast(
            "error",
            "Failed",
            "Unable to send OTP"
        );

    } finally {

        setIsLoading(false);

    }
};

    const handleOTPChange = (index, value) => {
        const cleanedValue = value.replace(/\D/g, '');
        if (!cleanedValue && value !== '') return;

        const newOtp = [...otp];
        newOtp[index] = cleanedValue.slice(-1);
        if (otpError) {
    setOtpError(false);
}

setOtp(newOtp);

        if (cleanedValue && index < 5) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasteData.length === 6) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            otpRefs.current[5].focus();
        }
    };

   const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const fullOtp = otp.join("");

    try {

        setIsLoading(true);

        const response = await axios.post(
    "http://localhost:8000/api/auth/verify-otp",
    {
        phone: mobile,
        otp: fullOtp,
    }
);

// Premium loading delay
await new Promise(resolve =>
    setTimeout(resolve, 2000)
);

console.log("========================================");
console.log("FULL AXIOS RESPONSE =>", response);
console.log("RESPONSE.DATA =>", response.data);
console.log("RESPONSE.DATA.DATA =>", response.data?.data);
console.log("RESPONSE.DATA.USER =>", response.data?.user);
console.log("RESPONSE.DATA.DATA.USER =>", response.data?.data?.user);
console.log("========================================");

const token =
  response.data?.token ||
  response.data?.data?.token;

const user =
  response.data?.user ||
  response.data?.data?.user;

const porterApplication =
  response.data?.porterApplication ||
  response.data?.data?.porterApplication;

const updatedUser = {
  ...user,
  porterApplication,
};

console.log("TOKEN =>", token);
console.log("UPDATED USER =>", updatedUser);

login(token, updatedUser);

console.log("USER AFTER LOGIN =>", localStorage.getItem("user"));
console.log("TOKEN AFTER LOGIN =>", localStorage.getItem("token"));

setStep("success");

      setTimeout(() => {

    const porterApplication =
      response.data?.porterApplication ||
      response.data?.data?.porterApplication;

    if (
      porterApplication?.hasApplication &&
      porterApplication.status !== "approved"
    ) {

      navigate("/porter/application-dashboard");

    } else {

      navigate("/dashboard");

    }

    setTimeout(() => {

      onClose();

      setStep("login");
      setMobile("");
      setOtp(["", "", "", "", "", ""]);
      setOtpError(false);

    },300);

},2000);

   } catch (error) {

    console.error(error);

    setOtpError(false);

    setTimeout(() => {

        setOtp(["", "", "", "", "", ""]);
        setOtpError(true);

        otpRefs.current[0]?.focus();

    }, 10);

} finally {

    setIsLoading(false);

}
};
    const formatMobile = (num) => {
        if (num.length !== 10) return num;
        return `${num.slice(0, 5)} ${num.slice(5)}`;
    };

   if (!isVisible && !isOpen && step !== 'success') {
    return null;
}

    return (
        <div className={`auth-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
            {/* Re-positioned Toast Notification */}
            {toast && (
                <div className={`auth-toast-fixed ${toast.type} slide-in-right`}>
                    <div className="toast-icon-wrapper">
                        {toast.type === 'success' ? '✓' : '⚠'}
                    </div>
                    <div className="toast-text-content">
                        <strong className="toast-title-text">{toast.title}</strong>
                        <p className="toast-msg-text">{toast.message}</p>
                    </div>
                </div>
            )}

            <div className={`auth-drawer ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className="drawer-close-btn" onClick={onClose}>×</button>

                {/* Scrollable Container with Top Padding */}
                <div className="drawer-content-scrollable">
                    <div className="drawer-header-brand">
                        <div className="brand-logo-text">🚂 TrainPorter</div>
                    </div>

                    <div className="drawer-main-form-step">
                        {step === 'login' && (
                            <div className="auth-step-wrapper fade-in">
                                <h2 className="step-heading">Login to TrainPorter</h2>
                                <p className="step-subtitle">Book verified railway porters in seconds.</p>

                                <form onSubmit={handleSendOTP} className="interactive-form-grid">
                                    <div className={`input-stack ${error ? 'shake-anim' : ''}`}>
                                        <div className={`premium-phone-field ${isInputFocused ? 'is-focused' : ''} ${mobile.length === 10 && !error && /^[6-9]/.test(mobile) ? 'is-valid' : ''} ${error ? 'is-invalid' : ''}`}>
                                            <div className="country-prefix">🇮🇳 +91</div>
                                            <input
                                                type="tel"
                                                placeholder="Mobile Number"
                                                maxLength="10"
                                                value={mobile}
                                                onFocus={() => setIsInputFocused(true)}
                                                onBlur={() => setIsInputFocused(false)}
                                                onChange={(e) => handleMobileChange(e.target.value)}
                                                required
                                                autoFocus
                                            />
                                            <div className="field-status-icon">
                                                {mobile.length === 10 && !error && /^[6-9]/.test(mobile) && <span className="icon-v">✓</span>}
                                                {error && <span className="icon-x">⚠</span>}
                                            </div>
                                        </div>
                                        {error && <p className="field-error-hint fade-in">{error}</p>}
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="btn-full primary-action-btn"
                                        disabled={mobile.length === 0 || isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="loading-state-flex">
                                                <span className="spinner-ui"></span>
                                                <span>Sending OTP...</span>
                                            </div>
                                        ) : 'Send OTP'}
                                    </Button>
                                </form>
                            </div>
                        )}

                        {step === 'otp' && (
                            <div className="auth-step-wrapper fade-in">
                                <button className="back-navigation-link" onClick={() => { setStep('login'); setError(''); setOtpError(false); }}>
                                    ← Change Number
                                </button>

                                <h2 className="step-heading">Verify OTP</h2>
                                <p className="step-subtitle">
                                    Enter the 6-digit verification code sent to <br />
                                    <strong className="emphasized-number">+91 {formatMobile(mobile)}</strong>
                                </p>

                                <form onSubmit={handleVerifyOTP} className="interactive-form-grid">
                                    <div className={`otp-inputs-grid ${otpError ? 'shake-anim' : ''}`}>
                                        {otp.map((digit, i) => (
                                            <input
                                                key={i}
                                                ref={el => otpRefs.current[i] = el}
                                                type="text"
                                                pattern="\d*"
                                                inputMode="numeric"
                                                maxLength="1"
                                                value={digit}
                                                onChange={(e) => handleOTPChange(i, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(i, e)}
                                                onPaste={handlePaste}
                                                className={`otp-digit-field ${digit ? 'has-value' : ''} ${otpError ? 'has-error' : ''}`}
                                                autoFocus={i === 0}
                                            />
                                        ))}
                                    </div>
                                    {otpError && <p className="otp-alert-msg text-center fade-in">Invalid OTP. Please try again.</p>}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="btn-full primary-action-btn"
                                        disabled={otp.some(d => !d) || isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="loading-state-flex">
                                                <span className="spinner-ui border-white"></span>
                                                <span>Verifying...</span>
                                            </div>
                                        ) : 'Verify & Continue'}
                                    </Button>
                                </form>

                                <div className="resend-action-row">
                                    <p>Didn't receive OTP?</p>
                                    {timer > 0 ? (
                                        <div className="timer-display">Resend OTP in <strong>{timer}s</strong></div>
                                    ) : (
                                        <button className="resend-cta-link" onClick={() => { setTimer(30); setOtpError(false); }}>Resend OTP</button>
                                    )}
                                </div>
                            </div>
                        )}

                        {step === 'success' && (
    <div className="auth-step-wrapper success-state-visual text-center">

        <div className="train-loader">
            🚂
        </div>

        <h2 className="success-status-title">
            Login Successful
        </h2>

        <p className="step-subtitle">
            Preparing your dashboard...
        </p>

        <div className="loading-bar">
            <div className="loading-bar-fill"></div>
        </div>

        <p
            style={{
                marginTop: '16px',
                fontSize: '14px',
                color: '#64748B'
            }}
        >
            Please wait while we set up your account
        </p>

    </div>
)}
                    </div>
                </div>

                <div className="drawer-bottom-disclosure">
                    <p>By continuing, you agree to our <strong>Terms</strong> & <strong>Privacy Policy</strong></p>
                </div>
            </div>
        </div>
    );
};

export default AuthDrawer;
