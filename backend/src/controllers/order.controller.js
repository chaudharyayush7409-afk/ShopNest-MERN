const orderModel = require('../models/order.model');
const sendEmail = require('../utils/sendEmail');


// create new order

const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const createdOrder = await orderModel.create({
        user: req.user._id,
        items,
        totalAmount,
        address,
        paymentId
    });

      // Send Order Confirmation Email
      const message = `
        <h2>Order Confirmation</h2>
        <p>Hello ${req.user.name},</p>
        <p>Your order has been successfully placed! Order ID: <strong>${createdOrder._id}</strong></p>
        <p>Total Amount Paid: $${totalAmount.toFixed(2)}</p>
        <p>It will be shipped to: ${address.street}, ${address.city}</p>
        <p>Thank you for shopping with ShopNest!</p>
      `;

      await sendEmail(
        req.user.email,
        'ShopNest - Order Confirmation',
        message
      );

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


async function myOrders(req,res){
    try {
        const orders = await orderModel.find({user:req.user._id}).populate('items.productId', 'name price');
        res.json(orders);  
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message});
    }
}

async function getallOrders(req,res){
    try {
        const orders = await orderModel.find({}).populate('user','id name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({message: 'error fetching orders', error:error.message})
    }
}

async function updateOrderStatus(req,res){
    try {
        const {status} = req.body;
        const order = await orderModel.findById(req.params.id);

        if(order){
            order.status = status;
            await order.save();
            res.json({message: 'order status updated',order});
        }
        else{
            res.status(404).json({message: 'order not found'})
        }


    } catch (error) {
        res.status(500).json({message:'error updating order status', error:error.message})
    }

}

module.exports = {
    addOrderItems,
    myOrders,
    getallOrders,
    updateOrderStatus,

}

