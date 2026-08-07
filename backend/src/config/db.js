const mongoose = require("mongoose");

async function connectDB() {
  console.log("========== DB START ==========");
  console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("========== ✅ MONGODB CONNECTED ==========");
    console.log("Ready state:", mongoose.connection.readyState);

    return true;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}

module.exports = connectDB;