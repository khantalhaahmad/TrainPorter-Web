const cloudinary = require("../config/cloudinary");

const User = require("../models/User");
const Porter = require("../models/Porter");
const PorterApplication = require("../models/PorterApplication");

const {
  successResponse,
  errorResponse,
} = require("../utils/responseHandler");
const uploadToCloudinary = (
  fileBuffer,
  folder,
  resourceType = "image"
) => {

  return new Promise((resolve, reject) => {

    const stream =
      cloudinary.uploader.upload_stream(

        {
          folder,
          resource_type: resourceType,
        },

        (error, result) => {

          if (error) {
            return reject(error);
          }

          resolve(result);

        }

      );

    stream.end(fileBuffer);

  });

};
const uploadDocument = async (
  file,
  folder
) => {

  if (!file) {

    return {
      publicId: "",
      url: "",
    };

  }

  const result =
    await uploadToCloudinary(
      file.buffer,
      folder,
      file.mimetype === "application/pdf"
        ? "raw"
        : "image"
    );

  return {

    publicId: result.public_id,

    url: result.secure_url,

  };

};
const applyPorter = async (req, res) => {
  try {

    // ==========================
    // Logged In User
    // ==========================

    const user = await User.findById(req.user.id);

    if (!user) {
      return errorResponse(
        res,
        "User not found",
        404
      );
    }

    // ==========================
    // Already Approved Porter
    // ==========================

    if (user.role === "porter") {
      return errorResponse(
        res,
        "You are already registered as a porter."
      );
    }

    // ==========================
    // Already Applied
    // ==========================

    const existingApplication =
      await PorterApplication.findOne({
        userId: user._id,
      });

    if (
      existingApplication &&
      existingApplication.status !== "rejected"
    ) {
      return errorResponse(
        res,
        "Your application already exists."
      );
    }


    // ==========================
    // Request Body
    // ==========================

    const {

      fullName,

      email,

      gender,

      dateOfBirth,

      address,

      city,

      state,

      pincode,

      preferredStation,

      stationCode,

      experience,

      languages,

      aadhaarNumber,

      accountHolder,

      accountNumber,

      ifscCode,

      upiId,

      emergencyContact,

      termsAccepted,

    } = req.body;

    // ==========================
    // Aadhaar Duplicate
    // ==========================

    const aadhaarExists =
      await PorterApplication.findOne({
        aadhaarNumber,
      });

    if (
      aadhaarExists &&
      aadhaarExists.userId.toString() !==
        user._id.toString()
    ) {
      return errorResponse(
        res,
        "Aadhaar already registered."
      );
    }

    // ==========================
    // Required Files
    // ==========================

    if (
      !req.files?.profilePhoto ||
      !req.files?.aadhaarFront ||
      !req.files?.aadhaarBack
    ) {

      return errorResponse(
        res,
        "Profile Photo, Aadhaar Front and Aadhaar Back are required."
      );

    }

    // ==========================
    // Upload Documents
    // ==========================

    const profilePhoto =
      await uploadDocument(
        req.files.profilePhoto[0],
        "TrainPorter/porter-profile"
      );

    const aadhaarFront =
      await uploadDocument(
        req.files.aadhaarFront[0],
        "TrainPorter/aadhaar-front"
      );

    const aadhaarBack =
      await uploadDocument(
        req.files.aadhaarBack[0],
        "TrainPorter/aadhaar-back"
      );

    const railwayLicense =
      await uploadDocument(
        req.files.railwayLicense?.[0],
        "TrainPorter/railway-license"
      );

    const policeVerification =
      await uploadDocument(
        req.files.policeVerification?.[0],
        "TrainPorter/police-verification"
      );

    // ==========================
    // Existing Rejected Application
    // ==========================

    if (
      existingApplication &&
      existingApplication.status === "rejected"
    ) {

      existingApplication.fullName = fullName;
      existingApplication.phone = user.phone;
      existingApplication.email = email;
      existingApplication.gender = gender;
      existingApplication.dateOfBirth = dateOfBirth;

      existingApplication.address = address;
      existingApplication.city = city;
      existingApplication.state = state;
      existingApplication.pincode = pincode;

      existingApplication.preferredStation =
        preferredStation;

      existingApplication.stationCode =
        stationCode;

      existingApplication.experience =
        experience || 0;

      existingApplication.languages =
        languages || [];

      existingApplication.aadhaarNumber =
        aadhaarNumber;

      existingApplication.accountHolder =
        accountHolder;

      existingApplication.accountNumber =
        accountNumber;

      existingApplication.ifscCode =
        ifscCode;

      existingApplication.upiId =
        upiId;

      existingApplication.emergencyContact =
        emergencyContact;

      existingApplication.profilePhoto =
        profilePhoto;

      existingApplication.aadhaarFront =
        aadhaarFront;

      existingApplication.aadhaarBack =
        aadhaarBack;

      existingApplication.railwayLicense =
        railwayLicense;

      existingApplication.policeVerification =
        policeVerification;

      existingApplication.status =
        "pending";

      existingApplication.rejectionReason =
        "";

      existingApplication.adminRemarks =
        "";

      existingApplication.termsAccepted =
        termsAccepted;

      await existingApplication.save();

      return successResponse(
        res,
        "Application resubmitted successfully.",
        {
          application:
            existingApplication,
        }
      );

    }

        // ==========================
    // Create New Application
    // ==========================

    const application =
      await PorterApplication.create({

        userId: user._id,

        fullName,

        phone: user.phone,

        email,

        gender,

        dateOfBirth,

        address,

        city,

        state,

        pincode,

        preferredStation,

        stationCode,

        experience: experience || 0,

        languages: languages || [],

        aadhaarNumber,

        accountHolder,

        accountNumber,

        ifscCode,

        upiId,

        emergencyContact,

        profilePhoto,

        aadhaarFront,

        aadhaarBack,

        railwayLicense,

        policeVerification,

        isPhoneVerified: user.isVerified,

        isDocumentVerified: false,

        status: "pending",

        rejectionReason: "",

        adminRemarks: "",

        termsAccepted,

      });

    return successResponse(
      res,
      "Porter application submitted successfully.",
      {
        application,
      }
    );

  } catch (error) {

    console.log(
      "Apply Porter Error:",
      error
    );

    return errorResponse(
      res,
      error.message,
      500
    );

  }

};

// ========================================
// Get My Application
// ========================================

const getMyApplication = async (
  req,
  res
) => {

  try {

    const application =
      await PorterApplication
        .findOne({
          userId: req.user.id,
        });

    if (!application) {

      return errorResponse(
        res,
        "Application not found.",
        404
      );

    }

    return successResponse(
      res,
      "Application fetched successfully.",
      {
        application,
      }
    );

  }

  catch (error) {

    console.log(
      "Get Application Error:",
      error
    );

    return errorResponse(
      res,
      error.message,
      500
    );

  }

};
// ========================================
// Get Application Status
// ========================================

const getApplicationStatus = async (
  req,
  res
) => {

  try {

    const application =
      await PorterApplication
        .findOne({
          userId: req.user.id,
        });

    if (!application) {

      return errorResponse(
        res,
        "Application not found.",
        404
      );

    }

    return successResponse(
      res,
      "Application status fetched successfully.",
      {

        status:
          application.status,

        rejectionReason:
          application.rejectionReason,

        adminRemarks:
          application.adminRemarks,

        appliedAt:
          application.createdAt,

        approvedAt:
          application.approvedAt,

      }

    );

  }

  catch (error) {

    console.log(
      "Status Error:",
      error
    );

    return errorResponse(
      res,
      error.message,
      500
    );

  }

};
// ==========================================
// Delete File From Cloudinary
// ==========================================

const deleteFromCloudinary = async (
  publicId,
  resourceType = "image"
) => {

  try {

    if (!publicId) return;

    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: resourceType,
      }
    );

  } catch (error) {

    console.log(
      "Cloudinary Delete Error:",
      error.message
    );

  }

};

// ==========================================
// Replace Existing Document
// ==========================================

const replaceDocument = async (
  newFile,
  oldDocument,
  folder
) => {

  if (!newFile) {
    return oldDocument;
  }

  if (
    oldDocument &&
    oldDocument.publicId
  ) {

    await deleteFromCloudinary(
      oldDocument.publicId,
      newFile.mimetype === "application/pdf"
        ? "raw"
        : "image"
    );

  }

  const uploaded =
    await uploadDocument(
      newFile,
      folder
    );

  return uploaded;

};

// ==========================================
// Update Porter Application
// ==========================================

const updateApplication = async (
  req,
  res
) => {

  try {

    const application =
      await PorterApplication.findOne({

        userId: req.user.id,

      });

    if (!application) {

      return errorResponse(

        res,

        "Application not found.",

        404

      );

    }

    if (
      application.status ===
      "approved"
    ) {

      return errorResponse(

        res,

        "Approved application cannot be updated."

      );

    }

    const {

      fullName,

      email,

      gender,

      dateOfBirth,

      address,

      city,

      state,

      pincode,

      preferredStation,

      stationCode,

      experience,

      languages,

      aadhaarNumber,

      accountHolder,

      accountNumber,

      ifscCode,

      upiId,

      emergencyContact,

      termsAccepted,

    } = req.body;

        // ==========================================
    // Aadhaar Duplicate Check
    // ==========================================

    if (
      aadhaarNumber &&
      aadhaarNumber !== application.aadhaarNumber
    ) {

      const aadhaarExists =
        await PorterApplication.findOne({
          aadhaarNumber,
        });

      if (
        aadhaarExists &&
        aadhaarExists.userId.toString() !==
          req.user.id
      ) {

        return errorResponse(
          res,
          "Aadhaar number already registered."
        );

      }

    }

    // ==========================================
    // Replace Documents
    // ==========================================

    application.profilePhoto =
      await replaceDocument(

        req.files?.profilePhoto?.[0],

        application.profilePhoto,

        "TrainPorter/porter-profile"

      );

    application.aadhaarFront =
      await replaceDocument(

        req.files?.aadhaarFront?.[0],

        application.aadhaarFront,

        "TrainPorter/aadhaar-front"

      );

    application.aadhaarBack =
      await replaceDocument(

        req.files?.aadhaarBack?.[0],

        application.aadhaarBack,

        "TrainPorter/aadhaar-back"

      );

    application.railwayLicense =
      await replaceDocument(

        req.files?.railwayLicense?.[0],

        application.railwayLicense,

        "TrainPorter/railway-license"

      );

    application.policeVerification =
      await replaceDocument(

        req.files?.policeVerification?.[0],

        application.policeVerification,

        "TrainPorter/police-verification"

      );

    // ==========================================
    // Update Personal Details
    // ==========================================

    application.fullName =
      fullName || application.fullName;

    application.email =
      email || application.email;

    application.gender =
      gender || application.gender;

    application.dateOfBirth =
      dateOfBirth || application.dateOfBirth;

    // ==========================================
    // Address
    // ==========================================

    application.address =
      address || application.address;

    application.city =
      city || application.city;

    application.state =
      state || application.state;

    application.pincode =
      pincode || application.pincode;

    // ==========================================
    // Railway Details
    // ==========================================

    application.preferredStation =
      preferredStation ||
      application.preferredStation;

    application.stationCode =
      stationCode ||
      application.stationCode;

    application.experience =
      experience ??
      application.experience;

    application.languages =
      languages ||
      application.languages;

    // ==========================================
    // Identity
    // ==========================================

    application.aadhaarNumber =
      aadhaarNumber ||
      application.aadhaarNumber;

    // ==========================================
    // Bank Details
    // ==========================================

    application.accountHolder =
      accountHolder ||
      application.accountHolder;

    application.accountNumber =
      accountNumber ||
      application.accountNumber;

    application.ifscCode =
      ifscCode ||
      application.ifscCode;

    application.upiId =
      upiId ||
      application.upiId;

    // ==========================================
    // Emergency Contact
    // ==========================================

    application.emergencyContact =
      emergencyContact ||
      application.emergencyContact;

    // ==========================================
    // Agreement
    // ==========================================

    if (
      typeof termsAccepted !==
      "undefined"
    ) {

      application.termsAccepted =
        termsAccepted;

    }

    // ==========================================
    // Reset Review Status
    // ==========================================

    application.status = "pending";

    application.rejectionReason = "";

    application.adminRemarks = "";

    application.isDocumentVerified = false;

        // ==========================================
    // Save Updated Application
    // ==========================================

    await application.save();

    return successResponse(
      res,
      "Application updated successfully.",
      {
        application,
      }
    );

  } catch (error) {

    console.log(
      "Update Application Error:",
      error
    );

    return errorResponse(
      res,
      error.message,
      500
    );

  }

};
module.exports = {

  applyPorter,

  getMyApplication,

  getApplicationStatus,

  updateApplication,

};
