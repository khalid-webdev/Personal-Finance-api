import {Router} from 'express'
import validateRequest from '../middleware/validateRequest.js';
import { transactionIdParamsSchema, transactionSchema, updateTransactionSchema } from '../validators/transaction.validator.js';
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from '../controllers/transaction.controller.js';
import authentic from '../middleware/authentic.middleware.js';
import { transactionQuerySchema } from '../validators/transactionQuery.validator.js';
import { transactionSummerySchema } from '../validators/transactionSummery.validator.js';
import transactionSummeryController from '../controllers/transactionSummery.controller.js';

const router = Router();

router.post("/create", authentic,validateRequest(transactionSchema), createTransaction);
router.get("/", authentic, validateRequest(transactionQuerySchema, "query"), getTransactions);
router.get("/summery", authentic, validateRequest(transactionSummerySchema, "query"), transactionSummeryController.getMonthlyTransactionSummery);
router.patch("/update/:id", authentic,validateRequest(transactionIdParamsSchema,"params"), validateRequest(updateTransactionSchema), updateTransaction);
router.delete("/delete/:id", authentic, validateRequest(transactionIdParamsSchema, "params"), deleteTransaction)

export default router;
