const { validationRules } = require("../utils/validationRules");

function validateInput(req, res, next) {
  const errors = {};
  for (const [key, value] of Object.entries(req.body)) {
    const rule = validationRules[key];
    if (rule) {
      if (rule.required && !value) {
        errors[key] = `${key} is required`;
      } else if (value && !rule.pattern.test(value)) {
        errors[key] = rule.message;
      }
    }
  }

  // return validation errors if any
  if (Object.keys(errors).length > 0) {
    return res.status(400).send(errors);
  }

  next();
}

module.exports = (req, res, next) => {
  validateInput(req, res, next);
};
