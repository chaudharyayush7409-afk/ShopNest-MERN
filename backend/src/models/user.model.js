const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum :['user','admin'],
        default: 'user'
    },
    verified: {
        type: Boolean,
        default: false
    },
    otp : {
        type: String,
        default: null
    },
    otpExpiry : {
        type : Date,
        default: null
    }
}, {timestamps: true});

const userModel = mongoose.model("users",userSchema);

module.exports = userModel



