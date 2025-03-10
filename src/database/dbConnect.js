import mongoose from "mongoose";

export default async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully.");
  } catch (error) {
    console.log("Error in connecting the database.", error);
  }
}
