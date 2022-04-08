const express = require("express");
const router = express.Router();

const ordersCtrl = require("../controllers/orders");

// API RESTFULL

//GET
router.get("/", ordersCtrl.getAllOrders);

router.get("/:id", ordersCtrl.getOrderById);

// POST
router.post("/", ordersCtrl.addOrder);

// PUT
router.put("/:id", carCtrl.updateOrder);

// WARNING : You cannot delete an order because you must keep its owner for at least 5 years.

module.exports = router;
