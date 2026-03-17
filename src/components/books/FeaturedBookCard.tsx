"use client";

import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Book } from "@/lib/books";
import { formatUsd } from "@/lib/books";
import { BookCover3D } from "@/components/books/BookCover3D";
import { useCart } from "@/components/cart/CartProvider";

export function FeaturedBookCard({ book }: { book: Book }) {
  const cart = useCart();
  return (
    <div className="card lift h-full overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 subtle-grid pointer-events-none" aria-hidden />
        <div className="relative p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
              {book.heroTag ?? "Featured"}
            </span>
            <span className="text-xs font-[650] text-[var(--muted2)]">
              {book.formats.join(" • ")}
            </span>
          </div>

          <div className="mt-4 grid place-items-center">
            <BookCover3D book={book} size="sm" />
          </div>

          <div className="mt-4">
            <Link
              href={`/books/${book.slug}`}
              className="block font-[900] tracking-[-0.03em] text-[var(--text)] hover:underline"
              style={{ fontFamily: "var(--font-display)", fontSize: 22, lineHeight: 1.08 }}
            >
              {book.title}
            </Link>
            <div className="mt-1 text-sm font-[650] text-[var(--muted)]">
              {book.author}
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {book.oneLiner}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-primary h-11 px-4 text-sm"
              onClick={() => cart.add(book.slug, 1)}
            >
              <ShoppingCart className="size-4" />
              Buy {formatUsd(book.priceUsd)}
            </button>
            <Link
              href={`/books/${book.slug}`}
              className="btn btn-secondary h-11 px-4 text-sm"
            >
              Details <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

