import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { galleryImages } from "@/lib/gallery-images";

export const metadata = generatePageMetadata(
  "About",
  "William Powell — FWA Life Member and sports journalist since 1987."
);

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-4xl font-bold text-navy mb-8">
        About William Powell
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Photo */}
        <div className="md:col-span-1">
          <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
            <Image
              src="/images/william-powell.jpg"
              alt="William Powell"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
          <div className="mt-4 space-y-2">
            <div className="bg-gold/10 rounded-lg px-4 py-3">
              <p className="text-sm font-semibold text-gold-dark">
                FWA Life Member
              </p>
            </div>
            <div className="bg-navy/5 rounded-lg px-4 py-3">
              <p className="text-sm font-semibold text-navy">Since 1987</p>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="md:col-span-2 prose-article">
          <p>
            I started CUVA Sports because, after nearly four decades in press
            boxes and press rooms, I still believe that good sports writing
            matters. Not hot takes or clickbait — proper journalism. The kind
            that puts you in the ground, explains why a match unfolded the way
            it did, and treats readers as the knowledgeable fans they are.
          </p>

          <p>
            My career has taken me from non-league grounds on wet Tuesday
            evenings to World Cup finals and Ashes series. Along the way,
            I&apos;ve been honoured with Life Membership of the Football
            Writers&apos; Association — a recognition I&apos;m deeply proud of.
          </p>

          <h2>What I Cover</h2>
          <ul>
            <li>
              <strong>Premier League</strong> — title races, relegation battles,
              and everything in between
            </li>
            <li>
              <strong>Championship</strong> — the most compelling division in
              English football
            </li>
            <li>
              <strong>Champions League</strong> — European nights under the
              lights
            </li>
            <li>
              <strong>English &amp; International Cricket</strong> — Test
              matches, the County Championship, and England&apos;s campaigns
              abroad
            </li>
          </ul>

          <h2>Currently</h2>
          <p>
            I&apos;m covering QPR vs Leicester at Loftus Road today — a
            Championship relegation six-pointer with huge implications for both
            clubs. On Tuesday, I&apos;ll be at Stamford Bridge for Chelsea vs
            PSG in the Champions League, where Chelsea need to overturn a 5-2
            first-leg deficit against the defending champions.
          </p>

          <h2>Why CUVA Sports?</h2>
          <p>
            After years writing for other publications, CUVA Sports gives me the
            freedom to cover the stories I care about, in my own voice, without
            editorial interference. Every article is written by me — no
            aggregation, no AI-generated content, no filler. Just honest sports
            journalism shaped by decades of experience.
          </p>

          <h2>Get in Touch</h2>
          <p>
            I welcome press enquiries, interview requests, and collaboration
            opportunities. Visit the{" "}
            <a href="/contact">contact page</a> to reach out.
          </p>
        </div>
      </div>

      {/* Gallery: From the Press Box */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold text-navy mb-6">
          From the Press Box
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-square relative rounded overflow-hidden">
              <Image
                src={src}
                alt={`Press box photo ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
