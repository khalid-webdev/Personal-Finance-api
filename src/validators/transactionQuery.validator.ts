import Joi from "joi";

const transactionQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(8),
  type: Joi.string().valid("income", "expense"),
  categoryId: Joi.string().hex().length(24),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  sort: Joi.string().valid("newest", "oldest").default("newest")
});


export {
  transactionQuerySchema
};
