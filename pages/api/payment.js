import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});

export default async function handler(req, res) {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: amount ? amount : 1000,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
}
