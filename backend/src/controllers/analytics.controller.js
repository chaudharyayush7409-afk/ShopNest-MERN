const orderModel = require("../models/order.model");
const product = require("../models/product.model");
const userModel = require("../models/user.model");


const getAdminStats = async(req,res)=>{
    try {
        
        const totalUsers = await userModel.countDocuments({role:"user"});
        const totalOrders = await orderModel.countDocuments({});
        const totalProducts = await product.countDocuments({});

        const orders = await orderModel.find({});

        const totalRevenuedata = orders.reduce((acc,order)=>acc+order.totalAmount,0);
        res.json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue : totalRevenuedata
        });


    } catch (error) {
        res.status(500).json({message:"error fetching stats", error:error.message})
    }
}

module.exports = { getAdminStats }
