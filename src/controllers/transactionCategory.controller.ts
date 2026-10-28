
import asyncHandler from "../utils/asyncHandler.js";
import transactionCategoryService,{CreateCategoryInput} from "../services/transactionCategory.service.js";
import { RequestHandler } from "express";
import ApiError from "../utils/ApiError.js";
import { Types } from "mongoose";


const createCategory:RequestHandler<{},unknown,CreateCategoryInput> = asyncHandler(async (req, res) => {
  const userId:Types.ObjectId | undefined= res.locals.id;

  if (!(userId instanceof Types.ObjectId)) {
    throw new ApiError(401, "Authentication required!");
  };

  const category = await transactionCategoryService.createCategory(userId, req.body);
  return res.status(201).json({
    success: true,
    message: "Successfully created the transaction category",
    data: category,
  });
});
export default {
  createCategory
}
