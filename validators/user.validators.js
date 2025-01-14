const Joi = require("joi");

const userSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("ADMIN", "WAITER", "CUSTOMER").required(),
});

const userValidator = (data) =>
  userSchema.validate(data, { abortEarly: false });

module.exports = {
  userValidator,
};


