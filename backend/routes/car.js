const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");
//CONTROLLER

router.post("/addCars", carCtrl.addCars);
//API RESTFULL

//ROUTER
module.exports = router;
