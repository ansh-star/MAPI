const { body } = require("express-validator");

const validateAdminSignUpBody = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isString()
    .withMessage("Username must be a string")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),

  body("mobileNumber")
    .notEmpty()
    .withMessage("Mobile number is required")
    .bail()
    .isMobilePhone()
    .withMessage("Mobile number must be a valid phone number"),

  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .bail()
    .isString()
    .withMessage("Location must be a string"),

  body("adminKey").notEmpty().withMessage("Admin key is required"),
];

const validateAdminLoginBody = [
  body("mobileNumber")
    .notEmpty()
    .withMessage("Mobile number is required")
    .bail()
    .isMobilePhone()
    .withMessage("Mobile number must be a valid phone number"),

  body("adminKey")
    .notEmpty()
    .withMessage("Admin key is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Admin key must be at least 8 characters long"),
];

module.exports = { validateAdminSignUpBody, validateAdminLoginBody };
