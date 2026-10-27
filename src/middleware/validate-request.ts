import type {RequestHandler} from 'express'
import type {ObjectSchema} from "joi"

const validateRequest = (schema:ObjectSchema, property:"body" | "query" | "params" = 'body'):RequestHandler => {
  return (req, res, next):void => {

    const { error, value } = schema.validate(req[property],
      { abortEarly: false, convert: true });

    if (error) {
      console.log(error, "error");
      res.status(400).json({
      success: false,
      message: "Request validation failed",
        error: error.details.map((detail) => {
          return {
            field: detail.path.join("."),
            message:detail.message
          }
        }),
      })
      return;
    }
    req[property] = value;
    next()
  };
};
export default validateRequest;
