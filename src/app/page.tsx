import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { BookCard } from "@/components/books/BookCard";
import { FeaturedBookCard } from "@/components/books/FeaturedBookCard";
import { BOOKS, FEATURED_SLUGS } from "@/lib/books";

export default function Home() {
  const featured = FEATURED_SLUGS.map((slug) => BOOKS.find((b) => b.slug === slug)).filter(
    Boolean,
  );

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 subtle-grid" aria-hidden />
        <div className="container-px relative mx-auto max-w-6xl py-14 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(20,184,166,0.22)] bg-[rgba(255,255,255,0.70)] px-4 py-2 text-xs font-[750] text-[var(--muted)] shadow-[0_14px_35px_rgba(2,6,23,0.08)]">
                <Sparkles className="size-4 text-[var(--accent)]" />
                Minimalist. Premium. Instant download.
              </div>

              <h1
                className="max-w-2xl font-[900] tracking-[-0.04em] text-[var(--text)]"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px, 5.2vw, 70px)", lineHeight: 0.98 }}
              >
                Premium eBooks That Inspire, Teach &amp; Transform
              </h1>

              <p className="max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
                Download instantly • Read on any device • No subscription required
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/books" className="btn btn-primary h-12 px-6 text-sm">
                  Browse All Books <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/books/the-quiet-advantage"
                  className="btn btn-secondary h-12 px-6 text-sm"
                >
                  Latest Release
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 text-xs font-[650] text-[var(--muted)]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
                  <ShieldCheck className="size-3.5" /> Secure Payment
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
                  <Zap className="size-3.5" /> Instant Download
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
                  30-day money-back guarantee
                </span>
              </div>
            </div>

            <div className="card relative overflow-hidden p-6">
              <div className="absolute inset-0 bg-[radial-gradient(360px_220px_at_20%_10%,rgba(20,184,166,0.18),transparent_60%),radial-gradient(420px_240px_at_90%_20%,rgba(15,23,42,0.10),transparent_60%)]" />
              <div className="relative space-y-3">
                <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
                  Featured
                </div>
                <div className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {featured.map((b) => (
                    <div
                      key={b!.slug}
                      className="min-w-[320px] snap-start sm:min-w-[360px]"
                    >
                      <FeaturedBookCard book={b!} />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-[var(--muted)]">
                  Hover the covers for a subtle 3D tilt. Preview samples before buying.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
              Catalog
            </div>
            <h2
              className="mt-2 font-[900] tracking-[-0.04em] text-[var(--text)]"
              style={{ fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.05 }}
            >
              Browse our best digital reads
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Clean previews, instant checkout, and formats for every device.
            </p>
          </div>
          <Link href="/books" className="btn btn-secondary h-11 px-5 text-sm">
            View full catalog <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {BOOKS.slice(0, 4).map((b) => (
            <BookCard key={b.slug} book={b} />
          ))}
        </div>
      </section>
    </main>
  );
}
