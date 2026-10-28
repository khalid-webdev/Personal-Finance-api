import { Types } from "mongoose";
import { TransactionCategoryModel } from "../models/TransactionCategory.js";
import ApiError from "../utils/ApiError.js";

export type CreateCategoryInput = {
  name: string,
  type: "income" | "expense"
};

const createCategory = async (userId: Types.ObjectId, input: CreateCategoryInput) => {
  console.log(input)
  const existing = await TransactionCategoryModel.findOne({userId:userId,name:input.name});
  console.log(existing)
  if (existing) {
    throw new ApiError(409,"A category with this name and type already exists.")
  }
  const newCategory = new TransactionCategoryModel({
    userId,
    name: input.name,
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
