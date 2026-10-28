import express,{type Express} from "express";
import errorHandler from "./middleware/error-handler.js";
import transactionRoutes from "./routes/transaction.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app:Express = express();

app.use(express.json());


app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Api is running...",
  });
});

app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/auth", authRoutes);



//at the end
app.use(errorHandler);


export default app;
