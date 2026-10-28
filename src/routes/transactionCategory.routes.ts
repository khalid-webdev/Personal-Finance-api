import { Router } from "express";
import authentic from "../middleware/authentic.middleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { createCategorySchema } from "../validators/transactionCategory.validator.js";
import category from "../controllers/transactionCategory.controller.js";

const router = Router();

router.post("/create",authentic,validateRequest(createCategorySchema),category.createCategory)


export default router;
