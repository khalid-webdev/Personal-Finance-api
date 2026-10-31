import Joi from "joi";

const transactionSummerySchema = Joi.object({
  year: Joi.number().integer().min(2000).max(2100).required(),
  month: Joi.number().integer().min(1).max(12).required(),
  currency: Joi.string().pattern(/^[A-Z]{3}$/).default("USD")
});

export {
  transactionSummerySchema
}
