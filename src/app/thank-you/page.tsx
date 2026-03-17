"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Download, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { session_id?: string; demo?: string; email?: string };
}) {
  const cart = useCart();

  useEffect(() => {
    cart.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDemo = searchParams.demo === "1";

  return (
    <main className="container-px mx-auto max-w-3xl py-12 sm:py-16">
      <div className="card overflow-hidden">
        <div className="relative border-b border-[var(--border)] bg-white/70 px-6 py-6">
          <div className="absolute inset-0 subtle-grid" aria-hidden />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(20,184,166,0.22)] bg-[rgba(20,184,166,0.10)] px-3 py-1 text-xs font-[800] text-[var(--accent-ink)]">
              <Sparkles className="size-4 text-[var(--accent)]" />
              Payment received
            </div>
            <h1
              className="mt-3 font-[950] tracking-[-0.045em] text-[var(--text)]"
              style={{ fontFamily: "var(--font-display)", fontSize: 42, lineHeight: 1.02 }}
            >
              Thanks — your download is ready
            </h1>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)] sm:text-base">
              {isDemo
                ? "Demo mode: this simulates instant delivery after purchase."
                : "You’ll also receive an email receipt with the same download links."}
            </p>
          </div>
        </div>

        <div className="bg-white/60 px-6 py-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <a className="btn btn-primary h-12 px-5 text-sm" href="/downloads/demo.pdf">
              <Download className="size-4" /> Download PDF
            </a>
            <a className="btn btn-secondary h-12 px-5 text-sm" href="/downloads/demo.epub">
              Download EPUB
            </a>
            <a className="btn btn-secondary h-12 px-5 text-sm" href="/downloads/demo.mobi">
              Download MOBI
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-[650] text-[var(--muted)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              <ShieldCheck className="size-3.5" /> Secure delivery
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              Instant access
            </span>
          </div>

          {searchParams.session_id ? (
            <div className="mt-4 text-xs text-[var(--muted2)]">
              Stripe session: <span className="font-[750]">{searchParams.session_id}</span>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link href="/books" className="btn btn-secondary h-11 px-5 text-sm">
              Keep browsing
            </Link>
            <a className="btn btn-secondary h-11 px-5 text-sm" href="mailto:hello@aurumebooks.com">
              Need help? Email support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

