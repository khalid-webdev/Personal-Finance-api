import { Router } from "express";
import validateRequest from "../middleware/validate-request.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import authController from "../controllers/auth.controller.js";
const router = Router();


router.post("/register", validateRequest(registerSchema), authController.register);
router.post("/login", validateRequest(loginSchema), authController.login);


export default router;
