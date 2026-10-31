import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import transactionCategoryService,{type CategoryInput} from "../services/transactionCategory.service.js";
import type{ RequestHandler } from "express";
import { Types } from "mongoose";
import { userIdChecker } from "./transaction.controller.js";

/* ----------------------------- create category ---------------------------- */
const createCategory: RequestHandler<{}, unknown, CategoryInput> = asyncHandler(async (req, res) => {
  const userId = userIdChecker(res.locals.id);

  const category = await transactionCategoryService.createCategory(userId, req.body);

  return res.status(201).json({
    success: true,
    message: "Successfully created the transaction category",
    data: category,
  });
});

/* ----------------------------- update category ---------------------------- */

const updateCategory:RequestHandler = asyncHandler(async (req, res) => {
  const userId = userIdChecker(res.locals.id);
  const categoryId: unknown = req.params.categoryId;
  if (typeof categoryId !== "string") {
    throw new ApiError(400, "Invalid category Id");
  }
  const inputBody = res.locals.validateBody as Partial<CategoryInput>;
  const category = await transactionCategoryService.updateCategory(userId, categoryId, inputBody);
  return res.status(200).json({
    success: true,
    message: "Category updated successfully!",
    data: category
  });
});

/* ------------------------------ get category ------------------------------ */

const getCategories:RequestHandler = asyncHandler(async (req, res) => {
  const userId = userIdChecker(res.locals.id);
  const inputQuery = res.locals.validateQuery as Partial<CategoryInput>;
  const categories = await transactionCategoryService.getCategories(userId, inputQuery);

  return res.status(200).json({
    success: true,
    data: categories
  });

});

/* ----------------------------- delete category ---------------------------- */
const deleteCategory:RequestHandler = asyncHandler(async (req, res) => {
  const userId = userIdChecker(res.locals.id);
  const categoryId: unknown = req.params.categoryId;
  if (typeof categoryId !== "string") {
    throw new ApiError(400, "Invalid category Id");
  }

  await transactionCategoryService.deleteCategory(userId, categoryId);

  return res.status(200).json({
    success: true,
    message: "Transaction Category deleted successfully",
  })
});

export default {
  createCategory,
  updateCategory,
  getCategories,
  deleteCategory
}
