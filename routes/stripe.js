const express = require("express");
const router = express.Router();
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Stripe Checkout session route
router.post('/create-checkout-session', async (req, res) => {
    const { basketItems } = req.body;

    const lineItems = basketItems.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.title,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.BACKEND_URL}/success`, // Use environment variable for backend URL
            cancel_url: `${process.env.BACKEND_URL}/cancel`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
