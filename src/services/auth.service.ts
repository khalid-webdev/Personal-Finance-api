import { UserModel } from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { generateAccessToken } from "../utils/jwt.js";
import { comparePassword, hashPassword } from "../utils/password.js";

type RegisterInput = {
  name: string,
  email: string,
  password:string
}

type LoginInput = {
  email: string,
  password:string
}



const register = async (registerInput: RegisterInput) => {
  const { name, email, password } = registerInput;

  const localizeEmail = email.trim().toLowerCase();
  const existing = await UserModel.findOne({ email: localizeEmail });
  if (existing) {
    throw new ApiError(400, "Email is already register!");
  }
  const hashedPassword = await hashPassword(password);

  const newUser = await UserModel.create({
    name,
    email: localizeEmail,
    password: hashedPassword
  });
  return {
    user: {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
    }
  };
};

const login = async (input: LoginInput) => {
  const user = await UserModel.findOne({ email: input.email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password!");
  }
  const isMatch = await comparePassword(input.password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password!")
  }
  const accessToken = generateAccessToken(user._id);

  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    accessToken
  };
};

export default {
  register,
  login
}
