import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().trim().required().min(2).max(100),
  email: Joi.string().email().lowercase().trim(true).max(256),
  password:Joi.string().required().min(8).max(72)
}).required();
const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim(true).max(256),
  password:Joi.string().required().min(8).max(72)
}).required();

export {
  registerSchema,
  loginSchema
}
