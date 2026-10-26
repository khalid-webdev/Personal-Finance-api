import app from "./index.js";
import connectDb from "./config/db.js";
import env from "./config/env.js";


const startServer = async ():Promise<void> => {
  await connectDb();

  await new Promise((resolve, reject) => {
    const server = app.listen(env.port,resolve);
    server.once("error", reject);
  });
  console.log(`Server is running in ${env.nodeEnv} mode on port ${env.port}`);
};

startServer().catch((error:unknown) => {
  console.error("Failed to start server",error);
  process.exitCode = 1;
});
