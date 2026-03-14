"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Connect to email service
    setSubmitted(true);
  }

  return (
    <section className="bg-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-2xl font-bold text-white mb-2">
          Stay in the Game
        </h2>
        <p className="text-silver mb-6">
          Get William&apos;s latest articles delivered to your inbox.
        </p>
        {submitted ? (
          <p className="text-gold font-semibold">
            Thanks for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded bg-navy-light border border-navy-light text-white placeholder-silver-dark focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-gold text-navy font-semibold px-6 py-3 rounded hover:bg-gold-light transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
