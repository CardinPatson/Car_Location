const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");

const multerMiddleware = require("../middleware/image");

const { addCarsValidateSchema } = require("../validations/addCarsSchema");

//API RESTFULL
//GET
router.get("/cars", carCtrl.getAllCars);

router.get("/cars/images", carCtrl.getCarsImages);

router.post("/cars", addCarsValidateSchema, carCtrl.addCar);

router.post("/cars/:id/images", multerMiddleware, carCtrl.addCarImages);

//PUT
router.put("/cars/:id", carCtrl.updateCar);

//DELETE
router.delete("/cars/:id", carCtrl.deleteCar);

module.exports = router;
