const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");
const multerMiddleware = require("../middleware/image");

//API RESTFULL
//GET
router.get("/getCars", carCtrl.getCars);
router.get("/getCar/:id", carCtrl.getCarById);

//POST
router.post("/addCar", carCtrl.addCar);
router.post("/addCarImages", multerMiddleware , carCtrl.addCarImages);

//PUT
router.put("/updateCar/:id", carCtrl.updateCar);

//DELETE
router.delete("/deleteCar/:id", carCtrl.deleteCar);

//TEST
router.post("/isExist", carCtrl.isExist);

module.exports = router;
