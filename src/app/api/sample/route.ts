import { BOOKS } from "@/lib/books";

export const runtime = "nodejs";

function htmlPage(inner: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Free sample</title>
    <style>
      :root{--bg:#fafafa;--text:#0f172a;--muted:#475569;--border:rgba(15,23,42,.12);--accent:#14b8a6}
      body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif;background:linear-gradient(180deg,var(--bg),#fff);color:var(--text)}
      .wrap{max-width:720px;margin:0 auto;padding:36px 18px}
      .card{background:rgba(255,255,255,.85);border:1px solid var(--border);border-radius:22px;box-shadow:0 14px 35px rgba(2,6,23,.08);padding:22px}
      .btn{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:12px 16px;font-weight:650;border:1px solid transparent;background:linear-gradient(180deg,var(--accent),#0d9488);color:#fff;text-decoration:none}
      input{width:100%;height:44px;border-radius:16px;border:1px solid var(--border);padding:0 14px;font-size:14px;margin-top:8px}
      .muted{color:var(--muted);font-size:14px;line-height:1.6}
    </style>
  </head>
  <body>
    <div class="wrap">${inner}</div>
  </body>
</html>`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") ?? "";
  const email = url.searchParams.get("email") ?? "";
  const book = BOOKS.find((b) => b.slug === slug);

  if (!book) {
    return new Response(htmlPage(`<div class="card"><h1>Sample not found</h1><p class="muted">Invalid book.</p></div>`), {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 404,
    });
  }

  if (!email) {
    const inner = `
      <div class="card">
        <h1 style="margin:0 0 6px 0;font-size:22px;letter-spacing:-0.02em;">Free sample — ${book.title}</h1>
        <p class="muted" style="margin:0 0 14px 0;">Enter your email to receive the sample download instantly. (Demo: no email is stored.)</p>
        <form method="get" action="/api/sample">
          <input type="hidden" name="slug" value="${book.slug}" />
          <label class="muted" for="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" />
          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn" type="submit">Download sample</button>
            <a class="btn" style="background:#fff;color:var(--text);border-color:var(--border);" href="/books/${book.slug}">Back to book</a>
          </div>
          <p class="muted" style="margin:14px 0 0 0;font-size:12px;">You’ll also get a 10% off code in our newsletter.</p>
        </form>
      </div>
    `;
    return new Response(htmlPage(inner), {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  const sampleText = `Sample — ${book.title}\nBy ${book.author}\n\n${book.excerpt}\n\nTable of contents (preview):\n${book.toc
    .slice(0, 5)
    .map((t, i) => `${i + 1}. ${t}`)
    .join("\n")}\n\nGet the full book at /books/${book.slug}\n`;

  return new Response(sampleText, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "content-disposition": `attachment; filename="${book.slug}-sample.txt"`,
    },
  });
}

