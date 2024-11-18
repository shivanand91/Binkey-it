import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

console.log(process.env.MONGODB_URI);

//The username is itzshivanand, and the password is lus4GYBzqKYw57Tp
if (!process.env.MONGODB_URI) {
    throw new Error(
        "You must provide a valid MONGODB_URI. Please see https://docs.mongodb.com"
    )
}

async function connectDB() { 
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch (error) {
        console.error("Mongodb connect error", error)
        process.exit(1)
    }
}

export default connectDB;