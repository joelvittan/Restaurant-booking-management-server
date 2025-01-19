const Joi = require("joi");

const createTableSchema = Joi.object({
  name: Joi.string().min(3).required(),
  capacity: Joi.number().integer().required(),
  status: Joi.string().valid("available", "reserved", "occupied").required(),
});

const updateTableSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  capacity: Joi.number().integer().optional(),
  status: Joi.string().valid("available", "reserved", "occupied").optional(),
});

const tableValidator = (data, schema) => schema.validate(data, { abortEarly: false });

module.exports = { createTableSchema, updateTableSchema, tableValidator };

