import type {RequestHandler} from 'express'
import type {ObjectSchema} from "joi"

type ValidationProperty = "body" | "params" | "query";

const validateRequest = (schema:ObjectSchema, property:ValidationProperty = 'body'):RequestHandler => {

  return (req, res, next):void => {
    const requestData = req[property] ?? {};
    const { error, value } = schema.validate(requestData,
      { abortEarly: false, convert: true });

    if (error) {
      res.status(400).json({
        success: false,
        message: "Request validation failed",
        error: error.details.map((detail) => {
          return {
            field: detail.path.length > 0 ? detail.path.join(".") : "No Collection Key found",
            message: detail.message
          }
        }),
      });
      return;
    }

    if (property === "body") {
      res.locals.validateBody = value ?? {};
      req.body = value;
    } else if (property === "query") {
      res.locals.validateQuery = value ?? {};
    }else {
      res.locals.validateParams = value ?? {};
    }
    next()
  };
};
export default validateRequest;
