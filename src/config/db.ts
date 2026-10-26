import mongoose from "mongoose"
import env from "./env.js"

const connectDb = async ():Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("Mongodb Connected successfully.....");
  } catch (error:unknown) {
    console.log("Mongodb Connection failed!", error);
    process.exit(1);
  }
}


export default connectDb;
