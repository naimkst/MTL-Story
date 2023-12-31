import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useStore } from "../../store/store";
import { toast } from "react-toastify";
import { toastTime } from "../../helpers/variables";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [
    isCart,
    isCartActive,
    isPaymnet,
    isShipping,
    isPaymnetSuccess,
    setIsprocess,
    isProcess,
  ] = useStore((state: any) => [
    state.isCart,
    state.isCartActive,
    state.isPaymnet,
    state.isShipping,
    state.isPaymnetSuccess,
    state.setIsprocess,
    state.isProcess,
  ]);

  console.log("isShipping", isShipping);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsprocess(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}`,
      },
      redirect: "if_required",
    });

    if (paymentIntent) {
      isPaymnetSuccess(paymentIntent);
    }

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // setMessage("Payment successful!");
      // toast.success("Payment successful!");
      console.log("Payment successful");
    } else {
      // setMessage("An unexpected error occured.");
      toast.error("An unexpected error occured.", { autoClose: toastTime });
      console.log("Payment failed");
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      {isShipping ? (
        <button
          disabled={isProcess || !stripe || !elements}
          className="checkoutBtn mt-3"
          id="submit"
        >
          <span id="button-text">{isProcess ? "Laoding.." : "Pay now"}</span>
        </button>
      ) : (
        <>
          <div className="btnDisable mt-2" id="submit">
            <span id="button-text">{isProcess ? "Laoding.." : "Pay now"}</span>
          </div>
          <div className="text-center mt-2">
            <span className="billingDetails">
              Billing details are required!
            </span>
          </div>
        </>
      )}

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
