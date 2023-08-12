import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useStore } from "../../store/store";

import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET, {
  apiVersion: "2022-11-15",
});

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [subTotals] = useStore((state: any) => [state.subTotals]);

  console.log("subTotal=======", subTotals);

  useEffect(() => {
    fetch("/api//config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  const paymentLoad = async () => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "USD",
        amount: subTotals?.total,
        automatic_payment_methods: { enabled: true },
      });
      setClientSecret(paymentIntent.client_secret);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    // fetch("/api/payment", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     amount: subTotal?.total,
    //   }),
    // }).then(async (result) => {
    //   var { clientSecret } = await result.json();
    //   setClientSecret(clientSecret);
    // });
    paymentLoad();
  }, [subTotals]);

  return (
    <>
      {/* <h1>React Stripe and the Payment Element</h1> */}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
