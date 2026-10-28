import { Types } from "mongoose";
import type { RequestHandler } from "express";
import transactionService, { QueryTransactionInput } from "../services/transaction.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const createTransaction: RequestHandler = asyncHandler(async (req, res, next) => {

  const userId: Types.ObjectId | undefined = res.locals.id;

  if (!(userId instanceof Types.ObjectId)) {
    throw new ApiError(401, "Authentication required!");
  }

  const result = await transactionService.createTransaction(userId, req.body);
  return res.status(201).json({
    status: "success",
    message: "Transaction created successfully!",
    data: result
  });
});

//getting transaction
const getTransactions: RequestHandler = asyncHandler(async (_req, res, _next) => {

  const userId: unknown = res.locals.id;
  if (!(userId instanceof Types.ObjectId)) {
    throw new ApiError(401, "Authentication Required")
  }
  const query = res.locals.validateQuery as QueryTransactionInput;

  const result = await transactionService.getAllTransactions(userId, query);
  return res.status(200).json({
    success: true,
    data: result.transactions,
    pagination: result.pagination
  });
});

export {
  createTransaction,
  getTransactions
}
