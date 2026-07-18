const express = require("express");
const {Protect} = require("../middlewares/auth.middleware")
const {admin} = require("../middlewares/admin.middleware")
const {getAdminStats} = require("../controllers/analytics.controller")

const router = express.Router();

router.get("/",Protect,admin,getAdminStats);

module.exports = router;





