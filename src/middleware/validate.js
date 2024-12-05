const { body, validationResult } = require('express-validator');

const contactValidationRules = () => {
  return [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ max: 255 })
      .withMessage('Name must be less than 255 characters')
      .escape(),

    body('email')
      .trim()
      .isEmail()
      .withMessage('Valid email is required')
      .normalizeEmail()
      .isLength({ max: 255 })
      .withMessage('Email must be less than 255 characters'),

    body('subject')
      .trim()
      .notEmpty()
      .withMessage('Subject is required')
      .isLength({ max: 255 })
      .withMessage('Subject must be less than 255 characters')
      .escape(),

    body('message')
      .trim()
      .notEmpty()
      .withMessage('Message is required')
      .isLength({ max: 5000 })
      .withMessage('Message must be less than 5000 characters')
      .escape(),

    body('captcha')
      .notEmpty()
      .withMessage('reCAPTCHA verification is required')
      .isString()
      .withMessage('Invalid reCAPTCHA format'),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  contactValidationRules,
  validate,
};
