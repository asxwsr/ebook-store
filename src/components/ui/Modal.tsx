"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="pointer-events-none absolute inset-0 mx-auto flex max-w-6xl items-center justify-center"
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
        }}
      >
        <div className="card pointer-events-auto flex w-full max-w-2xl flex-col overflow-hidden [max-height:calc(100svh-2rem)]">
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[var(--border)] bg-white/70 px-5 py-4">
            <div className="min-w-0">
              <div className="truncate font-[750] tracking-[-0.02em] text-[var(--text)]">
                {title ?? "Preview"}
              </div>
            </div>
            <button
              className="btn btn-secondary h-10 px-3"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
          <div
            className="min-h-0 flex-1 overflow-auto overscroll-contain bg-white/65 px-5 py-5 [touch-action:pan-y]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

