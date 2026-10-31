import { Types } from 'mongoose'
import { TransactionCategoryModel } from '../models/TransactionCategory.js';
import { Transaction, TransactionModel } from '../models/Transaction.js';
import ApiError from '../utils/ApiError.js';

// Mongoose versions in some setups do not export FilterQuery directly,
// so keep a local compatible alias for query filtering.
type FilterQuery<T> = Partial<Record<keyof T, any>> & { [key: string]: any };

export type TransactionInputData = {
  categoryId: string;
  type: "income" | "expense";
  amount: number;
  currency: string;
  description: string;
  transactionDate: Date;
}

export type QueryTransactionInput = {
  page: number;
  limit: number;
  type?: "income" | "expense";
  categoryId?: string;
  startDate?: Date;
  endDate?: Date;
  sort: "newest" | "oldest";
};


/* ------------------------- create new transaction ------------------------- */

const createTransaction = async (userId: Types.ObjectId, inputData: TransactionInputData): Promise<Transaction> => {
  const categoryId = new Types.ObjectId(inputData.categoryId);

  const category = await TransactionCategoryModel.findOne({ _id: categoryId, userId });

  if (!category) {
    throw new ApiError(404, "Transaction category not found!");
  }

  if (category.type !== inputData.type) {
    throw new ApiError(400, "Transaction type should match the category type!");
  }

  const newTransaction = new TransactionModel({
    userId,
    categoryId,
    type: inputData.type,
    amount: inputData.amount,
    currency: inputData.currency,
    description: inputData.description,
    transactionDate:inputData.transactionDate ? inputData.transactionDate: new Date(),
  });

  await newTransaction.save();

  return newTransaction;
};

/* ---------------------- getting all the transactions ---------------------- */

const getAllTransactions = async (userId: Types.ObjectId, inputQuery?: Partial<QueryTransactionInput>) => {
  const query = {
    page: 1,
    limit: 8,
    sort: "newest" as const,
    ...inputQuery,
  };

  const filter: FilterQuery<Transaction> = {
    userId: userId,
  };

  if (query.type !== undefined) {
    filter.type = query.type;
  }
  if (query.categoryId !== undefined) {
    filter.categoryId = new Types.ObjectId(query.categoryId);
  }

  if (query.startDate !== undefined || query.endDate !== undefined) {
    const dateFilter: {
      $gte?: Date;
      $lte?: Date;
    } = {};

    if (query.startDate !== undefined) {
      dateFilter.$gte = query.startDate;
    }

    if (query.endDate !== undefined) {
      dateFilter.$lte = query.endDate;
    }

    filter.transactionDate = dateFilter;
  }

  const skip = (query.page - 1) * query.limit;
  const sortDirection = query.sort === "newest" ? -1 : 1;

  const [transactions, total] = await Promise.all([
    TransactionModel.find(filter)
      .sort({ transactionDate: sortDirection, _id: sortDirection })
      .select("-userId -createdAt -updatedAt")
      .skip(skip)
      .limit(query.limit)
      .lean()
      .exec(),
    TransactionModel.countDocuments(filter).exec()
  ]);

  const totalPages = Math.ceil(total / query.limit);

  return {
    transactions,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages,
      hasNextPage: query.page < totalPages,
      hasPreviousPage: query.page > 1 && total > 0,
    }
  }

}

/* ------------------------- update the transaction ------------------------- */
const updateTransaciton = async (userId: Types.ObjectId, transactionId: string, input: Partial<TransactionInputData>) => {
  const transactionObjectId = new Types.ObjectId(transactionId);

  const existing = await TransactionModel.findOne({ userId: userId, _id: transactionObjectId });

  if (!existing) {
    throw new ApiError(404, "Transaction not found!");
  }
  const nextCategoryId = input.categoryId !== undefined ? new Types.ObjectId(input.categoryId) : existing.categoryId;
  const nextType = input.type ?? existing.type;

  if (input.categoryId !== undefined || input.type !== undefined) {
    const category = await TransactionCategoryModel.findOne({ _id: input.categoryId, userId });
    if (!category) {
      throw new ApiError(404, "Category not found!");
    }

    if (category.type !== nextType) {
      throw new ApiError(400, "Transaction type must match the category type!");
    }
  };

  if (input.categoryId !== undefined) {
    existing.categoryId = nextCategoryId;
  };
  if (input.type !== undefined) {
    existing.type = input.type;
  };
  if (input.amount !== undefined) {
    existing.amount = input.amount;
  };
  if (input.currency !== undefined) {
    existing.currency = input.currency;
  };
  if (input.description !== undefined) {
    existing.description = input.description;
  };
  if (input.transactionDate !== undefined) {
    existing.transactionDate = input.transactionDate;
  };
  await existing.save();

  return { transaction: existing };

};

/* ------------------------ //delete the transaction ------------------------ */

async function deleteTransaction (userId:Types.ObjectId,transactionId:string) {
  const transaction=await TransactionModel.findOneAndDelete({ _id: transactionId, userId });
  if (!transaction) {
    throw new ApiError(404, "Transaction Not found!");
  }
  return transaction;
}
export default {
  createTransaction,
  getAllTransactions,
  updateTransaciton,
deleteTransaction
};
