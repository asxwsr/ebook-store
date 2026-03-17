import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { BookCover3D } from "@/components/books/BookCover3D";
import { BuyActions } from "@/components/books/BuyActions";
import { BOOKS, formatDateShort } from "@/lib/books";

export function generateStaticParams() {
  return BOOKS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) return { title: "Book not found" };
  return {
    title: book.seo?.metaTitle ?? `Buy ${book.title} eBook – Instant Download`,
    description:
      book.seo?.metaDescription ??
      `${book.title} by ${book.author}. Download instantly. Read on any device.`,
    alternates: { canonical: `/books/${book.slug}` },
    openGraph: {
      title: book.title,
      description: book.oneLiner,
      type: "article",
    },
  };
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = BOOKS.find((b) => b.slug === slug);
  if (!book) notFound();

  return (
    <main className="container-px mx-auto max-w-6xl py-10 sm:py-14">
      <div className="mb-8">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-[650] text-[var(--muted)] hover:text-[var(--text)]"
        >
          <ArrowLeft className="size-4" />
          Back to catalog
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <div className="card relative overflow-hidden p-6">
            <div className="absolute inset-0 subtle-grid" aria-hidden />
            <div className="relative grid place-items-center py-4">
              <BookCover3D book={book} size="lg" />
            </div>
          </div>

          <BuyActions book={book} />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-xs font-[650] text-[var(--muted)]">
                {book.genre}
              </span>
              <span className="text-xs font-[650] text-[var(--muted2)]">
                Published {formatDateShort(book.publishedISO)}
              </span>
            </div>

            <h1
              className="mt-3 font-[950] tracking-[-0.045em] text-[var(--text)]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 4.2vw, 56px)", lineHeight: 1.02 }}
            >
              {book.title}
            </h1>
            {book.subtitle ? (
              <div className="mt-2 text-lg font-[650] text-[var(--muted)]">
                {book.subtitle}
              </div>
            ) : null}
            <div className="mt-3 text-sm font-[650] text-[var(--muted)]">
              By <span className="text-[var(--text)]">{book.author}</span>
            </div>
            {book.rating ? (
              <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                <Star className="size-4 text-[var(--accent)]" fill="currentColor" />
                <span className="font-[750] text-[var(--text)]">
                  {book.rating.value.toFixed(1)}
                </span>
                <span>({book.rating.count.toLocaleString()} ratings)</span>
              </div>
            ) : null}
          </div>

          <div className="card p-6">
            <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
              Overview
            </div>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:text-base">
              {book.description}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card p-6">
              <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
                Table of contents
              </div>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)]">
                {book.toc.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </div>
            <div className="card p-6">
              <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
                Formats
              </div>
              <div className="mt-3 space-y-3 text-sm text-[var(--muted)]">
                <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-4">
                  <div className="font-[750] text-[var(--text)]">{book.formats.join(" • ")}</div>
                  <div className="mt-1 leading-6">
                    Delivered instantly after purchase. Compatible with Kindle apps, Apple Books, Kobo, and more (format availability varies by title).
                  </div>
                </div>
                <a
                  className="btn btn-secondary h-11 w-full px-5 text-sm"
                  href={`/api/sample?slug=${encodeURIComponent(book.slug)}`}
                >
                  Free sample download (email required)
                </a>
              </div>
            </div>
          </div>

          {book.testimonials?.length ? (
            <div className="card p-6">
              <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
                Reviews
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {book.testimonials.map((t) => (
                  <div key={t.name} className="rounded-2xl border border-[var(--border)] bg-white/70 p-4">
                    <div className="text-sm leading-6 text-[var(--muted)]">“{t.quote}”</div>
                    <div className="mt-3 text-xs font-[750] text-[var(--text)]">
                      {t.name}
                      {t.role ? <span className="font-[650] text-[var(--muted)]"> • {t.role}</span> : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

