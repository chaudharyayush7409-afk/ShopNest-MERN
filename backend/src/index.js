const express = require("express");

const cors = require("cors")
const router = require("./routes/auth.route")
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.route");
const paymentroute = require('./routes/payment.route')
const analyticsroute = require('./routes/analytics.route')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin: ['http://localhost:5173','http://localhost:3000',process.env.FRONTEND_URL],
        credentials:true
    }
));
app.use("/api/auth",router)
app.use('/api/products',productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/payment',paymentroute)
app.use('/api/analytics',analyticsroute)

if(process.env.MODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}
else{
    app.get('/',(req,res)=>{
        res.send('ShopNest API is running in development mode...');
    });
}


module.exports = app;