const express = require("express");
const multer = require("multer");
 
const {Protect} = require("../middlewares/auth.middleware")
const {admin} = require("../middlewares/admin.middleware")

const {getProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("../controllers/product.controller")
const upload = multer({dest: 'uploads/'});

const router = express.Router();


//get all products
router.route('/').get(getProducts).post(Protect,admin,upload.single('image'),createProduct);

//get specificproduct
router.route('/:id').get(getProductById).put(Protect,admin,upload.single('image'),updateProduct).delete(Protect,admin, deleteProduct);



module.exports = router



