import Link from "next/link";
import { CreditCard, Lock, Mail, ShieldCheck, Zap } from "lucide-react";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[rgba(255,255,255,0.55)]">
      <div className="container-px mx-auto grid max-w-6xl gap-10 py-14 md:grid-cols-2">
        <div className="space-y-4">
          <div className="text-sm font-[700] tracking-[-0.02em] text-[var(--text)]">
            Aurum eBooks
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
            Premium digital books for modern work. Instant download after
            purchase—PDF/EPUB/MOBI options when available.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 text-xs font-[650] text-[var(--muted)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              <Lock className="size-3.5" /> Secure payment
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              <Zap className="size-3.5" /> Instant download
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              <ShieldCheck className="size-3.5" /> 30-day guarantee
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-[750] tracking-[-0.02em] text-[var(--text)]">
                  Get 10% off your first eBook
                </div>
                <div className="mt-1 text-sm text-[var(--muted)]">
                  Join the newsletter for new releases and free samples.
                </div>
              </div>
              <Mail className="mt-1 size-5 text-[var(--muted2)]" />
            </div>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-[650] text-[var(--muted2)]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              <CreditCard className="size-3.5" /> Visa / Mastercard
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/70 px-3 py-1.5">
              Apple Pay / PayPal
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted2)] md:col-span-2">
          <div>© {new Date().getFullYear()} Aurum Ebooks. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <Link className="hover:text-[var(--text)]" href="/privacy">
              Privacy Policy
            </Link>
            <a className="hover:text-[var(--text)]" href="mailto:hello@aurumebooks.com">
              hello@aurumebooks.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

