import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', ()=> {
      console.log("Connected to db successfully")
    })
    mongoose.connection.on('error', (error)=> {
      console.log("error in connection")
    })
  await mongoose.connect(config.databaseUrl as string);
  } catch (error) {
    console.error('Failed to connect to db', error)
    process.exit(1);
  }
};

export default connectDB;
