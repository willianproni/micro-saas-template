import { db } from "@/app/lib/firebase";
import "server-only";
import Stripe from "stripe";

export async function handleStripeSubscription(
  event: Stripe.CheckoutSessionCompletedEvent
) {
  if (event.data.object.payment_status === "paid") {
    console.log(
      "Pagamento realizado com sucesso, Enviar e-amil liberando acesso"
    );

    const metadata = event.data.object.metadata;

    const userid = metadata?.userId;

    if (!userid) {
      console.error("User ID not found in metadata");
      return;
    }

    await db.collection("users").doc(userid).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "Active",
    });
  }
}
