import "server-only";
import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";

type getOrCreateCustomerParams = {
  userId: string;
  userEmail: string;
};

export async function getOrCreateCustomer(params: getOrCreateCustomerParams) {
  try {
    const userRef = db.collection("users").doc(params.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (stripeCustomerId) {
      return stripeCustomerId;
    }

    const userName = userDoc.data()?.name;

    const customer = await stripe.customers.create({
      email: params.userEmail,
      ...(userName && { name: userName }),
      metadata: {
        userId: params.userId,
      },
    });

    await userRef.update({
      stripeCustomerId: customer.id,
    });

  } catch (error) {
    console.log({ error });
    throw new Error("Error creating customer");
  }
}
