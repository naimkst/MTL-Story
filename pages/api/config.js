export default async function handler(req, res) {
  res.send({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_KEY,
  });
}
