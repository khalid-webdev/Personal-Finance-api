import {Router} from 'express'
import validateRequest from '../middleware/validateRequest.js';
import { transactionSchema } from '../validators/transaction.validator.js';
import { createTransaction } from '../controllers/transaction.controller.js';
import authentic from '../middleware/authentic.middleware.js';

const router = Router();

router.post("/create", authentic,validateRequest(transactionSchema), createTransaction);


export default router;
