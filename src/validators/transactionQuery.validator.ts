import Joi from "joi";

const transactionQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(8),
  type: Joi.string().valid("income", "expense"),
  categoryId: Joi.string().hex().length(24),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso(),
  sort: Joi.string().valid("newest", "oldest").default("newest")
}).custom((value, helpers) => {
  if (value.startDate !== undefined && value.endDate !== undefined && value.startDate > value.endDate) {
    return helpers.error("Any:custom", { message: "Start date must be before or equal to end Date" });
  }
  return;

}).messages({"Any:custom":"{{#message}}",});


export {
  transactionQuerySchema
};
