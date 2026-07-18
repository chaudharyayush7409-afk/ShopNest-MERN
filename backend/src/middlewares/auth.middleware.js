const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");11                                    


async function Protect(req,res,next){
    try {

        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message:"token is missing"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id).select('-password');
        
        if(!user){
            return res.status(401).json({
                message: "user not found"
            })
        }
        
        req.user = user;
        next()
        


    } catch (error) {
        res.status(401).json({message: "invalid token", error:error.message})
    }
}

module.exports = {Protect}
