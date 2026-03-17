"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { BOOKS, type Book } from "@/lib/books";
import { loadCart, normalizeCart, saveCart, type CartLine, type CartState } from "@/lib/cart";

type CartItem = { book: Book; qty: number };

type CartCtx = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotalUsd: number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ lines: [] });

  useEffect(() => {
    const id = window.setTimeout(() => setState(loadCart()), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    saveCart(state);
  }, [state]);

  const items = useMemo<CartItem[]>(() => {
    const out: CartItem[] = [];
    for (const line of state.lines) {
      const book = BOOKS.find((b) => b.slug === line.slug);
      if (!book) continue;
      out.push({ book, qty: line.qty });
    }
    return out;
  }, [state.lines]);

  const subtotalUsd = useMemo(() => {
    return items.reduce((sum, it) => sum + it.book.priceUsd * it.qty, 0);
  }, [items]);

  const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  const api = useMemo<CartCtx>(() => {
    function commit(next: CartState) {
      setState(normalizeCart(next));
    }

    return {
      items,
      lines: state.lines,
      count,
      subtotalUsd,
      add: (slug, qty = 1) => {
        const cur = new Map(state.lines.map((l) => [l.slug, l.qty]));
        cur.set(slug, (cur.get(slug) ?? 0) + qty);
        commit({ lines: [...cur.entries()].map(([s, q]) => ({ slug: s, qty: q })) });
      },
      remove: (slug) => commit({ lines: state.lines.filter((l) => l.slug !== slug) }),
      setQty: (slug, qty) => {
        const cur = state.lines.filter((l) => l.slug !== slug);
        if (qty > 0) cur.push({ slug, qty });
        commit({ lines: cur });
      },
      clear: () => commit({ lines: [] }),
    };
  }, [count, items, state.lines, subtotalUsd]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

