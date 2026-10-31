import { Router } from "express";
import authentic from "../middleware/authentic.middleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { categoryIdParams, categoryQuerySchema, createCategorySchema, updateCategorySchema } from "../validators/transactionCategory.validator.js";
import category from "../controllers/transactionCategory.controller.js";

const router = Router();

router.post("/create",authentic,validateRequest(createCategorySchema),category.createCategory)
router.get("/", authentic, validateRequest(categoryQuerySchema,"query"), category.getCategories);
router.patch("/update/:categoryId", authentic,validateRequest(categoryIdParams,"params"), validateRequest(updateCategorySchema), category.updateCategory);
router.delete("/delete/:categoryId", authentic, validateRequest(categoryIdParams,"params"), category.deleteCategory);

export default router;
