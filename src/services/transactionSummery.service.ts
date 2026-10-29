import { Types } from "mongoose"
import { TransactionModel } from "../models/Transaction.js";

type SummeryData = {
  year: number;
  month: number;
  currency: string;
}
type MonthlyAggregationRow = {
  _id: "income" | "expense";
  total: number;
};

const getMonthlyTransactionSummery = async (userId: Types.ObjectId, input: SummeryData) => {
  const startDate = new Date(Date.UTC(input.year, input.month - 1, 1));

  const endDate = new Date(Date.UTC(input.year, input.month, 1));

  const results = await TransactionModel.aggregate<MonthlyAggregationRow>([
    {
      $match: {
        userId,
        currency: input.currency,
        transactionDate: {
          $gte: startDate,
          $lt: endDate
        }
      }
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);
  console.log("first", results);
  const totals = { totalIncome: 0, totalExpense: 0 };

  for (const row of results) {
    if (row._id === "income") {
      totals.totalIncome = row.total;
    } else if (row._id ==="expense") {
      totals.totalExpense = row.total;
    }
  };

  const balance = totals.totalIncome - totals.totalExpense;
  return {
    month: `${input.year}-${String(input.month).padStart(2, "0")}`,
    currency: input.currency,
    ...totals,
    balance
  };
};


export {
  getMonthlyTransactionSummery
}
