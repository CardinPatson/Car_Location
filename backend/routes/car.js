const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");
const multerMiddleware = require("../middleware/image");

const { checkSchema } = require("express-validator");

const { addCarsSchema } = require("../validations/addCarsSchema");

//API RESTFULL
//GET
router.get("/cars", carCtrl.getCars);
router.get("/cars/:id", carCtrl.getCarById);
router.get("/cars-images", carCtrl.getCarsImages);

//POST
router.post("/car", carCtrl.addCar);
//router.post("/car", checkSchema(addCarsSchema), carCtrl.addCar);

router.post("/car-images", multerMiddleware, carCtrl.addCarImages);

//PUT
router.put("/car/:id", carCtrl.updateCar);

//DELETE
router.delete("/car/:id", carCtrl.deleteCar);

//TEST
router.post("/isExist", carCtrl.isExist);

module.exports = router;
