const express = require("express");

const router = express.Router(); 

const {registerUser,loginUser,getUsers} = require("../controllers/auth.controller")
const {Protect} = require("../middlewares/auth.middleware")
const {admin} = require("../middlewares/admin.middleware")

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/users", Protect , admin ,getUsers);

module.exports = router;
