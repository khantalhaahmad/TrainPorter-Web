import React from "react";

const DetailItem = ({
  label,
  value,
}) => (

  <div className="tp-porter-detail-item">

    <span className="tp-porter-detail-label">

      {label}

    </span>

    <span className="tp-porter-detail-value">

      {value || "--"}

    </span>

  </div>

);

const PersonalInformation = ({
  application,
}) => {

  if (!application) return null;

  return (

    <div className="tp-porter-info-card">

      <h3 className="tp-porter-info-title">

        Personal Information

      </h3>

      <div className="tp-porter-info-grid">

        <DetailItem
          label="Full Name"
          value={application.fullName}
        />

        <DetailItem
          label="Phone"
          value={application.phone}
        />

        <DetailItem
          label="Email"
          value={application.email}
        />

        <DetailItem
          label="Gender"
          value={application.gender}
        />

        <DetailItem
          label="Date of Birth"
          value={
            application.dateOfBirth
              ? new Date(
                  application.dateOfBirth
                ).toLocaleDateString()
              : "--"
          }
        />

        <DetailItem
          label="Experience"
          value={`${application.experience} Years`}
        />

        <DetailItem
          label="Preferred Station"
          value={application.preferredStation}
        />

        <DetailItem
          label="Station Code"
          value={application.stationCode}
        />

        <DetailItem
          label="City"
          value={application.city}
        />

        <DetailItem
          label="District"
          value={application.district}
        />

        <DetailItem
          label="State"
          value={application.state}
        />

        <DetailItem
          label="Pincode"
          value={application.pincode}
        />

      </div>

      <div className="tp-porter-address-card">

        <span className="tp-porter-detail-label">

          Address

        </span>

        <p className="tp-porter-address">

          {application.address}

        </p>

      </div>

    </div>

  );

};

export default PersonalInformation;