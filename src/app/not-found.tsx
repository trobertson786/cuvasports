import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-heading text-6xl font-bold text-on-surface mb-4">404</h1>
      <p className="text-xl text-on-surface-muted mb-8">
        Page not found. The article you&apos;re looking for may have been moved
        or doesn&apos;t exist.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="btn-gradient font-ui font-semibold px-6 py-3 rounded-lg"
        >
          Back to Home
        </Link>
        <Link
          href="/blog"
          className="font-ui font-semibold px-6 py-3 rounded-lg bg-surface-high text-on-surface hover:bg-surface-highest transition-colors"
        >
          Browse Articles
        </Link>
      </div>
    </div>
  );
}
