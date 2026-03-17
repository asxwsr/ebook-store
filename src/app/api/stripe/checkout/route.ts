import Stripe from "stripe";
import { z } from "zod";
import { BOOKS, formatUsd } from "@/lib/books";

export const runtime = "nodejs";

const BodySchema = z.object({
  email: z.string().email(),
  lines: z
    .array(
      z.object({
        slug: z.string().min(1),
        qty: z.number().int().min(1).max(20),
      }),
    )
    .min(1),
});

function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000"
  );
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid checkout payload" },
      { status: 400 },
    );
  }

  const { email, lines } = parsed.data;
  const items = lines
    .map((l) => {
      const book = BOOKS.find((b) => b.slug === l.slug);
      if (!book) return null;
      return { book, qty: l.qty };
    })
    .filter(Boolean) as { book: (typeof BOOKS)[number]; qty: number }[];

  if (items.length === 0) {
    return Response.json({ error: "No valid cart items" }, { status: 400 });
  }

  if (!secret) {
    return Response.json(
      {
        url: `/thank-you?demo=1&email=${encodeURIComponent(email)}`,
        notice:
          "STRIPE_SECRET_KEY not set — using demo thank-you page instead.",
      },
      { status: 200 },
    );
  }

  const stripe = new Stripe(secret);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    line_items: items.map(({ book, qty }) => ({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(book.priceUsd * 100),
        product_data: {
          name: `${book.title} — eBook`,
          description: `${book.author} • ${book.formats.join(" / ")} • Instant download`,
          metadata: { slug: book.slug },
        },
      },
    })),
    success_url: `${siteUrl()}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/checkout`,
    metadata: {
      cart: JSON.stringify(
        items.map(({ book, qty }) => ({
          slug: book.slug,
          qty,
          price: formatUsd(book.priceUsd),
        })),
      ),
    },
  });

  return Response.json({ url: session.url }, { status: 200 });
}

