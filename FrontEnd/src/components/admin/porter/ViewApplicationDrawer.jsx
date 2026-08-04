import React from "react";
import { X } from "lucide-react";

import PersonalInformation from "./PersonalInformation";
import BankInformation from "./BankInformation";
import DocumentsSection from "./DocumentsSection";
import ApproveRejectFooter from "./ApproveRejectFooter";

const ViewApplicationDrawer = ({
  open,
  application,
  onClose,
  onApprove,
  onReject,
  approving = false,
  rejecting = false,
}) => {

  // ==========================
  // Don't Render
  // ==========================

  if (!open || !application) {
    return null;
  }

  return (
    <>

      {/* ==========================
          Overlay
      ========================== */}

      <div
        className="tp-porter-drawer-overlay"
        onClick={onClose}
      />

      {/* ==========================
          Drawer
      ========================== */}

      <aside className="tp-porter-drawer">

        {/* ==========================
            Header
        ========================== */}

        <div className="tp-porter-drawer-header">

          <div>

            <h2>
              Porter Application
            </h2>

            <p
              style={{
                marginTop: "6px",
                fontSize: "14px",
                color: "#64748b",
              }}
            >
              Application ID :{" "}
              <strong>
                {application.applicationId}
              </strong>
            </p>

          </div>

          <button
            className="tp-porter-drawer-close"
            onClick={onClose}
            aria-label="Close Drawer"
          >
            <X size={22} />
          </button>

        </div>

        {/* ==========================
            Body
        ========================== */}

        <div className="tp-porter-drawer-body">

          {/* ==========================
              Profile Card
          ========================== */}

         <div className="tp-porter-profile-card">

  <div className="tp-porter-profile-left">

    {application?.profilePhoto?.url ? (

      <img
        src={application.profilePhoto.url}
        alt={application.fullName}
        className="tp-porter-profile-image"
      />

    ) : (

      <div className="tp-porter-profile-placeholder">

        {application?.fullName?.charAt(0)}

      </div>

    )}

    <div className="tp-porter-profile-content">

      <h3 className="tp-porter-profile-name">
        {application?.fullName}
      </h3>

      <p className="tp-porter-profile-phone">
        {application?.phone}
      </p>

      <div className="tp-porter-profile-meta">

        <span
          className={`tp-porter-status tp-porter-status-${application?.status}`}
        >
          {application?.status}
        </span>

        <span className="tp-porter-profile-dot">
          •
        </span>

        <span className="tp-porter-profile-date">

          Applied on{" "}

          {application?.createdAt
            ? new Date(application.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "--"}

          {application?.createdAt && (
            <>
              {", "}
              {new Date(application.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </>
          )}

        </span>

      </div>

    </div>

  </div>

</div>

          {/* ==========================
              Personal Information
          ========================== */}

          <PersonalInformation
            application={application}
          />

          {/* ==========================
              Bank Information
          ========================== */}

          <BankInformation
            application={application}
          />

          {/* ==========================
              Documents
          ========================== */}

          <DocumentsSection
            application={application}
          />

        </div>

        {/* ==========================
            Footer
        ========================== */}

        <ApproveRejectFooter
          application={application}
          approving={approving}
          rejecting={rejecting}
          onApprove={onApprove}
          onReject={onReject}
        />

      </aside>

    </>
  );

};

export default ViewApplicationDrawer;