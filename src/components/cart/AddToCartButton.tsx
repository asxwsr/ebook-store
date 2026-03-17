"use client";

import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({
  slug,
  label,
  className,
  maxQty = 10,
}: {
  slug: string;
  label: React.ReactNode;
  className?: string;
  maxQty?: number;
}) {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const canDec = qty > 1;
  const canInc = qty < maxQty;

  const title = useMemo(() => "Add to cart", []);

  return (
    <>
      <button
        className={className}
        onClick={() => {
          setQty(1);
          setOpen(true);
        }}
        type="button"
      >
        {label}
      </button>

      <Modal
        open={open}
        title={title}
        onClose={() => setOpen(false)}
      >
        <div className="space-y-5">
          <div className="text-sm leading-6 text-[var(--muted)]">
            Choose quantity to add. (Digital products can be purchased as multiple copies for teams.)
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white/70 p-4">
            <div className="text-sm font-[750] text-[var(--text)]">Quantity</div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/80 px-2 py-1">
              <button
                className="grid size-10 place-items-center rounded-full hover:bg-black/[0.04] disabled:opacity-40"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={!canDec}
                aria-label="Decrease quantity"
                type="button"
              >
                <Minus className="size-4 text-[var(--muted)]" />
              </button>
              <div className="min-w-[3ch] text-center text-base font-[900] tabular-nums text-[var(--text)]">
                {qty}
              </div>
              <button
                className="grid size-10 place-items-center rounded-full hover:bg-black/[0.04] disabled:opacity-40"
                onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
                disabled={!canInc}
                aria-label="Increase quantity"
                type="button"
              >
                <Plus className="size-4 text-[var(--muted)]" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              className="btn btn-primary h-12 px-5 text-sm"
              onClick={() => {
                cart.add(slug, qty);
                setOpen(false);
              }}
              type="button"
            >
              <ShoppingCart className="size-4" /> Add {qty} to cart
            </button>
            <button
              className="btn btn-secondary h-12 px-5 text-sm"
              onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

