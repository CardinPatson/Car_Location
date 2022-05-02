const router = require("express").Router();
const ordersCtrl = require("../controllers/orders");
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

// API RESTFULL

//GET
router.get("/", ordersCtrl.getAllOrders);

// router.get("/:id", ordersCtrl.getOrderById);

// POST
router.post("/", ordersCtrl.addOrder);
router.post("/create-checkout-session", ordersCtrl.payement);

// PUT
router.put("/:id", ordersCtrl.updateOrder);

// WARNING : You cannot delete an order because you must keep its owner for at least 5 years.

module.exports = router;
