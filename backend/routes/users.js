const router = require("express").Router();
const usersCtrl = require("../controllers/users");
const userValidation = require("../validations/userSchema");
const auth = require("../middleware/authentification");

// API RESTFULL

//GET
router.get("/", auth, usersCtrl.getUser);
// router.get("/:id", usersCtrl.getUserById);
// router.get("/", usersCtrl.getUser);
//SIGNIN WITH GOOGLE

// POST
router.post("/", userValidation, usersCtrl.addUser);
//REGISTER WITH GOOGLE
router.post("/google", auth, usersCtrl.addGoogleUser);
//PUT
router.put("/:id", usersCtrl.updateUser);

//DELETE
router.delete("/:id", usersCtrl.deleteUser);

module.exports = router;
