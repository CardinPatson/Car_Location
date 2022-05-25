const router = require("express").Router();
const adminsCtrl = require("../controllers/admins");
const auth = require("../middleware/authentification");

//Insertion d'admin
router.post("/", auth, adminsCtrl.addAdmin);

module.exports = router;
