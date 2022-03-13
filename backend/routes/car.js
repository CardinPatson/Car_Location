const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");

//API RESTFULL
router.get("/getCars", carCtrl.getCars);
router.get("/getCar/:id", carCtrl.getCarById);
router.post("/addCar", carCtrl.addCar);
router.put("/updateCar/:id", carCtrl.updateCar);
router.delete("/deleteCar/:id", carCtrl.deleteCar);

module.exports = router;
