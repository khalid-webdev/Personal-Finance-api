import Joi from "joi";

const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required().trim(),
  type:Joi.string().valid("income","expense").required()
});

const updateCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).trim(),
  type: Joi.string().valid("income", "expense")
}).min(1);


const categoryIdParams = Joi.object({
  categoryId: Joi.string().hex().length(24).required()
});


const categoryQuerySchema = Joi.object({
  name: Joi.string().min(2).max(50).trim(),
  type: Joi.string().valid("expense", "income"),
});

export {
  createCategorySchema,
  updateCategorySchema,
  categoryQuerySchema,
  categoryIdParams,
}
