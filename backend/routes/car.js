const router = require("express").Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

const addCarsSchema = require("../validations/addCars");

const carCtrl = require("../controllers/car");

const multerMiddleware = require("../middleware/image");

// API RESTFULL

//GET
router.get("/", carCtrl.getAllCars);
//cette route bloque la route /image car il devient obligatoire que sa soit un integer après la route.
// router.get("/:id", carCtrl.getCarById);

router.get("/images", carCtrl.getCarsImages);

// POST
router.post("/", addCarsSchema, carCtrl.addCar);
router.post("/:id/images", multerMiddleware, carCtrl.addCarImages);

//PUT
router.put("/:id", carCtrl.updateCar);

//DELETE
router.delete("/:id", carCtrl.deleteCar);

module.exports = router;
