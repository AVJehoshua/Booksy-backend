

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    try {
        const { lineItems } = req.body;

        // Log received lineItems for debugging
        console.log("Received line items:", lineItems);

        // Validate lineItems structure
        if (!Array.isArray(lineItems) || lineItems.length === 0) {
            return res.status(400).json({ error: 'Invalid request: no line items provided.' });
        }

        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/cancel`,
        });

        // Return the session ID to the frontend
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Failed to create checkout session:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
