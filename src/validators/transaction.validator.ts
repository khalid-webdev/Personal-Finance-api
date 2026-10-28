import Joi from "joi";


const transactionSchema = Joi.object({
  categoryId: Joi.string().hex().length(24).required(),
  type: Joi.string().valid("income", "expense").required(),
  amount: Joi.number().integer().min(1).required().max(Number.MAX_SAFE_INTEGER),
  currency: Joi.string().length(3).default("USD").uppercase(),
  description: Joi.string().trim().max(500).allow("").default(""),
  transactionDate: Joi.date().iso().required()
});


export {
  transactionSchema
}
