import Link from "next/link";

export default function NewsletterSignup() {
  return (
    <section className="bg-surface-low py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-ui text-xs font-semibold uppercase tracking-widest text-apex mb-3">
          The Press Box
        </p>
        <h2 className="font-heading text-2xl font-bold text-on-surface mb-2">
          Weekly from the Press Box
        </h2>
        <p className="text-on-surface-muted mb-4">
          Newsletter coming soon. For now,{" "}
          <Link href="/contact" className="text-apex hover:text-gold-light transition-colors">
            contact William through the contact page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
