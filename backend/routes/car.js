const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");

const multerMiddleware = require("../middleware/image");

const { addCarsValidateSchema } = require("../validations/addCarsSchema");

//API RESTFULL
//GET
// "/cars/:minPrice?/:maxPrice?/:brand?/:model?/:startDate?/:endDate?",
router.get("/cars", carCtrl.getCars);

router.get("/car/:name", carCtrl.getCarByName);

//Crée une erreur lors de l'insertion sur /api/cars Apparement ne respecte pas les conventions rest 😑😑!!
//A faire lorsqu'on a un put ou delete ou quand le paramètre est obligatoire sur la route
// router.get("/cars/:id", carCtrl.getCarById);
router.get("/cars/images", carCtrl.getCarsImages);
router.get("/cars/orders", carCtrl.getCarsOrders);

//POST
//router.post("/cars", carCtrl.addCar);

// router.post("/car", validate(checkSchema(addCarsSchema)), (req, res) => {
//   // Process data
//   res.status(200).json({
//     success: true,
//     message: "add car successful",
//   });
// });

router.post("/cars", addCarsValidateSchema, carCtrl.addCar);

router.post("/cars/:id/images", multerMiddleware, carCtrl.addCarImages);

//PUT
router.put("/cars/:id", carCtrl.updateCar);

//DELETE
router.delete("/cars/:id", carCtrl.deleteCar);

//TEST
router.post("/isExist", carCtrl.isExist);

module.exports = router;
