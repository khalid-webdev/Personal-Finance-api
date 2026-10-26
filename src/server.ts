import "dotenv/config";
import app from "./index.js";

const PORT = Number(process.env.PORT ?? 8001);


const startServer = async ():Promise<void> => {
  // await connectDb();
  app.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`);
  });
};

void startServer();
