// ================================
// PERSONAL DETAILS VALIDATION
// ================================

export const validatePersonal = (formData) => {
  const errors = {};

  // Full Name
  if (!formData.fullName.trim()) {
    errors.fullName = "Full Name is required.";
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = "Full Name must be at least 3 characters.";
  }

  // Phone
  if (!formData.phone.trim()) {
    errors.phone = "Mobile Number is required.";
  } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
    errors.phone = "Enter a valid 10-digit Mobile Number.";
  }

  // Email
  if (!formData.email.trim()) {
    errors.email = "Email Address is required.";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    errors.email = "Enter a valid Email Address.";
  }

  // Gender
  if (!formData.gender) {
    errors.gender = "Please select Gender.";
  }

  // DOB
  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of Birth is required.";
  } else {
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const month = today.getMonth() - dob.getMonth();

    if (
      month < 0 ||
      (month === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      errors.dateOfBirth =
        "Applicant must be at least 18 years old.";
    }
  }

  return errors;
};

// ================================
// ADDRESS VALIDATION
// ================================

export const validateAddress = (formData) => {
  const errors = {};

  if (!formData.state.trim()) {
    errors.state = "State is required.";
  }

  if (!formData.district.trim()) {
    errors.district = "District is required.";
  }

  if (!formData.city.trim()) {
    errors.city = "City is required.";
  }

  if (!formData.pincode.trim()) {
    errors.pincode = "Pincode is required.";
  } else if (!/^\d{6}$/.test(formData.pincode)) {
    errors.pincode = "Pincode must contain 6 digits.";
  }

  if (!formData.address.trim()) {
    errors.address = "Complete Address is required.";
  } else if (formData.address.trim().length < 15) {
    errors.address =
      "Address should contain at least 15 characters.";
  }

  return errors;
};

// ================================
// IDENTITY VALIDATION
// ================================

export const validateIdentity = (formData) => {
  const errors = {};

  const aadhaar = formData.aadhaarNumber.replace(/\s/g, "");

  if (!aadhaar) {
    errors.aadhaarNumber = "Aadhaar Number is required.";
  } else if (!/^\d{12}$/.test(aadhaar)) {
    errors.aadhaarNumber =
      "Aadhaar Number must contain exactly 12 digits.";
  }

  if (!formData.panNumber.trim()) {
    errors.panNumber = "PAN Number is required.";
  } else if (
    !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
      formData.panNumber.toUpperCase()
    )
  ) {
    errors.panNumber =
      "Invalid PAN Number. Example: ABCDE1234F";
  }

  return errors;
};

// ================================
// BANK VALIDATION
// ================================

export const validateBank = (formData) => {
  const errors = {};

  if (!formData.accountHolder.trim()) {
    errors.accountHolder =
      "Account Holder Name is required.";
  }

  if (!formData.bankName.trim()) {
    errors.bankName = "Bank Name is required.";
  }

  if (!formData.accountNumber.trim()) {
    errors.accountNumber =
      "Account Number is required.";
  } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
    errors.accountNumber =
      "Account Number must contain 9 to 18 digits.";
  }

  if (!formData.confirmAccountNumber.trim()) {
    errors.confirmAccountNumber =
      "Please confirm your Account Number.";
  } else if (
    formData.accountNumber !==
    formData.confirmAccountNumber
  ) {
    errors.confirmAccountNumber =
      "Account Numbers do not match.";
  }

  if (!formData.ifscCode.trim()) {
    errors.ifscCode = "IFSC Code is required.";
  } else if (
    !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
      formData.ifscCode.toUpperCase()
    )
  ) {
    errors.ifscCode =
      "Invalid IFSC Code. Example: SBIN0001234";
  }

  if (
    formData.upiId &&
    !/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(
      formData.upiId
    )
  ) {
    errors.upiId =
      "Invalid UPI ID. Example: talha@oksbi";
  }

  return errors;
};

// ================================
// DOCUMENT VALIDATION
// ================================

export const validateDocuments = (files) => {
  const errors = {};

  if (!files.profilePhoto) {
    errors.profilePhoto =
      "Profile Photo is required.";
  }

  if (!files.aadhaarFront) {
    errors.aadhaarFront =
      "Upload Aadhaar Front.";
  }

  if (!files.aadhaarBack) {
    errors.aadhaarBack =
      "Upload Aadhaar Back.";
  }

  if (!files.railwayLicense) {
    errors.railwayLicense =
      "Railway License is required.";
  }

  return errors;
};

// ================================
// STEP VALIDATION
// ================================

export const validateStep = (
  step,
  formData,
  files
) => {
  switch (step) {
    case 1:
      return validatePersonal(formData);

    case 2:
      return validateAddress(formData);

    case 3:
      return validateIdentity(formData);

    case 4:
      return validateBank(formData);

    case 5:
      return validateDocuments(files);

    default:
      return {};
  }
};