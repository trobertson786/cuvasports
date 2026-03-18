import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="font-heading text-6xl font-bold text-navy mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Page not found. The article you&apos;re looking for may have been moved
        or doesn&apos;t exist.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-light transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/blog"
          className="border border-navy text-navy font-semibold px-6 py-3 rounded-lg hover:bg-navy hover:text-white transition-colors"
        >
          Browse Articles
        </Link>
      </div>
    </div>
  );
}
