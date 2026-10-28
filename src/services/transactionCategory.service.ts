import { Types } from "mongoose";
import { TransactionCategoryModel } from "../models/TransactionCategory.js";
import ApiError from "../utils/ApiError.js";

export type CreateCategoryInput = {
  categoryName: string,
  type: "income" | "expense"
};

const createCategory = async (userId: Types.ObjectId, input: CreateCategoryInput) => {

  const existing = await TransactionCategoryModel.findOne({ userId, categoryName: input.categoryName });
  if (existing) {
    throw new ApiError(409,"Category Name is already taken")
  }
  const newCategory = new TransactionCategoryModel({
    userId,
    categoryName: input.categoryName,
    type: input.type
  });
  await newCategory.save();

  return {
    category:newCategory
  }
}

export default {
  createCategory
};
