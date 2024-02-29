// basket.controller.js

const Basket = require("../models/basket");

// Function to add an item to the basket
const addItemToBasket = async (req, res) => {
    const userId = req.params.userId;
    const itemDetails = req.body; // Assuming the request body contains item details
    try {
        // Find the user's basket or create a new one if it doesn't exist
        let basket = await Basket.findOne({ user: userId });
        if (!basket) {
            basket = new Basket({ user: userId, items: [] });
        }

        // Add the item to the basket
        basket.items.push(itemDetails);
        await basket.save();

        res.status(201).json({ message: 'Item added to basket', basket: basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update the quantity of an item in the basket
const updateItemQuantity = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    const newQuantity = req.body.quantity; // Assuming the request body contains the new quantity
    try {
        // Find the user's basket
        const basket = await Basket.findOne({ user: userId });
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }

        // Update the quantity of the specified item
        const item = basket.items.id(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found in basket' });
        }
        item.quantity = newQuantity;
        await basket.save();

        res.status(200).json({ message: 'Item quantity updated', basket: basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to remove an item from the basket
const removeItemFromBasket = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;
    try {
        // Find the user's basket
        const basket = await Basket.findOne({ user: userId });
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }

        // Remove the specified item from the basket
        basket.items.pull(itemId);
        await basket.save();

        res.status(200).json({ message: 'Item removed from basket', basket: basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to get the contents of the user's basket
const getBasket = async (req, res) => {
    const userId = req.params.userId;
    try {
        // Find the user's basket
        const basket = await Basket.findOne({ user: userId });
        if (!basket) {
            return res.status(404).json({ message: 'Basket not found' });
        }

        res.status(200).json({ message: 'Basket retrieved', basket: basket });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    addItemToBasket,
    updateItemQuantity,
    removeItemFromBasket,
    getBasket
};
