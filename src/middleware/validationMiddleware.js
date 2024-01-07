// validationMiddleware.js
const { body, validationResult } = require('express-validator');

const userRegisterValidationRules = () => {
  return [
    body('firstName')
      .notEmpty().withMessage('First name is required')
      .trim().escape(),
    body('lastName')
      .notEmpty().withMessage('Last name is required')
      .trim().escape(),
    body('email')
      .isEmail().withMessage('Enter a valid email address')
      .normalizeEmail(),
    body('pwd')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .trim().escape(),
    body('pwdConf')
      .custom((value, { req }) => {
        if (value !== req.body.pwd) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
      .trim().escape(),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  req.flash('error', extractedErrors);
  res.redirect('back');
};

module.exports = {
  userRegisterValidationRules,
  validate,
};
