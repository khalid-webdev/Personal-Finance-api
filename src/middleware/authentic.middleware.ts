import { Types } from "mongoose";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from "express";
import ApiError from "../utils/ApiError.js";
import env from '../config/env.js';

const authentic: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token is required.");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new ApiError(401,"Invalid Token Format!")
  }

  try {
    const decode = jwt.verify(token, env.jwt.accessSecret);


    if (typeof decode === "string") {
      throw new ApiError(401, "Invalid access token");
    }
    const subject = decode.sub;
    if (typeof subject !=="string" || !Types.ObjectId.isValid(subject)) {
      throw new ApiError(401, "Invalid access token");
    }

    res.locals.id =new Types.ObjectId(subject);

    next()

  } catch{
    throw new ApiError(401, "Expired or invalid access token");
  };

};

export default authentic;
