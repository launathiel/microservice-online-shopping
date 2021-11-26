const Joi = require('joi');

const signupValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(8)
      .email()
      .required()
      .messages({
        'string.base': 'email should be a type of string',
        'string.empty': 'email cannot be an empty field',
        'string.min': 'email should have a minimum length of 8',
        'any.required': 'email is a required field',
      }),
    password: Joi.string()
      .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/))
      .required()
      .messages({
        'string.pattern.base': 'Must have at least 8 characters that include one upper case, one lower case, one numeric character, and one special character',
        'any.required': 'password is a required field',
      }),
      
    phone: Joi.string()
      .pattern(new RegExp(/^[0-9]{7,14}$/))
      .required()
      .messages({
        'string.pattern.base': 'Phone must be number [0-9] with length of 7-14 character',
        'any.required': 'phone is a required field',
      }),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(8)
      .email()
      .required()
      .messages({
        'string.base': 'email should be a type of string',
        'string.empty': 'email cannot be an empty field',
        'string.min': 'email should have a minimum length of 8',
        'any.required': 'email is a required field',
      }),
    password: Joi.string()
      .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/))
      .required()
      .messages({
        'string.pattern.base': 'Must have at least 8 characters that include one upper case, one lower case, one numeric character, and one special character',
        'any.required': 'password is a required field',
      }),
  });
  return schema.validate(data);
};


module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;