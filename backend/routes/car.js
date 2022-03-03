const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");

//API RESTFULL
router.post("/", carCtrl.getCars);
router.post("/:id", carCtrl.getCarById);
router.post("/addCar", carCtrl.addCar);
router.post("/:id", carCtrl.updateCar);
router.post("/:id", carCtrl.deleteCar);

module.exports = router;
