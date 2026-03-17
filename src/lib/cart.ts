import type { Book } from "@/lib/books";

export type CartLine = {
  slug: Book["slug"];
  qty: number;
};

export type CartState = {
  lines: CartLine[];
};

export const CART_STORAGE_KEY = "aurum.cart.v1";

export function normalizeCart(state: CartState): CartState {
  const map = new Map<string, number>();
  for (const line of state.lines) {
    if (!line?.slug) continue;
    const qty = Number.isFinite(line.qty) ? Math.floor(line.qty) : 0;
    if (qty <= 0) continue;
    map.set(line.slug, (map.get(line.slug) ?? 0) + qty);
  }
  return { lines: [...map.entries()].map(([slug, qty]) => ({ slug, qty })) };
}

export function loadCart(): CartState {
  if (typeof window === "undefined") return { lines: [] };
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return { lines: [] };
    const parsed = JSON.parse(raw) as CartState;
    return normalizeCart(parsed);
  } catch {
    return { lines: [] };
  }
}

export function saveCart(state: CartState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalizeCart(state)));
}

