// === Webhook Architecture & Security ===
// A Webhook is essentially a "Reverse API".
// Instead of you calling Stripe, Stripe calls you.
// 
// === Trust but Verify ===
// 1. The Endpoint: A public POST route on your server that accepts JSON payloads.
// 
// 2. The Signature Secret: Since this route is public, anyone could try to "fake" a payment by sending a fake JSON.
// We use Hmac Signature Verification to ensure the request actually came from Stripe.
// 
// 3. Idempotency: Webhooks can be sent more than onnce if there's a network glitch.
// Your code must ensure that if you receive the "Payment Succeeded" hook twice, you don't give the user two subsciption.
// 
// 4. The 200 OK Rule: You must respond to a Webhook with a 200 status immediately.
// If you do heavy processing (like generating a PDF invoice), do it in a Background Queue (Day 25/26) so you don't time out the connection.


// MICROLAB
// Create a secure Stripe Webhook listener that verifies the signature and updates a user's "Pro" status.
import express from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Note: Stripe needs the RAW body to verify the signature
export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // 1. VERIFY that this actually came from Stripe
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        return res.status(400).send(`Webhook ERror: ${err.message}`);
    }

    // 2. Handle the specific event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        // 3. Move this to a background worker (BullMQ) if it takes time
        await User.findOneAndUpdate(
            { email: session.customer_details.email },
            { isPro: true }
        );
    }

    // 4. Return 200 immediately
    res.json({ received: true });
}