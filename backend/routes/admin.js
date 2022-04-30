const router = require("express").Router();
const adminsCtrl = require("../controllers/admins");
const auth = require("../middleware/authentification");

//check if the admin have token
router.post("/", auth, adminsCtrl.addAdmin);

module.exports = router;
