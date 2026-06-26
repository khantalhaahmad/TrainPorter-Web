const multer = require("multer");

// ----------------------------
// Memory Storage
// ----------------------------

const storage = multer.memoryStorage();

// ----------------------------
// Allowed MIME Types
// ----------------------------

const allowedImageTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const allowedPdfTypes = [
  "application/pdf",
];

// ----------------------------
// File Filter
// ----------------------------

const fileFilter = (req, file, cb) => {

  const isImage =
    allowedImageTypes.includes(file.mimetype);

  const isPdf =
    allowedPdfTypes.includes(file.mimetype);

  if (isImage || isPdf) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP and PDF files are allowed."
    ),
    false
  );

};

// ----------------------------
// Limits
// ----------------------------

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 5 * 1024 * 1024, // 5 MB

  },

});

// ----------------------------
// Porter Documents
// ----------------------------

const porterDocumentsUpload = upload.fields([

  {
    name: "profilePhoto",
    maxCount: 1,
  },

  {
    name: "aadhaarFront",
    maxCount: 1,
  },

  {
    name: "aadhaarBack",
    maxCount: 1,
  },

  {
    name: "railwayLicense",
    maxCount: 1,
  },

  {
    name: "policeVerification",
    maxCount: 1,
  },

]);

module.exports = {
  porterDocumentsUpload,
};