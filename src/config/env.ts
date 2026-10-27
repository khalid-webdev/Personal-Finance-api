import "dotenv/config";

import Joi from "joi";

const envSchema = Joi.object({
  PORT: Joi.number().port().default(8000),
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  MONGODB_URI: Joi.string().uri({scheme:["mongodb","mongodb+srv"]}).required(),
}).unknown(true);

const { error, value:envValue } = envSchema.validate(process.env, {
  abortEarly: false,
  convert: true
});

if (error) {
  throw new Error(`Enviroment validation failed: ${error.message}`)
}

const env = {
  port: envValue.PORT as number,
  nodeEnv: envValue.NODE_ENV as "development" |"production"|"test",
  mongoUri: envValue.MONGODB_URI as string,
};

export default env;
