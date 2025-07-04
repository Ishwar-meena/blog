import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URI)
            .then((mongoose) => {
                return mongoose;
            });
    }
    try {
        cached.conn = await cached.promise;
        console.log("MongoDB connected successfully");
        return cached.conn;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");

    }
}

export default connectDB;