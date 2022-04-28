const router = require("express").Router();
const adminsCtrl = require("../controllers/admins");

router.post("/", adminsCtrl.addAdmin);
