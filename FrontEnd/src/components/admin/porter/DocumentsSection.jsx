import React from "react";
import {
  Eye,
  Download,
  FileImage,
} from "lucide-react";

const DocumentCard = ({
  title,
  image,
}) => {

  const openImage = () => {

    if (!image) return;

    window.open(
      image,
      "_blank"
    );

  };

  return (

    <div className="tp-porter-doc-card">

      <div className="tp-porter-doc-preview">

        {image ? (

          <img
            src={image}
            alt={title}
            className="tp-porter-doc-image"
          />

        ) : (

          <div className="tp-porter-doc-placeholder">

            <FileImage size={34} />

          </div>

        )}

      </div>

      <div className="tp-porter-doc-footer">

        <span className="tp-porter-doc-title">

          {title}

        </span>

        <div className="tp-porter-doc-actions">

          <button
            className="tp-porter-doc-btn"
            onClick={openImage}
          >

            <Eye size={16} />

          </button>

          {image && (

            <a
              href={image}
              target="_blank"
              rel="noreferrer"
              className="tp-porter-doc-btn"
            >

              <Download size={16} />

            </a>

          )}

        </div>

      </div>

    </div>

  );

};

const DocumentsSection = ({
  application,
}) => {

  if (!application) return null;

  return (

    <div className="tp-porter-doc-section">

      <h3 className="tp-porter-doc-heading">

        Uploaded Documents

      </h3>

      <div className="tp-porter-doc-grid">

        <DocumentCard
          title="Profile Photo"
          image={
            application.profilePhoto?.url
          }
        />

        <DocumentCard
          title="Aadhaar Front"
          image={
            application.aadhaarFront?.url
          }
        />

        <DocumentCard
          title="Aadhaar Back"
          image={
            application.aadhaarBack?.url
          }
        />

        <DocumentCard
          title="Railway License"
          image={
            application.railwayLicense?.url
          }
        />

        <DocumentCard
          title="Police Verification"
          image={
            application.policeVerification?.url
          }
        />

      </div>

    </div>

  );

};

export default DocumentsSection;