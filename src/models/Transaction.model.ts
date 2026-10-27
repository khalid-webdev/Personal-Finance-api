import mongoose, { Schema, model, type InferSchemaType } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "  TransactionCategoryModel",
      required: true,
    },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: {
      type: Number,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: "Amount must be a safe integer in minor units",
      },
      required: true,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      minLength: 3,
      maxLength: 3,
      default: "USD",
    },
    description: { type: String, trim: true, maxLength: 500, default: "" },
    transactionDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

transactionSchema.index({ userId: 1, transactionDate: -1 });
transactionSchema.index({ userId: 1, categoryId: 1, transactionDate: -1 });

type Transaction = InferSchemaType<typeof transactionSchema>;

const TransactionModel = model("Transaction", transactionSchema);

export {
  Transaction,
  TransactionModel
};
