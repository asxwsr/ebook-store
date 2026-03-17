export type BookFormat = "PDF" | "EPUB" | "MOBI";

export type BookGenre =
  | "Leadership"
  | "Business"
  | "Productivity"
  | "Design"
  | "Writing"
  | "Mindset";

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  genre: BookGenre;
  publishedISO: string;
  priceUsd: number;
  rating?: { value: number; count: number };
  heroTag?: "Latest" | "Bestseller" | "New";
  oneLiner: string;
  description: string;
  excerpt: string;
  formats: BookFormat[];
  toc: string[];
  testimonials?: { name: string; role?: string; quote: string }[];
  cover: {
    base: string;
    accent: string;
    titleColor: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
};

export const BOOKS: Book[] = [
  {
    slug: "the-quiet-advantage",
    title: "The Quiet Advantage",
    subtitle: "Decision-making for high-stakes work",
    author: "Maya Ellison",
    genre: "Leadership",
    publishedISO: "2026-02-05",
    priceUsd: 12.99,
    rating: { value: 4.8, count: 382 },
    heroTag: "Latest",
    oneLiner: "A practical framework for calm, clear decisions when the pressure is loud.",
    description:
      "The Quiet Advantage is a modern playbook for thinking better under pressure—without burnout. Learn how to spot hidden variables, reduce noise, and make decisions that age well, with templates you can use immediately.",
    excerpt:
      "When urgency rises, certainty becomes seductive. This book teaches you to trade speed for clarity—without losing momentum.",
    formats: ["PDF", "EPUB", "MOBI"],
    toc: [
      "The Cost of Noise",
      "Principles of Calm Velocity",
      "The Three-Frame Decision",
      "Pre-mortems That Actually Work",
      "Communicating With Precision",
      "Momentum Without Burnout",
      "Templates & Checklists",
    ],
    testimonials: [
      {
        name: "Elena R.",
        role: "VP Operations",
        quote:
          "We used the decision templates in week one—fewer meetings, better outcomes, calmer teams.",
      },
      {
        name: "Andre K.",
        role: "Founder",
        quote:
          "It reads like a mentor’s notes: crisp, modern, and immediately usable.",
      },
    ],
    cover: { base: "#0b1220", accent: "#14b8a6", titleColor: "#f8fafc" },
    seo: {
      metaTitle: "Buy The Quiet Advantage eBook – Instant Download",
      metaDescription:
        "Download The Quiet Advantage instantly. Decision-making frameworks, templates, and checklists for high-stakes leadership.",
    },
  },
  {
    slug: "deep-workflows",
    title: "Deep Workflows",
    subtitle: "A system for focus in a noisy world",
    author: "Jonah Park",
    genre: "Productivity",
    publishedISO: "2025-10-18",
    priceUsd: 9.99,
    rating: { value: 4.6, count: 941 },
    heroTag: "Bestseller",
    oneLiner: "Build a repeatable focus routine—without perfect discipline.",
    description:
      "Deep Workflows helps you design a personal system for real output. You’ll learn how to shape your environment, schedule, and habits so focus becomes the default—not the exception.",
    excerpt:
      "Distraction isn’t a moral failure; it’s a design flaw. Fix the design and focus follows.",
    formats: ["PDF", "EPUB"],
    toc: [
      "Designing for Attention",
      "The 90-Minute Loop",
      "Rituals That Stick",
      "Deep Breaks",
      "Notification Minimalism",
      "Finishing Strong",
    ],
    testimonials: [
      {
        name: "Priya S.",
        role: "Product Manager",
        quote:
          "The 90-minute loop is gold. My week feels calmer and I’m shipping more.",
      },
    ],
    cover: { base: "#ffffff", accent: "#0f172a", titleColor: "#0f172a" },
    seo: {
      metaTitle: "Buy Deep Workflows eBook – Instant Download",
      metaDescription:
        "A modern focus system: attention design, routines, and practical workflows. Download instantly in PDF/EPUB.",
    },
  },
  {
    slug: "designing-with-contrast",
    title: "Designing with Contrast",
    subtitle: "Clarity, hierarchy, and modern UI rhythm",
    author: "Rina Gupta",
    genre: "Design",
    publishedISO: "2025-06-02",
    priceUsd: 14.0,
    rating: { value: 4.7, count: 511 },
    heroTag: "New",
    oneLiner: "A crisp guide to interfaces that feel effortless and premium.",
    description:
      "A deeply practical design book focused on what actually moves metrics: hierarchy, contrast, spacing, and motion. Includes reusable patterns and before/after examples you can apply today.",
    excerpt:
      "Premium design isn’t decoration. It’s how quickly a user understands what matters.",
    formats: ["PDF", "EPUB"],
    toc: [
      "Hierarchy That Reads",
      "Spacing as Structure",
      "Contrast Without Harshness",
      "Motion That Guides",
      "Aesthetic Systems",
      "Checklists & Patterns",
    ],
    cover: { base: "#0f172a", accent: "#22c55e", titleColor: "#f8fafc" },
    seo: {
      metaTitle: "Buy Designing with Contrast eBook – Instant Download",
      metaDescription:
        "Modern UI rhythm, hierarchy, contrast, and motion patterns. Download instantly.",
    },
  },
  {
    slug: "write-to-ship",
    title: "Write to Ship",
    subtitle: "A modern handbook for publishing momentum",
    author: "Caleb Monroe",
    genre: "Writing",
    publishedISO: "2025-03-12",
    priceUsd: 8.99,
    rating: { value: 4.5, count: 267 },
    oneLiner: "Turn ideas into finished work with a lightweight publishing cadence.",
    description:
      "Write to Ship is about finishing. You’ll learn an editorial cadence, how to scope chapters, and how to keep momentum when motivation dips—designed for creators with full lives.",
    excerpt:
      "The best writing tool is a deadline you can keep. The second-best is a cadence you enjoy.",
    formats: ["PDF", "EPUB", "MOBI"],
    toc: [
      "The Shipping Mindset",
      "Scoping for Completion",
      "Drafting With Constraints",
      "Editing for Clarity",
      "Publishing Without Perfection",
    ],
    cover: { base: "#111827", accent: "#f59e0b", titleColor: "#f8fafc" },
    seo: {
      metaTitle: "Buy Write to Ship eBook – Instant Download",
      metaDescription:
        "A practical handbook for finishing and publishing. Download instantly in PDF/EPUB/MOBI.",
    },
  },
  {
    slug: "small-systems-big-results",
    title: "Small Systems, Big Results",
    subtitle: "Habit design for adults with real calendars",
    author: "Nora Imani",
    genre: "Mindset",
    publishedISO: "2025-12-01",
    priceUsd: 10.99,
    rating: { value: 4.6, count: 604 },
    oneLiner: "Build habits that survive travel, stress, and busy seasons.",
    description:
      "Stop relying on motivation. This book teaches small, resilient systems—tiny commitments that compound into meaningful change, even when your schedule is unpredictable.",
    excerpt:
      "If a habit can’t survive a bad week, it’s not a habit. It’s a mood.",
    formats: ["PDF", "EPUB"],
    toc: [
      "Designing for Real Life",
      "Tiny Commitments",
      "Friction and Flow",
      "Tracking Without Obsession",
      "Resetting After Breaks",
    ],
    cover: { base: "#ffffff", accent: "#14b8a6", titleColor: "#0f172a" },
    seo: {
      metaTitle: "Buy Small Systems, Big Results eBook – Instant Download",
      metaDescription:
        "Resilient habit systems for busy lives. Download instantly in PDF/EPUB.",
    },
  },
];

export const FEATURED_SLUGS = [
  "the-quiet-advantage",
  "deep-workflows",
  "designing-with-contrast",
] as const;

export function getBookBySlug(slug: string) {
  return BOOKS.find((b) => b.slug === slug);
}

export function formatUsd(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDateShort(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

