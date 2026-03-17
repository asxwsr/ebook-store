"use client";

import { useMemo } from "react";
import type { Book } from "@/lib/books";

export function BookCover3D({
  book,
  size = "md",
}: {
  book: Pick<Book, "title" | "subtitle" | "author" | "cover">;
  size?: "sm" | "md" | "lg";
}) {
  const dims = useMemo(() => {
    if (size === "sm") return { w: 140, h: 190 };
    if (size === "lg") return { w: 220, h: 300 };
    return { w: 170, h: 235 };
  }, [size]);

  return (
    <div
      className="group relative select-none [perspective:900px]"
      style={{ width: dims.w, height: dims.h }}
      aria-label={`${book.title} cover`}
    >
      <div
        className="relative h-full w-full rounded-[18px] shadow-[0_28px_70px_rgba(2,6,23,0.18)] ring-1 ring-black/10 transition-transform duration-300 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-10deg)_rotateX(2deg)_translateY(-2px)]"
        style={{
          background: `linear-gradient(145deg, ${book.cover.base}, ${book.cover.base})`,
        }}
      >
        <div
          className="absolute inset-0 rounded-[18px]"
          style={{
            background:
              "radial-gradient(260px 180px at 18% 12%, rgba(255,255,255,0.25), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />

        <div className="absolute inset-0 rounded-[18px] p-5">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-[750] tracking-[-0.01em]"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: book.cover.titleColor,
              border: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            <span
              className="inline-block size-2 rounded-full"
              style={{ background: book.cover.accent }}
            />
            Digital Edition
          </div>

          <div className="mt-4 space-y-2">
            <div
              className="font-[800] leading-[1.02] tracking-[-0.035em]"
              style={{
                color: book.cover.titleColor,
                fontFamily: "var(--font-display)",
                fontSize: size === "lg" ? 28 : size === "sm" ? 18 : 22,
              }}
            >
              {book.title}
            </div>
            {book.subtitle ? (
              <div
                className="text-sm leading-5"
                style={{ color: "rgba(248,250,252,0.85)" }}
              >
                {book.subtitle}
              </div>
            ) : null}
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="flex items-center justify-between">
              <div
                className="text-xs font-[650]"
                style={{ color: "rgba(248,250,252,0.82)" }}
              >
                {book.author}
              </div>
              <div
                className="h-2 w-16 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${book.cover.accent}, rgba(255,255,255,0))`,
                  opacity: 0.9,
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="absolute -right-[10px] top-[12px] bottom-[12px] w-[14px] rounded-r-[18px] shadow-[0_18px_40px_rgba(2,6,23,0.10)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))",
            transform: "translateZ(-1px)",
            borderRight: "1px solid rgba(255,255,255,0.10)",
          }}
        />
      </div>
    </div>
  );
}

