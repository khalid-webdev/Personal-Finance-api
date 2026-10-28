import type{ErrorRequestHandler} from "express"
import ApiError from "../utils/ApiError.js";


function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  );
}





const errorHandler:ErrorRequestHandler = (err:unknown,_req,res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
     success:false,
      message: err.message
    });

  }
  if (isDuplicateKeyError(err)) {
    return res.status(409).json({
    success: false,
    message: "A record with this value already exists.",
    })
  }

  console.error("Unexpected Error", err);
  res.status(500).json({success:false,message:"Internal server error"})
}
export default errorHandler;
