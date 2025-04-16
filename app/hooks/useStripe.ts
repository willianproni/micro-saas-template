import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

type checkoutData = {
  id: string
}

export const useStripe = () => {
  const [stripe, setStripe] = useState<Stripe | null>();

  const loadStripeAsync = async () => {
    const stripeInstance = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUB_KEY!
    );
    setStripe(stripeInstance);
  };

  useEffect(() => {
    loadStripeAsync();
  }, []);

  const createPaymentStripeCheckout = async (checkoutData: checkoutData) => {
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/create-pay-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.log({ error });
    }
  };

  const createSubscriptionStripeCheckout = async (checkoutData: checkoutData) => {
    if (!stripe) return;

    try {
      const response = await fetch("/api/stripe/create-subscription-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();

      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.log({ error });
    }
  };

  const handleCreateStripePortal = async () => {
    try {
      const response = await fetch("/api/stripe/create-portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  };
};
