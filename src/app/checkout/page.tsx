import type { Metadata } from "next";
import { CheckoutClient } from "@/components/cart/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout with instant download after purchase.",
};

export default function CheckoutPage() {
  return (
    <main className="container-px mx-auto max-w-6xl py-10 sm:py-14">
      <div className="space-y-3">
        <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
          Checkout
        </div>
        <h1
          className="font-[900] tracking-[-0.04em] text-[var(--text)]"
          style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1.0 }}
        >
          Complete your purchase
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
          You’ll receive an email receipt and an instant download link after payment.
        </p>
      </div>

      <div className="mt-8">
        <CheckoutClient />
      </div>
    </main>
  );
}

