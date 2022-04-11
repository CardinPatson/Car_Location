<<<<<<< HEAD
const express = require("express");
const router = express.Router();

=======
const router = require("express").Router();
>>>>>>> master
const ordersCtrl = require("../controllers/orders");

// API RESTFULL

//GET
router.get("/", ordersCtrl.getAllOrders);

router.get("/:id", ordersCtrl.getOrderById);

// POST
router.post("/", ordersCtrl.addOrder);
<<<<<<< HEAD
=======
router.post("/create-checkout-session", ordersCtrl.payement);
>>>>>>> master

// PUT
router.put("/:id", ordersCtrl.updateOrder);

// WARNING : You cannot delete an order because you must keep its owner for at least 5 years.

module.exports = router;
