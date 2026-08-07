require("dotenv").config();

const app = require("./src/index");
const connectDB = require("./src/config/db");
connectDB();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
});


