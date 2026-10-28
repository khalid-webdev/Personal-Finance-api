import authService from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  return res.status(201).json({
    success: true,
    message: "User successfully registered!",
    data: user
  });
});


const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  return res.status(200).json({
    success: true,
    message: "User logged in successfully!",
    data: result
  });
});

export default {
  register,
  login
};
