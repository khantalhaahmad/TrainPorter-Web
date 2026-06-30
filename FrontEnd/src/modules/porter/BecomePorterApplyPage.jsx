import React, { useState } from "react";
import { motion } from "framer-motion";
import "./BecomePorterApplyPage.css";
import DocumentUpload from "../../components/porter/DocumentUpload";
const BecomePorterApplyPage = () => {
  const [formData, setFormData] = useState({
    
  // Personal
  fullName: "",
  phone: "",
  email: "",
  gender: "",
  dateOfBirth: "",

  // Address
  address: "",
  city: "",
  state: "",
  pincode: "",

  // Railway
  preferredStation: "",
  stationCode: "",
  experience: "",
  languages: [],

  // Identity
  aadhaarNumber: "",

  // Bank
  accountHolder: "",
  accountNumber: "",
  confirmAccountNumber: "", // Frontend validation only
  ifscCode: "",
  upiId: "",

  // Emergency
  emergencyContact: "",

  // Terms
  termsAccepted: false,
});
const [step, setStep] = useState(1);

const [files, setFiles] = useState({
  profilePhoto: null,
  aadhaarFront: null,
  aadhaarBack: null,
  railwayLicense: null,
  policeVerification: null,
});
 const handleChange = (e) => {
  const { name, value } = e.target;

  let newValue = value;

  if (name === "aadhaarNumber") {
    newValue = formatAadhaar(value);
  }

if (name === "ifscCode") {
  newValue = formatIFSC(value);
}
  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};
const nextStep = () => {
  if (step < 5) {
    setStep((prev) => prev + 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const prevStep = () => {
  if (step > 1) {
    setStep((prev) => prev - 1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

const formatAadhaar = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const formatIFSC = (value) => {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 11);
};
const progress = (step / 5) * 100;

const isIdentityValid =
  formData.aadhaarNumber.replace(/\s/g, "").length === 12;

const isBankValid =
  formData.accountHolder.trim() !== "" &&
  formData.accountNumber.trim() !== "" &&
  formData.accountNumber === formData.confirmAccountNumber &&
  /^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode);

const isDocumentsValid =
  files.profilePhoto &&
  files.aadhaarFront &&
  files.aadhaarBack;

  return (
    <div className="porter-apply-page">
      {/* Hero */}

      <motion.section
        className="porter-hero"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
      >
        <span className="hero-badge">
          🚉 Join India's Smart Porter Network
        </span>

        <h1>
          Become a
          <span> TrainPorter Partner</span>
        </h1>

        <p>
          Earn money by helping passengers carry luggage safely across railway
          stations. Flexible work, secure payments and verified bookings.
        </p>
      </motion.section>

      {/* Progress */}

      <motion.section
        className="progress-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .3 }}
      >
        <div className="progress-header">
          <h3>Application Progress</h3>

          <span>{progress}%</span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

       <div className="steps">

  <div className={`step ${step>=1 ? "active":""}`}>
      <div>1</div>
      <span>Personal</span>
  </div>

  <div className={`step ${step>=2 ? "active":""}`}>
      <div>2</div>
      <span>Address</span>
  </div>

  <div className={`step ${step>=3 ? "active":""}`}>
      <div>3</div>
      <span>ID</span>
  </div>

  <div className={`step ${step>=4 ? "active":""}`}>
      <div>4</div>
      <span>Bank</span>
  </div>

  <div className={`step ${step>=5 ? "active":""}`}>
      <div>5</div>
      <span>Documents</span>
  </div>

</div>
      </motion.section>

      {/* Personal Details */}

      <motion.section
  className="form-card"
  key={step}
  initial={{ opacity: 0, x: 80 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0 }}
>
       {step === 1 && (
<>
<div className="card-title">
<h2>Personal Details</h2>
<p>Tell us about yourself.</p>
</div>

<div className="form-grid">

<div className="input-group">
<input
name="fullName"
value={formData.fullName}
onChange={handleChange}
placeholder=" "
/>
<label>Full Name</label>
</div>

<div className="input-group">
<input
name="phone"
value={formData.phone}
onChange={handleChange}
placeholder=" "
/>
<label>Mobile Number</label>
</div>

<div className="input-group">
<input
name="email"
value={formData.email}
onChange={handleChange}
placeholder=" "
/>
<label>Email Address</label>
</div>

<div className="input-group">
<select
name="gender"
value={formData.gender}
onChange={handleChange}
>
<option value="">Select Gender</option>
<option>Male</option>
<option>Female</option>
<option>Other</option>
</select>
<label className="active">Gender</label>
</div>

<div className="input-group">
<input
type="date"
name="dateOfBirth"
value={formData.dateOfBirth}
onChange={handleChange}
/>
<label className="active">
Date of Birth
</label>
</div>

</div>

<div className="button-row">

<button
className="next-btn"
onClick={nextStep}
>

Next →

</button>

</div>

</>
)}

{step === 2 && (
<>
<div className="card-title">

<h2>Address Details</h2>

<p>
Where are you currently living?
</p>

</div>

<div className="form-grid">

<div className="input-group">
<input
name="state"
value={formData.state}
onChange={handleChange}
placeholder=" "
/>

<label>State</label>
</div>

<div className="input-group">
<input
name="district"
value={formData.district}
onChange={handleChange}
placeholder=" "
/>

<label>District</label>
</div>

<div className="input-group">
<input
name="city"
value={formData.city}
onChange={handleChange}
placeholder=" "
/>

<label>City</label>
</div>

<div className="input-group">
<input
name="pincode"
value={formData.pincode}
onChange={handleChange}
placeholder=" "
/>

<label>Pincode</label>
</div>

<div
className="input-group"
style={{
gridColumn:"1 / -1"
}}
>

<textarea

name="address"

value={formData.address}

onChange={handleChange}

rows={5}

/>

<label className="active">

Complete Address

</label>

</div>

</div>

<div className="button-row between">

<button

className="back-btn"

onClick={prevStep}

>

← Back

</button>

<button

className="next-btn"

onClick={nextStep}

>

Next →

</button>

</div>

</>
)}

{step === 3 && (
  <>
    <div className="card-title">
      <h2>Identity Verification</h2>

      <p>
        Your identity details are securely encrypted and used only for
        verification.
      </p>
    </div>

    <div className="form-grid">

      <div className="input-group verify-group">
        <input
          name="aadhaarNumber"
          value={formData.aadhaarNumber}
          onChange={handleChange}
          placeholder=" "
          maxLength={14}
        />

        <label>Aadhaar Number</label>

        <span
          className={
            formData.aadhaarNumber.replace(/\s/g, "").length === 12
              ? "verified"
              : "pending"
          }
        >
          {formData.aadhaarNumber.replace(/\s/g, "").length === 12
            ? "✓"
            : "•"}
        </span>
      </div>

      <div className="input-group verify-group">
        <input
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          placeholder=" "
        />

        <label>PAN Number</label>

        
      </div>

    </div>

    <div className="info-box">
      <h4>🔒 Secure Verification</h4>

      <p>
        We use these documents only for KYC verification.
        Your information is encrypted and never shared with
        third parties.
      </p>
    </div>

    <div className="button-row between">

      <button
        className="back-btn"
        onClick={prevStep}
      >
        ← Back
      </button>

      <button
  className="next-btn"
  onClick={nextStep}
  disabled={!isIdentityValid}
>
  Next →
</button>

    </div>
  </>
)}

{step === 4 && (
<>
<div className="card-title">
<h2>Bank Details</h2>

<p>
Your earnings will be transferred directly to this bank account.
</p>
</div>

<div className="form-grid">

<div className="input-group">
<input
name="accountHolder"
value={formData.accountHolder}
onChange={handleChange}
placeholder=" "
/>

<label>Account Holder Name</label>
</div>

<div className="input-group">
<input
name="bankName"
value={formData.bankName}
onChange={handleChange}
placeholder=" "
/>

<label>Bank Name</label>
</div>

<div className="input-group">
<input
name="accountNumber"
value={formData.accountNumber}
onChange={handleChange}
placeholder=" "
/>

<label>Account Number</label>
</div>

<div className="input-group">
<input
name="confirmAccountNumber"
value={formData.confirmAccountNumber}
onChange={handleChange}
placeholder=" "
/>

<label>Confirm Account Number</label>
</div>

<div className="input-group">
<input
name="ifscCode"
value={formData.ifscCode}
onChange={handleChange}
placeholder=" "
/>

<label>IFSC Code</label>
</div>

<div className="input-group">
<input
name="upiId"
value={formData.upiId}
onChange={handleChange}
placeholder=" "
/>

<label>UPI ID (Optional)</label>
</div>

</div>

<div className="bank-info">

<h4>🏦 Secure Bank Transfers</h4>

<p>
All porter earnings, bonuses and incentives are credited directly to
your verified bank account. Your banking information is encrypted and
secure.
</p>

</div>

<div className="button-row between">

<button
className="back-btn"
onClick={prevStep}
>

← Back

</button>

<button
className="next-btn"
onClick={nextStep}
disabled={!isBankValid}
>

Next →

</button>

</div>

</>
)}

{step === 5 && (
  <>
    <DocumentUpload
      files={files}
      setFiles={setFiles}
    />

    <div className="button-row between">
      <button
        className="back-btn"
        onClick={prevStep}
      >
        ← Back
      </button>

     <button
  className="next-btn"
  disabled={!isDocumentsValid}
>
  Submit Application
</button>
    </div>
  </>
)}


      </motion.section>
    </div>
  );
};


export default BecomePorterApplyPage;