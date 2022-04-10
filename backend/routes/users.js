const router = require("express").Router();
const usersCtrl = require("../controllers/users");

// API RESTFULL

//GET
router.get("/", usersCtrl.getAllUsers);
router.get("/images", usersCtrl.getUserById);
router.get("/images", usersCtrl.getUserByName);

// POST
router.post("/", usersCtrl.addUser);

//PUT
router.put("/:id", usersCtrl.updateUser);

//DELETE
router.delete("/:id", usersCtrl.deleteUser);

module.exports = router;
