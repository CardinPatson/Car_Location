const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");
const multerMiddleware = require("../middleware/image");

const { checkSchema } = require("express-validator");

const { addCarsSchema } = require("../validations/addCarsSchema");

//API RESTFULL
//GET
router.get("/cars", carCtrl.getCars);
//Crée une erreur lors de l'insertion sur /api/cars Apparement ne respecte pas les conventions rest 😑😑!!
//A faire lorsqu'on a un put ou delete ou quand le paramètre est obligatoire sur la route
// router.get("/cars/:id", carCtrl.getCarById);
router.get("/cars/images", carCtrl.getCarsImages);
router.get("/cars/orders", carCtrl.getCarsOrders);

//POST
router.post("/cars", carCtrl.addCar);
//router.post("/car", checkSchema(addCarsSchema), carCtrl.addCar);

router.post("/cars/:id/images", multerMiddleware, carCtrl.addCarImages);

//PUT
router.put("/cars/:id", carCtrl.updateCar);

//DELETE
router.delete("/cars/:id", carCtrl.deleteCar);

//TEST
router.post("/isExist", carCtrl.isExist);

module.exports = router;
