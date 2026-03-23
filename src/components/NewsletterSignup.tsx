"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const BUTTONDOWN_USERNAME = "cuvasports";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.buttondown.com/v1/subscribers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, tags: ["website"] }),
        }
      );

      if (res.ok || res.status === 201) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        if (res.status === 409) {
          setSubmitted(true);
        } else {
          setError(data?.detail || "Something went wrong. Please try again.");
        }
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-surface-low py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-on-surface mb-2">
          {t("newsletter.title")}
        </h2>
        <p className="text-on-surface-muted mb-6">
          {t("newsletter.subtitle")}
        </p>
        {submitted ? (
          <p className="text-apex font-semibold">
            {t("newsletter.thanks")}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            action={`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`}
            method="post"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder={t("newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-surface-highest text-on-surface placeholder-on-surface-muted focus:outline-none focus:ring-1 focus:ring-primary/50"
              style={{ border: '1px solid rgba(183, 200, 225, 0.15)' }}
            />
            {error && (
              <p className="text-red-400 text-sm sm:hidden">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn-gradient font-ui font-semibold px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {submitting ? "..." : t("newsletter.button")}
            </button>
          </form>
        )}
        {error && !submitted && (
          <p className="text-red-400 text-sm mt-2 hidden sm:block">{error}</p>
        )}
      </div>
    </section>
  );
}
