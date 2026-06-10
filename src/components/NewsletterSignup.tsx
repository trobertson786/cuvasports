import Link from "next/link";

export default function NewsletterSignup() {
  return (
    <section className="border-t border-surface-high bg-surface-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-ink mb-0.5">
              Weekly from the Press Box
            </h3>
            <p className="font-ui text-sm text-ink-mute">
              Match analysis and commentary from William Powell, every Friday.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="font-ui text-sm font-bold text-on-ink bg-ink hover:bg-amber hover:text-ink px-5 py-2.5 rounded transition-colors whitespace-nowrap"
            >
              Get in touch &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
