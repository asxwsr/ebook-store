"use client";

import Link from "next/link";
import { Download, ShieldCheck, ShoppingCart } from "lucide-react";
import type { Book } from "@/lib/books";
import { formatUsd } from "@/lib/books";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export function BuyActions({ book }: { book: Book }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
            Instant download
          </div>
          <div className="mt-1 text-2xl font-[850] tracking-[-0.03em] text-[var(--text)]">
            {formatUsd(book.priceUsd)}
          </div>
        </div>
        <div className="text-right text-xs font-[650] text-[var(--muted)]">
          {book.formats.join(" • ")}
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <AddToCartButton
          slug={book.slug}
          className="btn btn-primary h-12 px-5 text-sm"
          label={
            <>
              <ShoppingCart className="size-4" /> Add to cart
            </>
          }
        />
        <Link href="/checkout" className="btn btn-secondary h-12 px-5 text-sm">
          <Download className="size-4" /> Checkout now
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-[650] text-[var(--muted)]">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
          <ShieldCheck className="size-3.5" /> Secure Payment
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
          30-day money-back guarantee
        </span>
      </div>
    </div>
  );
}

