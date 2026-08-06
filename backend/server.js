require("dotenv").config();

const app = require("./src/index");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
});