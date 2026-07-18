
const express = require("express");  

const {Protect} = require("../middlewares/auth.middleware")
const {admin} = require("../middlewares/admin.middleware")

const {addOrderItems,getallOrders,myOrders,updateOrderStatus} = require("../controllers/order.controller")


const router = express.Router();

router.route('/').post(Protect,addOrderItems).get(Protect,admin,getallOrders);
router.route('/myorders').get(Protect,myOrders);
router.route('/:id/status').put(Protect,admin,updateOrderStatus);

module.exports = router;

