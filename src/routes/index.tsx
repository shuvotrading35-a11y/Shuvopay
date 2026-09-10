import { createFileRoute } from "@tanstack/react-router";
import { PaymentCheckout } from "@/components/payment-checkout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ShuvoPay — Private Payment Control" },
      { name: "description", content: "Shuvo Ahmed's private payment automation, transaction verification and invoice control system." },
      { property: "og:title", content: "ShuvoPay — Private Payment Control" },
      { property: "og:description", content: "A private payment automation and transaction control system for Shuvo Ahmed's projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <PaymentCheckout />;
}
