import mongoose, { type InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minLength: 2, maxLength: 100 },
  email: { type: String, requried: true, lowercase: true, trim: true, unque: true },
  password: { type: String, required: true, select: false },
}, {
  timestamps: true,
  versionKey: false
});

type User = InferSchemaType<typeof userSchema>;

const UserModel = mongoose.model("User", userSchema);

export {
  User,
  UserModel
};
