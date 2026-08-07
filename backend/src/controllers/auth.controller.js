const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")


async function registerUser(req,res){
    const {name, email, password,role} = req.body

    try {
        console.time("TOTAL REGISTER");

        if(!name || !email || !password){
            return res.status(400).json({
                message:"all fields are required"
            });
        }
        

        console.time("FIND USER");
        const isuserexist = await userModel.findOne({
            email
        })
        console.timeEnd("FIND USER");
        

        if(isuserexist){
            return res.status(409).json({message: "user already exist"})
        }
         
        console.time("BCRYPT");
        const hash = await bcrypt.hash(password,10)
        console.timeEnd("BCRYPT");

        console.time("CREATE USER");
        const user = await userModel.create({
            name,
            email,
            password:hash,
            role
        })
        console.timeEnd("CREATE USER");
        if(user){
            //generate token 
            console.time("JWT");
            const token = jwt.sign({
                id:user._id,
            },process.env.JWT_SECRET,
               { 
                expiresIn:"7d"
               }
            );
            console.timeEnd("JWT");

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
        console.timeEnd("TOTAL REGISTER");



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


