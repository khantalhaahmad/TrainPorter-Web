import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  Image,
  X,
  CheckCircle2,
} from "lucide-react";

import "./DocumentUpload.css";

const DOCUMENTS = [
  {
    key: "aadhaarFront",
    title: "Aadhaar Front",
    description: "Upload front side of Aadhaar Card",
    required: true,
    accept: "image/*,.pdf",
  },
  {
    key: "aadhaarBack",
    title: "Aadhaar Back",
    description: "Upload back side of Aadhaar Card",
    required: true,
    accept: "image/*,.pdf",
  },
  {
  key: "railwayLicense",
  title: "Railway License / Porter ID",
  description: "Upload Railway License (if available)",
  required: false,
  accept: "image/*,.pdf",
},
  {
    key: "profilePhoto",
    title: "Profile Photo",
    description: "Passport style photograph",
    required: true,
    accept: "image/*",
  },
  {
    key: "policeVerification",
    title: "Police Verification",
    description: "Optional",
    required: false,
    accept: "image/*,.pdf",
  },
];

const DocumentUpload = ({
  files,
  setFiles,
}) => {
  const inputRefs = useRef({});

const openFilePicker = (key) => {

  console.log("OPEN:", key);

  console.log(inputRefs.current[key]);

  inputRefs.current[key].click();

};

const MAX_SIZE = 5 * 1024 * 1024;

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "application/pdf",
];

const handleFile = (key, file) => {

  if (!file) return;

  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG, JPEG, PNG, WEBP and PDF files are allowed.");
    return;
  }

  if (file.size > MAX_SIZE) {
    alert("File size should be less than 5 MB.");
    return;
  }

  setFiles((prev) => ({
    ...prev,
    [key]: file,
  }));

};

  const removeFile = (key) => {
    setFiles((prev) => ({
      ...prev,
      [key]: null,
    }));

    if (inputRefs.current[key]) {
      inputRefs.current[key].value = "";
    }
  };

  const renderPreview = (file) => {
  if (!file) return null;

  // Image Preview
  if (file.type.startsWith("image/")) {
    const previewUrl = URL.createObjectURL(file);

    return (
      <img
        src={previewUrl}
        alt={file.name}
        className="preview-image"
        onLoad={() => URL.revokeObjectURL(previewUrl)}
      />
    );
  }

  // PDF Preview
  return (
    <div className="pdf-preview">
      <FileText size={40} />
      <p>PDF Document</p>
    </div>
  );
};

  return (
    <div className="document-upload-container">

      <div className="section-heading">
        <h2>Upload Documents</h2>

        <p>
          Please upload clear images or PDFs.
        </p>
      </div>

      <div className="document-grid">

        {DOCUMENTS.map((doc) => {

          const file = files[doc.key];

          return (
          <motion.div
  key={doc.key}
  className="document-card"
  initial={{
    opacity: 0,
    scale: 0.8,
  }}
  animate={{
    opacity: 1,
    scale: 1,
  }}
  transition={{
    duration: 0.35,
  }}
  whileHover={{
    y: -6,
    scale: 1.02,
  }}
>

              <input
  ref={(el) => {
    inputRefs.current[doc.key] = el;
    console.log(doc.key, el);
  }}
  type="file"
  hidden
  accept={doc.accept}
  onChange={(e) =>
    handleFile(doc.key, e.target.files?.[0])
  }
/>

              {!file ? (
                <div
                  className="upload-area"
                  onClick={() =>
                    openFilePicker(doc.key)
                  }
                >
                  <Upload
                    className="upload-icon"
                    size={34}
                  />

                  <h4>{doc.title}</h4>

                  <p>{doc.description}</p>

                  {doc.required && (
                   <span className={doc.required ? "required" : "optional"}>
  {doc.required ? "Mandatory" : "Optional"}
</span>
                  )}

                  <button
  type="button"
  className="browse-btn"
  onClick={(e) => {
    e.stopPropagation();
    console.log("Browse Button Clicked");
    openFilePicker(doc.key);
  }}
>
  Browse File
</button>
                </div>
              ) : (
                <div className="uploaded-card">

                  <div className="preview-wrapper">
                    {renderPreview(file)}
                  </div>

                  <div className="file-details">

                    <h4>{doc.title}</h4>

                    <span>
                      {file.name}
                    </span>

                   <small>
📁 {(file.size / 1024 / 1024).toFixed(2)} MB
</small>

<p className="upload-success">
✔ Uploaded Successfully
</p>

                  </div>

                  <div className="status-row">

                    <CheckCircle2
                      className="success-icon"
                      size={22}
                    />

                    <button
  type="button"
  className="remove-btn"
  onClick={() => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this document?"
    );

    if (confirmRemove) {
      removeFile(doc.key);
    }
  }}
>
  <X size={18} />
</button>

                  </div>

                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="upload-note">

        <Image size={20} />

        <span>
          JPG, PNG, JPEG or PDF supported.
          Maximum size 5 MB.
        </span>

      </div>

    </div>
  );
};

export default DocumentUpload;