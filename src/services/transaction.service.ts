import {Types} from 'mongoose'
import { TransactionCategoryModel } from '../models/Transaction-category.js';
import { Transaction, TransactionModel } from '../models/Transaction.js';
import ApiError from '../utils/ApiError.js';

export type TransactionInputData = {
  categoryId: string;
  type: "income" | "expense";
  amount: number;
  currency: string;
  description: string;
  transactionDate:Date;
}

const createTransaction = async (userId:Types.ObjectId,inputData:TransactionInputData):Promise<Transaction> => {
  const categoryId = new Types.ObjectId(inputData.categoryId);

  const category = await TransactionCategoryModel.findOne({ _id: categoryId, userId });

  if (!category) {
    throw new ApiError(404,"Transaction category not found!");
  }

  if (category.type !== inputData.type) {
    throw new ApiError(400,"Transaction type should match the category type!");
  }

  const newTransaction = new TransactionModel({
    userId,
    categoryId,
    type: inputData.type,
    amount: inputData.amount,
    currency: inputData.currency,
    description: inputData.description,
    transactionData: inputData.transactionDate
  });

  await newTransaction.save();

  return newTransaction;
}

export default {
  createTransaction
}
