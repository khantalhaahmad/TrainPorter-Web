const {
  body,
  validationResult,
} = require("express-validator");

// =========================================
// Validation Rules
// =========================================

const validatePorterApplication = [

  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Full name must be between 3 and 100 characters."
    ),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email address.")
    .normalizeEmail(),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required.")
    .isIn([
      "Male",
      "Female",
      "Other",
    ])
    .withMessage("Invalid gender."),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required.")
    .isISO8601()
    .withMessage("Invalid date format."),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required."),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),

  body("state")
    .trim()
    .notEmpty()
    .withMessage("State is required."),
    body("district")
.trim()
.notEmpty()
.withMessage("District is required."),

  body("pincode")
    .trim()
    .notEmpty()
    .withMessage("Pincode is required.")
    .isPostalCode("IN")
    .withMessage("Invalid Indian pincode."),

  body("preferredStation")
    .trim()
    .notEmpty()
    .withMessage("Preferred station is required."),

  body("stationCode")
    .trim()
    .notEmpty()
    .withMessage("Station code is required.")
    .isLength({
      min: 2,
      max: 10,
    })
    .withMessage("Invalid station code."),

  body("experience")
    .optional()
    .isInt({
      min: 0,
    })
    .withMessage(
      "Experience cannot be negative."
    ),

  body("languages")
  .optional()
  .custom((value, { req }) => {

    if (!value) return true;

    // Already array
    if (Array.isArray(value)) {
      return true;
    }

    // JSON String
    if (typeof value === "string") {

      try {

        const parsed = JSON.parse(value);

        if (Array.isArray(parsed)) {
          req.body.languages = parsed;
          return true;
        }

      } catch (err) {

        // Single language
        req.body.languages = [value];
        return true;

      }

    }

    throw new Error(
      "Languages must be an array."
    );

  }),

  body("aadhaarNumber")
    .trim()
    .notEmpty()
    .withMessage("Aadhaar number is required.")
    .matches(/^\d{12}$/)
    .withMessage(
      "Aadhaar number must contain exactly 12 digits."
    ),

  body("accountHolder")
    .trim()
    .notEmpty()
    .withMessage(
      "Account holder name is required."
    ),

  body("accountNumber")
    .trim()
    .notEmpty()
    .withMessage(
      "Account number is required."
    )
    .isLength({
      min: 8,
      max: 20,
    })
    .withMessage(
      "Invalid account number."
    ),

  body("ifscCode")
    .trim()
    .notEmpty()
    .withMessage("IFSC code is required.")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage("Invalid IFSC code."),

    body("bankName")
.trim()
.notEmpty()
.withMessage("Bank name is required."),

  body("upiId")
    .optional({
      checkFalsy: true,
    })
    .matches(/^[\w.\-]{2,}@[a-zA-Z]{2,}$/)
    .withMessage("Invalid UPI ID."),

  body("emergencyContact")
    .trim()
    .notEmpty()
    .withMessage(
      "Emergency contact is required."
    )
    .matches(/^[6-9]\d{9}$/)
    .withMessage(
      "Emergency contact must be a valid Indian mobile number."
    ),

  body("termsAccepted")
    .equals("true")
    .withMessage(
      "You must accept the Terms & Conditions."
    ),

  // =========================================
  // Final Validation Handler
  // =========================================

  (req, res, next) => {

    const errors =
      validationResult(req);

    if (!errors.isEmpty()) {

      return res.status(400).json({

        success: false,

        message:
          "Validation failed.",

        errors:
          errors.array(),

      });

    }

    next();

  },

];

module.exports =
  validatePorterApplication;