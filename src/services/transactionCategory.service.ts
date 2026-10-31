import { Types } from "mongoose";
import { TransactionCategoryModel } from "../models/TransactionCategory.js";
import ApiError from "../utils/ApiError.js";

export type CategoryInput = {
  name: string;
  type: "income" | "expense";
};


/* ----------------------------- create category ---------------------------- */
const createCategory = async (userId: Types.ObjectId, input: CategoryInput) => {

  const existing = await TransactionCategoryModel.findOne({userId:userId,name:input.name,type:input.type});

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

/* ------------------------------ get category ------------------------------ */

const getCategories = async (
  userId: Types.ObjectId,
  input: Partial<CategoryInput>,
) => {
  const filter: {
    userId: Types.ObjectId;
    name?: { $regex: string; $options: string };
    type?: "income" | "expense";
  } = {
    userId,
  };

  if (input.name !== undefined) {
    filter.name = {
      $regex: input.name,
      $options: "i",
    };
  }

  if (input.type !== undefined) {
    filter.type = input.type;
  }

  const categories = await TransactionCategoryModel.find(filter)
    .sort({ name: 1 })
    .lean()
    .exec();

  return {
    categories,
    total: categories.length,
  };
};

const updateCategory = async (userId: Types.ObjectId, categoryId:string, input:Partial<CategoryInput>) => {
  const categoryObjectId = new Types.ObjectId(categoryId);
  const category = await TransactionCategoryModel.findOne({ _id: categoryObjectId, userId });

  if (!category) {
    throw new ApiError(404, "Category not found!");
  };

  const nextName = input.name ?? category.name;
  const nextType = input.type ?? category.type;

  const existing = await TransactionCategoryModel.findOne({
    userId,
    name: nextName,
    type: nextType,
    _id: { $ne: categoryId }
  });
  if (existing) {
    throw new ApiError(409, "A category with this name and type already exists.");
  }


  if (input.name !== undefined) {
    category.name = input.name;
  }
  if (input.type !== undefined) {
    category.type = input.type;
  }
  await category.save();

  return category;
}



/* ----------------------------- delete category ---------------------------- */
const deleteCategory = async (userId: Types.ObjectId, categoryId: string) => {
  const categoryObjectId = new Types.ObjectId(categoryId);

  const category = await TransactionCategoryModel.findOne({ _id: categoryObjectId, userId });

  if (!category) {
    throw new ApiError(404, "Category not found!");
  }

  const transactionExists = await TransactionCategoryModel.exists({ userId, categoryId: categoryObjectId });

  if (transactionExists) {
    throw new ApiError(409, "Cannot delete a category that has existing transactions");
  }

  await category.deleteOne();
  return category

};

export default {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
