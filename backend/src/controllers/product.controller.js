
const Product = require("../models/product.model")
const cloudinary = require("../config/cloudinary");


const getProducts = async (req,res)=>{
    try {
        const products = await Product.find({});
        res.json(products)
    } catch (error) {
        res.status(500).json({message:'server error'});
    }
};  

const getProductById = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }
        else{
            res.status(404).json({message:'product not found'});
        }
    } catch (error) {
        res.status(500).json({message: "server error"});
    }
}

const createProduct = async (req,res)=>{
    
   try {
    const { name,description,price,category,stock } = req.body; 
    let imageUrl = '';
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        imageUrl = result.secure_url;
    }
    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        imageUrl
    })
    res.status(201).json({message:'product created successfully'})


   } catch (error) {
    res.status(500).json({message:"server error"});
   }
};

const updateProduct = async(req,res)=>{
    try {
        const {name, description, price, category,stock} = req.body;
        const product = await Product.findById(req.params.id);
        if(product){
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;
        }
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result);
            product.imageUrl = result.secure_url;
        }
        const updatedproduct = await product.save();
        res.json(updatedproduct);


    } catch (error) {
        res.status(500).json({message:"server error"});
    }
};

const deleteProduct = async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            await Product.findByIdAndDelete(req.params.id);
            res.json({message:"product removed"});
        }
        else{
            res.status(404).json({message:"product not found"})
        }

    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
};

module.exports = {getProducts,getProductById,createProduct,updateProduct,deleteProduct}



