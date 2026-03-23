"use client";

import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwzgkvl";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-4xl font-bold text-on-surface mb-2">
        Contact
      </h1>
      <p className="text-on-surface-muted mb-10">
        Get in touch with William Powell for press enquiries, interview
        requests, or collaboration opportunities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-surface-high rounded-lg p-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-on-surface mb-2">
                Message Sent
              </h2>
              <p className="text-on-surface-muted">
                Thank you for getting in touch. William will respond as soon as
                possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block font-ui text-sm font-medium text-on-surface mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50"
                  style={{ border: '1px solid rgba(183, 200, 225, 0.15)' }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-ui text-sm font-medium text-on-surface mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50"
                  style={{ border: '1px solid rgba(183, 200, 225, 0.15)' }}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block font-ui text-sm font-medium text-on-surface mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50"
                  style={{ border: '1px solid rgba(183, 200, 225, 0.15)' }}
                >
                  <option>General Enquiry</option>
                  <option>Press Enquiry</option>
                  <option>Interview Request</option>
                  <option>Collaboration</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block font-ui text-sm font-medium text-on-surface mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-highest text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                  style={{ border: '1px solid rgba(183, 200, 225, 0.15)' }}
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="btn-gradient font-ui font-semibold px-8 py-3 rounded-lg disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface-container rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold text-on-surface mb-3">
              Press Enquiries
            </h3>
            <p className="text-sm text-on-surface-muted leading-relaxed">
              For press enquiries and interview requests, please use the form
              or connect via social media.
            </p>
          </div>
          <div className="bg-surface-container rounded-lg p-6">
            <h3 className="font-heading text-lg font-bold text-on-surface mb-3">
              Connect
            </h3>
            <div className="space-y-2">
              <a
                href="https://x.com/WillsSportMedia"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-ui text-sm text-primary hover:text-apex transition-colors"
              >
                X (Twitter) &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
