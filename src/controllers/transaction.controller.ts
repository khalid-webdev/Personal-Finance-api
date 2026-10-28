import { Types } from "mongoose";
import type{ RequestHandler } from "express";
import transactionService from "../services/transaction.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const createTransaction: RequestHandler = asyncHandler(async (req, res, next) => {
  console.log(res.locals.id);
  const userId: Types.ObjectId | undefined = res.locals.id;

  if (!userId) {
    throw new ApiError(401, "Authentication required!");
  }

  const result = await transactionService.createTransaction(userId, req.body);
  return res.status(201).json({
    status: "success",
    message: "Transaction created successfully!",
    data: result
  });
});

export {
  createTransaction
}
