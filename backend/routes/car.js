const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");

const multerMiddleware = require("../middleware/image");

const { addCarsValidateSchema } = require("../validations/addCarsSchema");

//API RESTFULL
//GET
router.get("/cars", carCtrl.getAllCars);
router.get("/cars/:id", carCtrl.getCarById);
router.get("/cars/:name", carCtrl.getCarByName);

// //Crée une erreur lors de l'insertion sur /api/cars Apparement ne respecte pas les conventions rest 😑😑!!
// //A faire lorsqu'on a un put ou delete ou quand le paramètre est obligatoire sur la route
// router.get("/cars/images", carCtrl.getCarsImages);
// router.get("/cars/orders", carCtrl.getCarsOrders);

// POST
router.post("/cars", carCtrl.addCar);

// router.post("/cars", addCarsValidateSchema, carCtrl.addCar);

// router.post("/cars/:id/images", multerMiddleware, carCtrl.addCarImages);

// //PUT
// router.put("/cars/:id", carCtrl.updateCar);

//DELETE
router.delete("/cars/:id", carCtrl.deleteCar);

//TEST
// router.get("/cars/testImage", carCtrl.testImage);

module.exports = router;
