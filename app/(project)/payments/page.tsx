"use client";

import { useStripe } from "@/app/hooks/useStripe";

export default function PaymentsPage() {
  const {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal,
  } = useStripe();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl text-center font-bold mb-5">Pagamentos</h1>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded mb-3 hover:bg-gray-400 cursor-pointer"
          onClick={() =>
            createPaymentStripeCheckout({
              id: "123",
            })
          }
        >
          Pagamento Stripe
        </button>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded mb-3 hover:bg-gray-500 cursor-pointer"
          onClick={() =>
            createSubscriptionStripeCheckout({
              id: "123",
            })
          }
        >
          Criar Assinatura Stripe
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
          onClick={handleCreateStripePortal}
        >
          Criar Portal de Pagamento
        </button>
      </div>
    </div>
  );
}
