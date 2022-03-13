const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");
//const imgCtrl = require("../controllers/image");
const multerMiddleware = require("../middleware/image");

//API RESTFULL
//GET
router.get("/getCars", carCtrl.getCars);
router.get("/getCar/:id", carCtrl.getCarById);

//POST
router.post("/addCar", carCtrl.addCar);
//router.post( "/addCarsImages", multerMiddleware.single("image"), carCtrl.addCarsImages );

//PUT
router.put("/updateCar/:id", carCtrl.updateCar);

//DELETE
router.delete("/deleteCar/:id", carCtrl.deleteCar);

module.exports = router;
