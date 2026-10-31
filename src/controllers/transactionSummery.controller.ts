import { RequestHandler } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { Types } from "mongoose";
import ApiError from "../utils/ApiError.js";
import transactionSummeryService, { SummeryData } from "../services/transactionSummery.service.js";

const getMonthlyTransactionSummery: RequestHandler = asyncHandler(async (_req, res) => {
  const userId: unknown = res.locals.id;
  if ((!(userId instanceof Types.ObjectId))) {
    throw new ApiError(401, "Authentication required!");
  }
  const query = res.locals.validateQuery as SummeryData;
  const summery = await transactionSummeryService.getMonthlyTransactionSummery(userId, query);

  return res.status(200).json({
    success: true,
    data: summery
  })
});


export default {
  getMonthlyTransactionSummery
}
