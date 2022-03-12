const express = require("express");
const router = express.Router();

const carCtrl = require("../controllers/car");

//API RESTFULL
router.get("/", carCtrl.getCars);
router.get("/:id", carCtrl.getCarById);
router.post("/addCar", carCtrl.addCar);
router.put("/:id", carCtrl.updateCar);
router.delete("/:id", carCtrl.deleteCar);

module.exports = router;
