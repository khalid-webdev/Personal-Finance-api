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

//getting all the transactions

const getAllTransactions = async (userId: Types.ObjectId, inputQuery: QueryTransactionInput) => {



  const filter: FilterQuery<Transaction> = {
    userId: userId,
  };

  if (inputQuery.type !== undefined) {
    filter.type = inputQuery.type;
  }
  if (inputQuery.categoryId !== undefined) {
    filter.categoryId = new Types.ObjectId(inputQuery.categoryId);
  }

  // if (inputQuery.startDate !== undefined || inputQuery.endDate !== undefined) {
  //   filter.transactionDate = {
  //     ...(inputQuery.startDate !== undefined ? { $gte: inputQuery.startDate } : {}),
  //     ...(inputQuery.endDate !== undefined ? { $lte: inputQuery.endDate } : {}),
  //   }
  // }

if (inputQuery.startDate !== undefined || inputQuery.endDate !== undefined) {
  const dateFilter: {
    $gte?: Date;
    $lte?: Date;
  } = {};

  if (inputQuery.startDate !== undefined) {
    dateFilter.$gte = inputQuery.startDate;
  }

  if (inputQuery.endDate !== undefined) {
    dateFilter.$lte = inputQuery.endDate;
  }

  filter.transactionDate = dateFilter;
}


  const skip = (inputQuery.page - 1) * inputQuery.limit;
  const sortDirection = inputQuery.sort === "newest" ? -1 : 1;

  const [transactions, total]=await Promise.all([
    TransactionModel.find(filter).sort({ transactionDate: sortDirection, _id: sortDirection }).select("-userId -createdAt -updatedAt").skip(skip).limit(inputQuery.limit).lean().exec(),
    TransactionModel.countDocuments(filter).exec()
  ]);

  const totalPages = Math.ceil(total / inputQuery.limit);

  return {
    transactions,
    pagination: {
      page: inputQuery.page,
      limit: inputQuery.limit,
      total,
      totalPages,
      hasNextPage: inputQuery.page < totalPages,
      hasPreviousPage: inputQuery.page > 1 && total > 0,
    }
  }

}


export default {
  createTransaction,
  getAllTransactions
}
