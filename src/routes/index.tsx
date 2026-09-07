import { createFileRoute } from "@tanstack/react-router";
import { PaymentCheckout } from "@/components/payment-checkout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — Orbit Digital" },
      { name: "description", content: "Choose a payment method and review secure payment instructions for Orbit Digital." },
      { property: "og:title", content: "Secure Checkout — Orbit Digital" },
      { property: "og:description", content: "A fast, trusted mobile payment checkout experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PaymentCheckout />;
}
