import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata;
  const userEmail = metadata.user_email;
  const id = metadata.id;

  console.log("PAGAMENTO COM SUCESSO", userEmail, paymentData, id);
}
