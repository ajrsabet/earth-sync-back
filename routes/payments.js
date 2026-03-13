const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

// Requires STRIPE_SECRET_KEY in environment
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || '');

// Create a Checkout Session
// Accepts JSON body: { amount } (in cents) OR { priceId }
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, priceId } = req.body;
    const origin = process.env.FRONTEND_URL || `http://localhost:3000`;

    let session;
    if (priceId) {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
      });
    } else if (amount && Number.isInteger(amount)) {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Donation to Terra Score' },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
      });
    } else {
      return res.status(400).json({ error: 'Missing amount or priceId' });
    }

    res.json({ id: session.id });
  } catch (err) {
    console.error('Stripe create session error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
