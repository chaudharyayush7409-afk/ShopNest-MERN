const express = require('express')

const router = express.Router();

const {createdorder,verifypayment} = require("../controllers/payment.controller")

router.post("/order",createdorder)
router.post("/verify",verifypayment)


module.exports = router

