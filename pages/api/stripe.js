import Stripe from "stripe";

// const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});
export default async function handler(req, res) {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.featured_image],
          // description: item.desc,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: (item?.totals?.total * 100) / item?.quantity?.value,
      },
      quantity: item?.quantity?.value,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: "http://localhost:3000?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/cancel",
  });

  console.log(session?.id);
  res.json({ ...session });
  res.redirect(303, session.url);
  // return session;
}
