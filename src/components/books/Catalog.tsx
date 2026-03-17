"use client";

import { useMemo, useState } from "react";
import type { Book, BookGenre } from "@/lib/books";
import { BookCard } from "@/components/books/BookCard";

type Sort = "newest" | "price_asc" | "price_desc" | "bestseller";

const ALL_GENRES: BookGenre[] = [
  "Leadership",
  "Business",
  "Productivity",
  "Design",
  "Writing",
  "Mindset",
];

export function Catalog({ books }: { books: Book[] }) {
  const [genre, setGenre] = useState<BookGenre | "all">("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [price, setPrice] = useState<"all" | "under10" | "10to15" | "15plus">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byGenre = genre === "all" ? books : books.filter((b) => b.genre === genre);

    const byPrice = byGenre.filter((b) => {
      if (price === "all") return true;
      if (price === "under10") return b.priceUsd < 10;
      if (price === "10to15") return b.priceUsd >= 10 && b.priceUsd <= 15;
      return b.priceUsd > 15;
    });

    const byQuery = q
      ? byPrice.filter((b) => {
          return (
            b.title.toLowerCase().includes(q) ||
            b.author.toLowerCase().includes(q) ||
            b.genre.toLowerCase().includes(q)
          );
        })
      : byPrice;

    const sorted = [...byQuery].sort((a, b) => {
      if (sort === "newest") return +new Date(b.publishedISO) - +new Date(a.publishedISO);
      if (sort === "price_asc") return a.priceUsd - b.priceUsd;
      if (sort === "price_desc") return b.priceUsd - a.priceUsd;
      const ar = a.rating?.count ?? 0;
      const br = b.rating?.count ?? 0;
      return br - ar;
    });

    return sorted;
  }, [books, genre, price, query, sort]);

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="grid gap-4 md:grid-cols-[1.2fr_repeat(3,0.9fr)]">
          <div>
            <label className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
              Search
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, author, or genre…"
              className="mt-2 h-11 w-full rounded-2xl border border-[var(--border)] bg-white/70 px-4 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted2)] focus:shadow-[0_0_0_6px_var(--ring)]"
            />
          </div>

          <div>
            <label className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value as BookGenre | "all")}
              className="mt-2 h-11 w-full rounded-2xl border border-[var(--border)] bg-white/70 px-3 text-sm text-[var(--text)] outline-none focus:shadow-[0_0_0_6px_var(--ring)]"
            >
              <option value="all">All</option>
              {ALL_GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
              Price
            </label>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value as typeof price)}
              className="mt-2 h-11 w-full rounded-2xl border border-[var(--border)] bg-white/70 px-3 text-sm text-[var(--text)] outline-none focus:shadow-[0_0_0_6px_var(--ring)]"
            >
              <option value="all">All</option>
              <option value="under10">Under $10</option>
              <option value="10to15">$10–$15</option>
              <option value="15plus">$15+</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
              Sort
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="mt-2 h-11 w-full rounded-2xl border border-[var(--border)] bg-white/70 px-3 text-sm text-[var(--text)] outline-none focus:shadow-[0_0_0_6px_var(--ring)]"
            >
              <option value="newest">Newest</option>
              <option value="bestseller">Bestseller</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--muted)]">
          <div>
            Showing <span className="font-[750] text-[var(--text)]">{filtered.length}</span>{" "}
            of <span className="font-[750] text-[var(--text)]">{books.length}</span>
          </div>
          <button
            className="btn btn-secondary h-10 px-4 text-sm"
            onClick={() => {
              setGenre("all");
              setSort("newest");
              setPrice("all");
              setQuery("");
            }}
          >
            Reset filters
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.map((b) => (
          <BookCard key={b.slug} book={b} />
        ))}
      </div>
    </div>
  );
}

