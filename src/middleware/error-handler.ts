import type{ErrorRequestHandler} from "express"
import ApiError from "../utils/ApiError.js";

const errorHandler:ErrorRequestHandler = (err:unknown,_req,res,_next) => {

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
     success:false,
      message: err.message
    });
    return;
  }

  console.error("Unexpected Error", err);
  res.status(500).json({success:false,message:"Internal server error"})
}
export default errorHandler;
