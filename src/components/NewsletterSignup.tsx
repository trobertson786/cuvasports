"use client";

import { useState } from "react";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
// Web3Forms access keys are public by design (domain-locked + rate-limited, not a secret)
const WEB3FORMS_ACCESS_KEY = "4fe43e0f-af3a-41b3-a80a-e8b031ecc682";

interface NewsletterSignupProps {
  /** Narrower measure and a top rule when it sits inside an article. */
  variant?: "section" | "inline";
}

/**
 * Replaces the link-to-contact-page that used to stand in for a signup.
 *
 * NOTE FOR THE DESK: this posts to Web3Forms, which delivers the address
 * to an inbox. It is not a list provider, so there is no confirmation
 * email and no one-click unsubscribe yet. The copy below promises only
 * what the plumbing actually does. When a real provider is wired up,
 * restore the double opt-in wording and the unsubscribe line.
 */
export default function NewsletterSignup({
  variant = "section",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const value = email.trim();
    if (!value) {
      setError("Enter your email address to subscribe.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter an email address in the form name@domain.com.");
      return;
    }

    setSubmitting(true);
    const data = new FormData();
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("from_name", "CUVA Sports Newsletter");
    data.append("subject", "CUVA Sports - newsletter signup");
    data.append("email", value);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setSuccess(
          "Thank you. Your address has reached the desk and you will be added to the list."
        );
        setEmail("");
      } else {
        setError("Something went wrong. Try again, or subscribe by RSS.");
      }
    } catch {
      setError("Something went wrong. Try again, or subscribe by RSS.");
    } finally {
      setSubmitting(false);
    }
  }

  const inline = variant === "inline";

  return (
    <section
      className={
        inline
          ? "my-12 border-t-[3px] border-cuva-navy-800 bg-cuva-tint px-4 py-8 min-[390px]:px-5 sm:px-6 lg:px-8"
          : "bg-cuva-tint"
      }
    >
      <div
        className={
          inline
            ? ""
            : "mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] gap-12 px-4 py-12 min-[390px]:px-5 sm:px-6 lg:px-8 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        }
      >
        <div>
          <p className="mono-label text-cuva-gold-ink">Newsletter</p>
          <h2 className="font-prose mt-2 text-[2.125rem] font-bold leading-tight text-cuva-ink">
            Weekly from the Press Box
          </h2>
          <p className="font-prose mt-3 text-[1.125rem] leading-relaxed text-cuva-ink">
            One email a week: the week&apos;s reports and what did not make the
            copy.
          </p>
        </div>

        <div
          className={
            inline
              ? "mt-6"
              : "min-[900px]:border-l min-[900px]:border-cuva-rule min-[900px]:pl-12"
          }
        >
          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor={`newsletter-email-${variant}`}
              className="font-ui mb-2 block text-[0.8125rem] font-semibold text-cuva-ink"
            >
              Email address
            </label>
            <div className="flex">
              <input
                id={`newsletter-email-${variant}`}
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="you@example.com"
                aria-describedby={`newsletter-help-${variant}`}
                aria-invalid={error ? true : undefined}
                className="font-ui h-12 min-w-0 flex-1 border border-r-0 border-cuva-rule bg-white px-4 text-[0.9375rem] text-cuva-ink placeholder:text-cuva-muted"
              />
              <button
                type="submit"
                disabled={submitting}
                className="font-ui h-12 shrink-0 bg-cuva-navy-800 px-4 sm:min-w-[132px] sm:px-5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-cuva-ink disabled:opacity-70"
              >
                {submitting ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {error ? (
              <p role="alert" className="font-ui mt-3 text-[0.8125rem] text-cuva-live">
                {error}
              </p>
            ) : null}
            {success ? (
              <p role="status" className="font-ui mt-3 text-[0.8125rem] text-cuva-cricket">
                {success}
              </p>
            ) : null}

            <p
              id={`newsletter-help-${variant}`}
              className="font-ui mt-3 text-[0.8125rem] text-cuva-muted"
            >
              No advertising and no sharing of your address.{" "}
              <a
                href="/feed.xml"
                className="text-cuva-link hover:text-cuva-ink hover:underline hover:underline-offset-[3px]"
              >
                RSS instead
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
