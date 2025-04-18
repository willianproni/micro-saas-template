import { initMercadoPago } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type createMercadoPagoCheckoutParams = {
  id: string;
  userEmail: string;
};
export const useMercadoPago = () => {
  const router = useRouter();

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  async function createMercadoPagoCheckout({
    id,
    userEmail,
  }: createMercadoPagoCheckoutParams) {
    try {
      const response = await fetch("/api/mercado-pago/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, userEmail }),
      });

      const data = await response.json();

      router.push(data.init_point);
    } catch (error) {
      console.log({ error });
      throw error;
    }
  }

  return {
    createMercadoPagoCheckout,
  };
};
