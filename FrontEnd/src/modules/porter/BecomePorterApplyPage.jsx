import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./BecomePorterApplyPage.css";
import DocumentUpload from "../../components/porter/DocumentUpload";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeroBanner from "../../components/porter/HeroBanner";
import ProgressSteps from "../../components/porter/ProgressSteps";
import BenefitsSidebar from "../../components/porter/BenefitsSidebar";
import StatsSection from "../../components/porter/StatsSection";
import TrustSection from "../../components/porter/TrustSection";

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
district: "",   // NEW
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
bankName: "",      // NEW
accountNumber: "",
confirmAccountNumber: "",
ifscCode: "",
upiId: "",

  // Emergency
  emergencyContact: "",

  // Terms
  termsAccepted: false,
});

const { user } = useAuth();

console.log("AUTH USER:", user);
useEffect(() => {

  if (user) {

    setFormData(prev => ({

      ...prev,

      phone: user.phone || "",

      fullName: user.fullName || "",

      email: user.email || ""

    }));

  }

}, [user]);
const [step, setStep] = useState(1);

const [files, setFiles] = useState({
  profilePhoto: null,
  aadhaarFront: null,
  aadhaarBack: null,
  railwayLicense: null,
  policeVerification: null,
});

const navigate = useNavigate();

const [loading, setLoading] = useState(false);

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
  if(step<TOTAL_STEPS) {
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
const TOTAL_STEPS = 7;

const progress = (step / TOTAL_STEPS) * 100;

const isPersonalValid =
  formData.fullName.trim() !== "" &&
  formData.phone.trim() !== "" &&
  formData.gender !== "" &&
  formData.dateOfBirth !== "";

const isIdentityValid =
  formData.aadhaarNumber.replace(/\s/g, "").length === 12;

  const isAddressValid =
formData.address &&
formData.city &&
formData.district &&
formData.state &&
formData.pincode.length===6;

const isRailwayValid =
formData.preferredStation &&
formData.stationCode &&
formData.languages.length>0;

const isEmergencyValid =
/^[6-9]\d{9}$/.test(
formData.emergencyContact
);

const isBankValid =
  formData.accountHolder.trim() !== "" &&
  formData.accountNumber.trim() !== "" &&
  formData.accountNumber === formData.confirmAccountNumber &&
  /^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode);

  const handleSubmit = async () => {
  try {
    setLoading(true);

    const form = new FormData();

    // ==========================
    // Personal Details
    // ==========================

    form.append("fullName", formData.fullName);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    form.append("gender", formData.gender);
    form.append("dateOfBirth", formData.dateOfBirth);

    // ==========================
    // Address
    // ==========================

    form.append("address", formData.address);
    form.append("district", formData.district);
    form.append("city", formData.city);
    form.append("state", formData.state);
    form.append("pincode", formData.pincode);

    // ==========================
    // Railway Details
    // ==========================

    form.append("preferredStation", formData.preferredStation);
    form.append("stationCode", formData.stationCode);
    form.append("experience", formData.experience || 0);

    formData.languages.forEach((language) => {
      form.append("languages", language);
    });

    // ==========================
    // Identity
    // ==========================

    form.append(
      "aadhaarNumber",
      formData.aadhaarNumber.replace(/\s/g, "")
    );

    // ==========================
    // Bank Details
    // ==========================

    form.append("accountHolder", formData.accountHolder);
    form.append("bankName", formData.bankName);
    form.append("accountNumber", formData.accountNumber);
    form.append("ifscCode", formData.ifscCode);
    form.append("upiId", formData.upiId);

    // ==========================
    // Emergency Contact
    // ==========================

    form.append(
      "emergencyContact",
      formData.emergencyContact
    );

    // ==========================
    // Agreement
    // ==========================

    form.append(
      "termsAccepted",
      String(formData.termsAccepted)
    );

    // ==========================
    // Documents
    // ==========================

    if (files.profilePhoto) {
      form.append("profilePhoto", files.profilePhoto);
    }

    if (files.aadhaarFront) {
      form.append("aadhaarFront", files.aadhaarFront);
    }

    if (files.aadhaarBack) {
      form.append("aadhaarBack", files.aadhaarBack);
    }

    if (files.railwayLicense) {
      form.append("railwayLicense", files.railwayLicense);
    }

    if (files.policeVerification) {
      form.append(
        "policeVerification",
        files.policeVerification
      );
    }

    // ==========================
    // API Call
    // ==========================

   const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/porter/apply`,
  form,
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

    console.log("Application Submitted:", response.data);

    alert(
      response.data.message ||
        "Application submitted successfully."
    );

    navigate("/dashboard");
  } catch (error) {
    console.error("Apply Porter Error:", error);

    if (error.response?.data?.errors) {
      console.log(error.response.data.errors);
    }

    alert(
      error.response?.data?.message ||
        "Application submission failed."
    );
  } finally {
    setLoading(false);
  }
};

const isDocumentsValid =
  files.profilePhoto &&
  files.aadhaarFront &&
  files.aadhaarBack &&
  files.railwayLicense;

  return (
    <div className="porter-apply-page">
      
      <HeroBanner />

      {/* Progress */}

      <ProgressSteps
currentStep={step}
totalSteps={7}
/>

      {/* Personal Details */}

      <div className="bp-main-layout">

<div className="bp-main-form">
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

<div className="input-group verify-group">

  <input
    type="tel"
    name="phone"
    value={formData.phone}
    readOnly
    placeholder=" "
    className="verified-input"
  />

  <label>Mobile Number</label>

  <span className="verified">
    ✓
  </span>

  <small className="verified-text">
    Verified via OTP
  </small>

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
name="email"
value={formData.email}
onChange={handleChange}
placeholder=" "
/>
<label>Email Address (Optional)</label>
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
<div className="personal-info-note">

  <div className="personal-info-icon">
    🛡
  </div>

  <div className="personal-info-content">

    <p>
    Your personal information is safe with us and will never be shared with third parties. It is used solely for identity verification and application processing.
    </p>

  </div>

</div>
</div>

<div className="button-row">

<button
className="next-btn"
onClick={nextStep}
disabled={!isPersonalValid}
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

<h2>Railway Details</h2>

<p>
Tell us where you want to work as a TrainPorter.
</p>

</div>

<div className="form-grid">

<div className="input-group">

<input
name="preferredStation"
value={formData.preferredStation}
onChange={handleChange}
placeholder=" "
/>

<label>Preferred Railway Station</label>

</div>

<div className="input-group">

<input
name="stationCode"
value={formData.stationCode}
onChange={handleChange}
placeholder=" "
style={{textTransform:"uppercase"}}
/>

<label>Station Code</label>

</div>

<div className="input-group">

<input
type="number"
name="experience"
value={formData.experience}
onChange={handleChange}
placeholder=" "
min="0"
/>

<label>Experience (Years)</label>

</div>

<div className="input-group">

<select
name="languages"
value={formData.languages[0] || ""}
onChange={(e)=>
setFormData(prev=>({
...prev,
languages:[e.target.value]
}))
}
>

<option value="">Select Language</option>

<option>Hindi</option>

<option>English</option>

<option>Urdu</option>

<option>Bengali</option>

<option>Marathi</option>

<option>Tamil</option>

<option>Telugu</option>

<option>Gujarati</option>

</select>

<label className="active">
Language
</label>

</div>

</div>

<div className="info-box">

<h4>🚉 Railway Assignment</h4>

<p>

Select the railway station where you want to provide porter services.
This information helps us assign bookings in your preferred location.

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
>

Next →

</button>

</div>

</>
)}

{step === 4 && (
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

{step === 5 && (
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
{step === 6 && (
<>
<div className="card-title">

<h2>Emergency Contact</h2>

<p>

Provide a trusted contact person whom we can reach in case of emergency.

</p>

</div>

<div className="form-grid">

<div className="input-group">

<input
name="emergencyContact"
value={formData.emergencyContact}
onChange={handleChange}
placeholder=" "
maxLength={10}
/>

<label>Emergency Contact Number</label>

</div>

</div>

<div className="info-box">

<h4>📞 Emergency Support</h4>

<p>

Your emergency contact will only be used in case of safety-related situations.
This information remains private and secure.

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
>

Next →

</button>

</div>

</>
)}


{step === 7 && (
  <>
    <DocumentUpload
      files={files}
      setFiles={setFiles}
    />

    <div className="terms-box">

      <label className="terms-label">

        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              termsAccepted: e.target.checked,
            }))
          }
        />

        <span>
          I agree to the Terms & Conditions
        </span>

      </label>

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
  onClick={handleSubmit}
  disabled={
    loading ||
    !isDocumentsValid ||
    !formData.termsAccepted
  }
>
  {loading ? "Submitting..." : "Submit Application"}
</button>

    </div>
  </>
)}


        </motion.section>

</div>

{/* RIGHT SIDEBAR */}

<BenefitsSidebar />

</div>

{/* BELOW MAIN LAYOUT */}

<StatsSection />

<TrustSection />

</div>
    
  );
};


export default BecomePorterApplyPage;