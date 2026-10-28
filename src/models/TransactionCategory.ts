import { model, Schema, type InferSchemaType } from "mongoose";

const transactionCategorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, trim: true,minLength:2,maxLength:50 },
  type: { type: String, enum: ["income", "expense"], required: true },
}, {
  timestamps: true,
  versionKey: false
});

transactionCategorySchema.index(
  { userId: 1, name: 1, type: 1 },
  { unique: true }
);

type TransactionCategory = InferSchemaType<typeof transactionCategorySchema >;

const TransactionCategoryModel = model("TransactionCategory", transactionCategorySchema);

export {
  TransactionCategory,
  TransactionCategoryModel
}
