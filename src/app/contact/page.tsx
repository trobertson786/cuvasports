"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Connect to form handling service (Formspree, etc.)
    setSubmitted(true);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-4xl font-bold text-navy mb-2">
        Contact
      </h1>
      <p className="text-gray-500 mb-10">
        Get in touch with William Powell for press enquiries, interview
        requests, or collaboration opportunities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Form */}
        <div className="md:col-span-2">
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <h2 className="font-heading text-2xl font-bold text-navy mb-2">
                Message Sent
              </h2>
              <p className="text-gray-600">
                Thank you for getting in touch. William will respond as soon as
                possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy"
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
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-navy text-white font-semibold px-8 py-3 rounded-lg hover:bg-navy-light transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-heading text-lg font-bold text-navy mb-3">
              Press Enquiries
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              For press enquiries and interview requests, please use the form
              or connect via social media.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="font-heading text-lg font-bold text-navy mb-3">
              Connect
            </h3>
            <div className="space-y-2">
              {["Facebook", "X (Twitter)", "LinkedIn", "Instagram"].map(
                (platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="block text-sm text-navy hover:text-gold transition-colors"
                  >
                    {platform} &rarr;
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
