import {Router} from 'express'
import validateRequest from '../middleware/validateRequest.js';
import { transactionSchema } from '../validators/transaction.validator.js';
import { createTransaction, getTransactions } from '../controllers/transaction.controller.js';
import authentic from '../middleware/authentic.middleware.js';
import { transactionQuerySchema } from '../validators/transactionQuery.validator.js';

const router = Router();

router.post("/create", authentic,validateRequest(transactionSchema), createTransaction);
router.get("/", authentic, validateRequest(transactionQuerySchema, "query"), getTransactions);


export default router;
