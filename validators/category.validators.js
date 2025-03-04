const Joi = require("joi");

const createCategorySchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().required(),
  image: Joi.string().optional(),
});



const categoryValidator = (data) => createCategorySchema.validate(data, { abortEarly: false });

module.exports = { createCategorySchema, categoryValidator };