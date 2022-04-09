const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");

const addCarsSchema = require("../validations/addCarsSchema");

const carCtrl = require("../controllers/car");

const multerMiddleware = require("../middleware/image");

// API RESTFULL

//GET
router.get("/", carCtrl.getAllCars);

router.get("/images", carCtrl.getCarsImages);

// POST
router.post("/", carCtrl.addCar);

// router.post("/", checkSchema(addCarsSchema), carCtrl.addCar);

router.post("/:id/images", multerMiddleware, carCtrl.addCarImages);

// PUT
// router.put("/:id", carCtrl.updateCar);
// router.post("/cars/:id/images", multerMiddleware, carCtrl.addCarImages);

// //PUT
// router.put("/cars/:id", carCtrl.updateCar);
//PUT
//router.put("/:id", carCtrl.updateCar);

//DELETE
router.delete("/:id", carCtrl.deleteCar);

module.exports = router;
