const Order = require('../models/order'); // Ensure this path matches your Order model file

exports.createOrder = async (req, res) => {
    const { user, items, totalAmount, shippingAddress } = req.body;

    // Check if items array is provided and is an array with at least one item
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items array is missing or invalid' });
    }

    // Validate items structure
    const itemsValidationErrors = items.filter(item => !item.item || typeof item.quantity !== 'number');
    if (itemsValidationErrors.length > 0) {
        return res.status(400).json({ message: 'Each item must have an "item" ObjectId and a "quantity"' });
    }

    try {
        // Create a new order
        const newOrder = new Order({
            user,
            items: items.map(item => ({
                item: item.item,
                quantity: item.quantity
            })),
            totalAmount,
            shippingAddress,
            paymentStatus: 'pending', // Set initial payment status
            // Additional fields like orderStatus can be set here as well
        });

        // Save the new order to the database
        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Failed to create order:', error);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
};
