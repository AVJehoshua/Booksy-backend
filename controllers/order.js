const Order = require("../models/order"); // Ensure this path matches your Order model file
const Basket = require("../models/basket");

exports.createOrder = async (req, res) => {
    const { user_id, session_id } = req.body;

    try {
        const orderExists = await Order.findOne({ session_id: session_id });

        if (orderExists) {
            console.log(orderExists);
            const returnOrder = await orderExists.populate("items.product");
            res.status(201).json({
                message: "Order found",
                order: returnOrder,
            });
        } else {
            let currentBasket = await Basket.findOne({ user_id: user_id });

            const orderItems = [];
            currentBasket.items.forEach((book) => {
                orderItems.push({ product: book, quantity: 1 });
            });

            const newOrder = new Order({
                items: orderItems,
                user_id: user_id,
                session_id: session_id,
            });

            try {
                newOrder.save();
                const returnOrder = await newOrder.populate("items.product");
                res.status(201).json({
                    message: "Order created",
                    order: returnOrder,
                });
            } catch (error) {
                console.error(error);
            }

            try {
                await Basket.findByIdAndDelete(currentBasket._id);
                console.log("Basket deleted:", currentBasket._id);
            } catch (error) {
                console.error("Error deleting Basket:", error);
            }
        }
    } catch (error) {
        console.error(error);
    }

};
