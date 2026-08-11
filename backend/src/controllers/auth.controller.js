const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")
const otpGenerator = require("otp-generator");


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
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });
        const otpExpiry = new Date(Date.now() + 5*60*1000); 
        const hash = await bcrypt.hash(password,10);
        const user = await userModel.create({
            name,
            email,
            password:hash,
            role,
            otp,
            otpExpiry
        })
        if(user){
            // sendmail
            sendEmail(email,"register successful", `hello ${name} welcome to shopnest and your otp is ${otp} please verify it, and the otp will expire in 5 minutes`);


            //generate token 
            console.time("JWT");
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

async function verifyotp(req,res){
    try {
        const {email,otp} = req.body;
        if(!email) return res.status(400).json({message:"email is required"});
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"});
        }
        if(user.otp !== otp || new Date()>new Date(user.otpExpiry)){
            return res.status(400).json({message:"invalid or expired otp"})
        }

        Object.assign(user,{otp:null, otpExpiry:null});
        await user.save();
        res.status(200).json({message:"otp verified successfully"})


    } catch (error) {
        console.log("error verifying otp:", error);
        return res.status(500).json({
            message:"error verifying otp", error: error.message
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

async function verifyotp(req,res){

}

module.exports = {registerUser,loginUser,getUsers,verifyotp}


