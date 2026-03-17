import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Aurum Ebooks.",
};

export default function PrivacyPage() {
  return (
    <main className="container-px mx-auto max-w-3xl py-10 sm:py-14">
      <div className="card p-7 sm:p-10">
        <div className="text-xs font-[800] uppercase tracking-[0.12em] text-[var(--muted2)]">
          Privacy Policy
        </div>
        <h1
          className="mt-3 font-[950] tracking-[-0.045em] text-[var(--text)]"
          style={{ fontFamily: "var(--font-display)", fontSize: 40, lineHeight: 1.05 }}
        >
          Privacy, in plain language
        </h1>
        <div className="mt-5 max-w-none space-y-4 text-sm leading-7 text-[var(--muted)]">
          <p>
            This is a lightweight template for a digital ebook store. Replace this
            page with your legal policy before launch.
          </p>
          <p>
            We collect the email address you provide at checkout to send your receipt
            and download link. If you request a free sample, we may also send a
            discount code and new release announcements.
          </p>
          <p>
            Payments are processed by Stripe (and optionally PayPal). We do not
            store full payment details on our servers.
          </p>
          <p>
            For privacy questions, contact <a href="mailto:hello@aurumebooks.com">hello@aurumebooks.com</a>.
          </p>
        </div>
      </div>
    </main>
  );
}

