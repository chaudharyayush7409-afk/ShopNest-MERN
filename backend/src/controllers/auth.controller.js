const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")


async function registerUser(req,res){
    const {name, email, password,role} = req.body

    try {

        if(!name || !email || !password){
            return res.status(400).json({
                message:"all fields are required"
            });
        }


        const isuserexist = await userModel.findOne({
            email
        })

        if(isuserexist){
            return res.status(409).json({message: "user already exist"})
        }

        const hash = await bcrypt.hash(password,10)

        const user = await userModel.create({
            name,
            email,
            password:hash,
            role
        })

        if(user){
            //generate otp
            const otp = Math.floor(100000 + Math.random()*900000).toString();

            const message = `welcome to ShopNest, ${name}!
            your otp for shopNest is: ${otp}`;
            
            await sendEmail(email, 'welcome to ShopNest - your otp for registration', message);
            
            //generate token 
            const token = jwt.sign({
                id:user._id,
            },process.env.JWT_SECRET,
               { 
                expiresIn:"7d"
               }
            );

            res.status(201).json({
                message:"user registered successfully. please check your email for the otp",
                user:{
                    _id:user.id,
                    name:user.name,
                    email:user.email
                },
                token
            })


        }



    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "internal server error"
        })
    }
}


async function loginUser(req,res){
    const{email,password}= req.body;
    
   

    try {
        if(!email || !password){
            return res.status(400).json({
                message: "email and password are required"
            })
        }
    
        const user = await userModel.findOne({email});
    
        if(!user){
            return res.status(400).json({message:"user not exist"});
        }
    
        const ispassword = await bcrypt.compare(password,user.password);
        if(!ispassword){
            return res.status(400).json({message:"incorrect password"})
        }
    
        const token = jwt.sign({
            id:user._id,
        },process.env.JWT_SECRET,
          {
            expiresIn:'7d',
          }
        ) 
    
        res.status(200).json({
            message:"user logged in successfully",
            user: {
                _id:user._id,
                name: user.name,
                email:user.email,
                role:user.role,
            },
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"})
    }


}


async function getUsers(req,res){
    try {
        const users = await userModel.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}

module.exports = {registerUser,loginUser,getUsers}


