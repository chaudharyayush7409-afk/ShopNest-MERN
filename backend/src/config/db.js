const mongoose = require("mongoose");

async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log("✅ MongoDB Connected");
    return mongoose.connection;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
    throw err;
  }
}

module.exports = connectDB;