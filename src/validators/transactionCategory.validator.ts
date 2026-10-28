import Joi from "joi";

const createCategorySchema = Joi.object({
  categoryName: Joi.string().min(2).max(50).required().trim(),
  type:Joi.string().valid("income","expense").required()
});

export {
  createCategorySchema
}
