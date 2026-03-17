"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Star, ShoppingCart, BookOpen, ArrowRight } from "lucide-react";
import type { Book } from "@/lib/books";
import { formatUsd } from "@/lib/books";
import { BookCover3D } from "@/components/books/BookCover3D";
import { Modal } from "@/components/ui/Modal";
import { useCart } from "@/components/cart/CartProvider";

function Stars({ value }: { value: number }) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <div className="flex items-center gap-1 text-[var(--muted2)]" aria-label={`Rating ${value}`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = rounded >= i + 1;
        return (
          <Star
            key={i}
            className="size-3.5"
            fill={filled ? "currentColor" : "none"}
            opacity={filled ? 1 : 0.35}
          />
        );
      })}
    </div>
  );
}

export function BookCard({
  book,
  showExcerpt = true,
}: {
  book: Book;
  showExcerpt?: boolean;
}) {
  const cart = useCart();
  const [previewOpen, setPreviewOpen] = useState(false);

  const formats = useMemo(() => book.formats.join(" • "), [book.formats]);

  return (
    <div className="card lift overflow-hidden">
      <div className="relative">
        <div className="absolute inset-0 subtle-grid pointer-events-none" aria-hidden />
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-6">
            <Link href={`/books/${book.slug}`} className="group">
              <BookCover3D book={book} />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {book.heroTag ? (
                  <span className="inline-flex items-center rounded-full border border-[rgba(20,184,166,0.22)] bg-[rgba(20,184,166,0.10)] px-3 py-1 text-xs font-[750] text-[var(--accent-ink)]">
                    {book.heroTag}
                  </span>
                ) : null}
                <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-xs font-[650] text-[var(--muted)]">
                  {book.genre}
                </span>
                <span className="text-xs font-[650] text-[var(--muted2)]">
                  {formats}
                </span>
              </div>

              <div className="mt-3">
                <Link
                  href={`/books/${book.slug}`}
                  className="block font-[850] tracking-[-0.03em] text-[var(--text)] hover:underline"
                  style={{ fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.1 }}
                >
                  {book.title}
                </Link>
                <div className="mt-1 text-sm font-[650] text-[var(--muted)]">
                  {book.author}
                </div>
              </div>

              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {book.oneLiner}
              </p>

              {book.rating ? (
                <div className="mt-3 flex items-center gap-2">
                  <Stars value={book.rating.value} />
                  <span className="text-xs font-[650] text-[var(--muted2)]">
                    {book.rating.value.toFixed(1)} • {book.rating.count.toLocaleString()} ratings
                  </span>
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  className="btn btn-secondary h-11 px-4 text-sm"
                  onClick={() => setPreviewOpen(true)}
                >
                  <BookOpen className="size-4" />
                  Preview
                </button>
                <button
                  type="button"
                  className="btn btn-primary h-11 px-4 text-sm"
                  onClick={() => cart.add(book.slug, 1)}
                >
                  <ShoppingCart className="size-4" />
                  Buy for {formatUsd(book.priceUsd)}
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

          {showExcerpt ? (
            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-white/70 p-4 text-sm leading-6 text-[var(--muted)]">
              <span className="font-[750] text-[var(--text)]">Excerpt:</span>{" "}
              {book.excerpt}
            </div>
          ) : null}
        </div>
      </div>

      <Modal
        open={previewOpen}
        title={`Preview — ${book.title}`}
        onClose={() => setPreviewOpen(false)}
      >
        <div className="grid gap-5 sm:grid-cols-[1fr_1.2fr]">
          <div className="grid place-items-center">
            <BookCover3D book={book} size="sm" />
          </div>
          <div className="space-y-4">
            <div className="text-sm leading-6 text-[var(--muted)]">
              <span className="font-[750] text-[var(--text)]">Sample pages:</span>{" "}
              This is a lightweight preview. In production you can swap this for a real PDF/flipbook viewer.
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-4 text-sm leading-6 text-[var(--muted)]">
              {book.excerpt}
            </div>
            <div>
              <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
                Table of contents
              </div>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[var(--muted)]">
                {book.toc.slice(0, 5).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className="btn btn-primary h-11 px-4 text-sm"
                onClick={() => {
                  cart.add(book.slug, 1);
                  setPreviewOpen(false);
                }}
              >
                Buy for {formatUsd(book.priceUsd)}
              </button>
              <a
                href={`/api/sample?slug=${encodeURIComponent(book.slug)}`}
                className="btn btn-secondary h-11 px-4 text-sm"
              >
                Free sample (email)
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

