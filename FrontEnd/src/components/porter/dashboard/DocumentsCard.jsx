import "./DocumentsCard.css";
import {
  BadgeCheck,
  FileText,
  Eye,
  ChevronRight,
} from "lucide-react";

const DocumentsCard = ({ application }) => {

  const documents = [
    {
      title: "Profile Photo",
      document: application?.profilePhoto,
    },
    {
      title: "Aadhaar Front",
      document: application?.aadhaarFront,
    },
    {
      title: "Aadhaar Back",
      document: application?.aadhaarBack,
    },
    {
      title: "Railway License",
      document: application?.railwayLicense,
    },
    {
      title: "Police Verification",
      document: application?.policeVerification,
    },
  ];

  const uploadedCount = documents.filter(
    (item) => item.document?.url
  ).length;

  const openDocument = (url) => {
    if (!url) return;

    window.open(url, "_blank");
  };

  return (
    <section className="tpad-documents-card">

      <div className="tpad-documents-header">

        <div>

          <h2>Submitted Documents</h2>

          <p>
            Documents received with your application.
          </p>

        </div>

       <div className="tpad-documents-count">

  <strong>{uploadedCount}</strong>

  <span>Documents</span>

</div>

      </div>

      <div className="tpad-documents-list">

        {documents.map((item, index) => {

          const uploaded = !!item.document?.url;

          return (

            <div
              className="tpad-documents-item"
              key={index}
            >

              <div className="tpad-documents-left">

                <div className="tpad-documents-icon">

             <FileText size={16} strokeWidth={2.2} />

                </div>
<div className="tpad-documents-info">

    <h4>{item.title}</h4>

    <span>
        {uploaded ? "Uploaded" : "Not Uploaded"}
    </span>

</div>

              </div>

              <div className="tpad-documents-right">

                <div className="tpad-documents-status">

                  <BadgeCheck size={16} />

                  {uploaded
                    ? "Uploaded"
                    : "Missing"}

                </div>

                <button
                  className="tpad-documents-view"
                  disabled={!uploaded}
                  onClick={() =>
                    openDocument(item.document?.url)
                  }
                  title={
                    uploaded
                      ? "View Document"
                      : "Document Not Uploaded"
                  }
                >

                  <Eye size={18} />

                </button>

              </div>

            </div>

          );

        })}

      </div>

      <button className="tpad-documents-btn">

        View All Documents

        <ChevronRight size={18} />

      </button>

    </section>
  );
};

export default DocumentsCard;