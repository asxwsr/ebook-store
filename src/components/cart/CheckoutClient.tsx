"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Minus, Plus, ShieldCheck, Trash2, CreditCard, ArrowRight } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatUsd } from "@/lib/books";

export function CheckoutClient() {
  const cart = useCart();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const canPay = useMemo(() => cart.items.length > 0 && email.includes("@"), [cart.items.length, email]);

  async function onPay() {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          lines: cart.lines,
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Checkout failed");
    }
  }

  if (cart.items.length === 0) {
    return (
      <div className="card p-6">
        <div className="font-[850] tracking-[-0.03em] text-[var(--text)]">
          Your cart is empty
        </div>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Browse the catalog, preview sample pages, then come back to checkout.
        </p>
        <div className="mt-4">
          <Link href="/books" className="btn btn-primary h-11 px-5 text-sm">
            Browse books <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="card overflow-hidden">
        <div className="border-b border-[var(--border)] bg-white/70 px-6 py-5">
          <div className="font-[850] tracking-[-0.03em] text-[var(--text)]">
            Cart
          </div>
          <div className="mt-1 text-sm text-[var(--muted)]">
            Digital products only — no shipping.
          </div>
        </div>
        <div className="divide-y divide-[var(--border)] bg-white/60">
          {cart.items.map(({ book, qty }) => (
            <div key={book.slug} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="truncate font-[800] tracking-[-0.02em] text-[var(--text)]">
                  {book.title}
                </div>
                <div className="mt-1 text-sm text-[var(--muted)]">
                  {book.author} • {book.formats.join(" • ")}
                </div>
                <div className="mt-2 text-sm font-[750] text-[var(--text)]">
                  {formatUsd(book.priceUsd)}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/75 px-3 py-2">
                  <button
                    className="grid size-9 place-items-center rounded-full hover:bg-black/[0.04]"
                    onClick={() => cart.setQty(book.slug, qty - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-4 text-[var(--muted)]" />
                  </button>
                  <div className="min-w-[2ch] text-center text-sm font-[800] tabular-nums text-[var(--text)]">
                    {qty}
                  </div>
                  <button
                    className="grid size-9 place-items-center rounded-full hover:bg-black/[0.04]"
                    onClick={() => cart.setQty(book.slug, qty + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-4 text-[var(--muted)]" />
                  </button>
                </div>
                <button
                  className="btn btn-secondary h-11 px-4 text-sm"
                  onClick={() => cart.remove(book.slug)}
                >
                  <Trash2 className="size-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
            Checkout
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div className="text-sm font-[650] text-[var(--muted)]">Subtotal</div>
            <div className="text-2xl font-[900] tracking-[-0.04em] text-[var(--text)] tabular-nums">
              {formatUsd(cart.subtotalUsd)}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]" htmlFor="email">
              Email for receipt + download link
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="mt-2 h-11 w-full rounded-2xl border border-[var(--border)] bg-white/70 px-4 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted2)] focus:shadow-[0_0_0_6px_var(--ring)]"
            />
          </div>

          <button
            className="btn btn-primary mt-5 h-12 w-full px-5 text-sm disabled:opacity-50"
            onClick={onPay}
            disabled={!canPay || status === "loading"}
          >
            <CreditCard className="size-4" />
            {status === "loading" ? "Redirecting…" : "Pay securely"}
          </button>

          {error ? (
            <div className="mt-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-[650] text-[var(--muted)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              <ShieldCheck className="size-3.5" /> Secure Payment
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              Instant Download
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              30-day guarantee
            </span>
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm font-[800] tracking-[-0.02em] text-[var(--text)]">
            Payment methods
          </div>
          <div className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Stripe Checkout supports Visa, Mastercard, Apple Pay, and more. You can also wire PayPal as a second option if desired.
          </div>
        </div>
      </div>
    </div>
  );
}

