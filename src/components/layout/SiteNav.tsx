"use client";

import Link from "next/link";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export function SiteNav() {
  const cart = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(250,250,250,0.70)] backdrop-blur-xl">
      <div className="container-px mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-white shadow-[0_12px_30px_rgba(2,6,23,0.10)] ring-1 ring-[rgba(15,23,42,0.10)]">
            <Sparkles className="size-4 text-[var(--accent)]" />
          </span>
          <span className="leading-tight">
            <span className="block font-[750] tracking-[-0.02em] text-[var(--text)]">
              Aurum
            </span>
            <span className="block text-xs font-[600] text-[var(--muted2)]">
              Premium eBooks
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/books"
            className="hidden rounded-full px-4 py-2 text-sm font-[650] text-[var(--muted)] hover:text-[var(--text)] sm:inline-flex"
          >
            Catalog
          </Link>
          <Link
            href="/books"
            className="btn btn-secondary h-10 px-4 text-sm"
          >
            Browse
          </Link>
          <Link
            href="/checkout"
            className="btn btn-secondary h-10 px-4 text-sm"
            aria-label="Cart and checkout"
          >
            <ShoppingBag className="size-4" />
            <span className="tabular-nums">{cart.count}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

