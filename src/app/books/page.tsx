import type { Metadata } from "next";
import { Catalog } from "@/components/books/Catalog";
import { BOOKS } from "@/lib/books";

export const metadata: Metadata = {
  title: "All eBooks",
  description: "Browse premium eBooks. Preview sample pages and download instantly after purchase.",
};

export default function BooksPage() {
  return (
    <main className="container-px mx-auto max-w-6xl py-10 sm:py-14">
      <div className="space-y-3">
        <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
          All Books
        </div>
        <h1
          className="font-[900] tracking-[-0.04em] text-[var(--text)]"
          style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1.0 }}
        >
          Browse the catalog
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
          Minimalist reading, maximum value. Preview before you buy, then download instantly in your preferred format.
        </p>
      </div>

      <div className="mt-8">
        <Catalog books={BOOKS} />
      </div>
    </main>
  );
}

