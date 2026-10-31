import { Types } from "mongoose";
import type { RequestHandler, Response } from "express";
import transactionService, { QueryTransactionInput, TransactionInputData } from "../services/transaction.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";


const userIdChecker = (userLocalsId:Types.ObjectId):Types.ObjectId => {
const id: unknown = userLocalsId;
  if (!(id instanceof Types.ObjectId)) {
    throw new ApiError(401, "Authentication required!");
  }
  return id;
}

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

  const query = res.locals.validateQuery;

  const result = await transactionService.getAllTransactions(userId, query);

  return res.status(200).json({
    success: true,
    data: result.transactions,
    pagination: result.pagination
  });
});


//? update transaction controller
const updateTransaction = asyncHandler(async (req, res) => {
  const userId = userIdChecker(res.locals.id);
  const transactionId: unknown = req.params.id;
  if (typeof transactionId !== "string") {
    throw new ApiError(400,"Invalid Transaction Id !")
  }
  const inputBody = res.locals.validateBody as Partial<TransactionInputData>;
  const transaction = await transactionService.updateTransaciton(userId, transactionId, inputBody);

  return res.status(200).json({
    success: true,
    message: "successfully updated the transaction ",
    data: transaction
  });
});


/* --------------------------- delete transaction --------------------------- */
const deleteTransaction =asyncHandler(async(req,res)=> {
  const userId = userIdChecker(res.locals.id);

  const transactionId: unknown = req.params.id;
  if (typeof transactionId !== "string") {
    throw new ApiError(400,"Invalid Transaction Id !")
  }
  await transactionService.deleteTransaction(userId, transactionId);

  return res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
  });
})
export {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
};
