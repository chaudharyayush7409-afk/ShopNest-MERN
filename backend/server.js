require("dotenv").config();

const app = require("./src/index");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 3000;



connectDB();

console.log("Database connection successful");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





