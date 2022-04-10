const { cars, orders, customers } = require("../database/models");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function differenceBetweenDates(date1, date2) {
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
}

// const date1 = new Date("2022-12-17T13:24:00");

const getAllOrders = async (req, res) => {
    try {
        const ordersData = await orders.findAll({
            include: [
                {
                    model: cars,
                    as: "car"
                },
                {
                    model: customers,
                    as: "customer"
                }
            ]
        });

        return res.status(200).json({
            orders: ordersData
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error getting all orders",
            error
        });
    }
};

const getOrderById = async (req, res) => {
    try {
        const orderId = parseInt(req.params.order_id);

        const orderData = await orders.findByPk(orderId, {
            include: [
                {
                    model: cars,
                    as: "car"
                },
                {
                    model: customers,
                    as: "customer"
                }
            ]
        });

        if (orderData) {
            return res.status(200).json({
                order: orderData
            });
        } else {
            return res.status(404).json({
                message: "Order not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// return price of cars from date departure to date return
const getPrice = async (req, res) => {
    try {
        const carId = parseInt(req.params.car_id);

        const { date_departure, date_return } = req.body;

        const carData = await cars.findByPk(carId);

        if (carData) {
            const price =
                differenceBetweenDates(date_departure, date_return) *
                carData.price;

            return res.status(200).json({
                price: price
            });
        } else {
            return res.status(404).json({
                message: "Car not found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const isCustomerActive = async (id) => {
    try {
        const customerData = await customers.findByPk(id, {
            attributes: ["is_active"]
        });

        if (customerData.is_active) {
            return customerData.is_active;
        } else {
            throw new Error("Customer is not active");
        }
    } catch (error) {
        throw new Error(error);
    }
};

const addOrder = async (req, res) => {
    try {
        const carId = parseInt(req.params.car_id);

        const { date_departure, date_return, customer_id } = req.body;

        const customerActive = await isCustomerActive(orderData.customer_id);

        if (!customerActive) {
            return res.status(404).json({
                message: "Customer not Active"
            });
        }

        const carData = await cars.findByPk(carId);

        if (!carData) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        const nbrOfDays = differenceBetweenDates(date_departure, date_return);

        const price = carData.price * nbrOfDays;

        const orderData = await orders.create({
            car_id: carId,
            customer_id: customer_id,
            date_departure: date_departure,
            date_return: date_return,
            total_price: price
        });

        return res.status(201).json({
            message: "Order created",
            order: orderData
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = parseInt(req.params.order_id);

        const {
            car_id,
            customer_id,
            date_departure,
            date_return,
            total_price
        } = req.body;

        const orderData = await orders.findByPk(orderId);

        if (!orderData) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        const carData = await cars.findByPk(car_id);

        if (!carData) {
            return res.status(404).json({
                message: "Car not found"
            });
        }

        const customerData = await customers.findByPk(customer_id);

        if (!customerData) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const nbrOfDays = differenceBetweenDates(date_departure, date_return);

        const price = carData.price * nbrOfDays;

        const updatedOrderData = await orders.update(
            {
                car_id: car_id,
                customer_id: customer_id,
                date_departure: date_departure,
                date_return: date_return,
                total_price: price
            },
            {
                where: {
                    id: orderId
                }
            }
        );

        return res.status(200).json({
            message: "Order updated",
            order: updatedOrderData
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

// front
const YOUR_DOMAIN = "http://localhost:3000";

const PRICE_ID = "price_1KmyUUAid8mWK1L4RVC47QQ8";
const CLIENT_MAIL = "bellaalirachid@gmail.com";
const QUANTITY = 1;

const payement = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        customer_email: CLIENT_MAIL,
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: PRICE_ID,
                quantity: QUANTITY
            }
        ],
        mode: "payment",
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`
    });

    res.redirect(303, session.url);
};

module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    getPrice,
    updateOrder,
    payement
};
