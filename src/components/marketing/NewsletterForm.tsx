"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setStatus("ok");
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        id="newsletter-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 w-full flex-1 rounded-full border border-[var(--border)] bg-white/80 px-4 text-sm text-[var(--text)] shadow-[0_10px_25px_rgba(2,6,23,0.08)] outline-none placeholder:text-[var(--muted2)] focus:shadow-[0_0_0_6px_var(--ring)]"
      />
      <button
        type="submit"
        className="btn btn-primary h-11 px-5 text-sm"
      >
        {status === "ok" ? "You’re in" : "Get 10% off"}
      </button>
    </form>
  );
}

