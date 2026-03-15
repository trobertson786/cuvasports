"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Connect to email service
    setSubmitted(true);
  }

  return (
    <section className="bg-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-white mb-2">
          {t("newsletter.title")}
        </h2>
        <p className="text-silver mb-6">
          {t("newsletter.subtitle")}
        </p>
        {submitted ? (
          <p className="text-gold font-semibold">
            {t("newsletter.thanks")}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder={t("newsletter.placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded bg-navy-light border border-navy-light text-white placeholder-silver-dark focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-gold text-navy font-semibold px-6 py-3 rounded hover:bg-gold-light transition-colors"
            >
              {t("newsletter.button")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
