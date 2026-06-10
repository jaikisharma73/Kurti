import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set("bufferCommands", false);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(`${MONGODB_URI}/e-commerce`)
      .then((mongoose) => {
        console.log("✅ DB Connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ DB Connection Error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;