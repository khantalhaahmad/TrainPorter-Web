import React from "react";

const BankDetail = ({
  label,
  value,
}) => (

  <div className="tp-porter-bank-item">

    <span className="tp-porter-bank-label">

      {label}

    </span>

    <span className="tp-porter-bank-value">

      {value || "--"}

    </span>

  </div>

);

const BankInformation = ({
  application,
}) => {

  if (!application) return null;

  return (

    <div className="tp-porter-bank-card">

      <h3 className="tp-porter-bank-title">

        Bank Information

      </h3>

      <div className="tp-porter-bank-grid">

        <BankDetail
          label="Account Holder"
          value={application.accountHolder}
        />

        <BankDetail
          label="Bank Name"
          value={application.bankName}
        />

        <BankDetail
          label="Account Number"
          value={application.accountNumber}
        />

        <BankDetail
          label="IFSC Code"
          value={application.ifscCode}
        />

        <BankDetail
          label="UPI ID"
          value={application.upiId}
        />

      </div>

    </div>

  );

};

export default BankInformation;