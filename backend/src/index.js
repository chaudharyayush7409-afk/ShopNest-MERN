const express = require("express");
const cors = require("cors");
const path = require("path");

const router = require("./routes/auth.route");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.route");
const analyticsroute = require("./routes/analytics.route");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://shop-nest-mern-react-gilt.vercel.app",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", router);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsroute);

app.get("/", (req, res) => {
  res.send("ShopNest API is running...");
});

module.exports = app;