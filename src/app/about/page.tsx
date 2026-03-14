import { generatePageMetadata } from "@/lib/metadata";

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
        {/* Photo / placeholder */}
        <div className="md:col-span-1">
          <div className="aspect-[3/4] bg-navy rounded-lg flex items-center justify-center">
            <span className="text-gold font-heading text-5xl font-bold">
              WP
            </span>
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
            William Powell has been a professional sports journalist for nearly
            four decades. His career spans the evolution of English football from
            the pre-Premier League era to the global spectacle it is today, and
            covers cricket from county grounds to Test match arenas.
          </p>

          <h2>Career Highlights</h2>
          <ul>
            <li>
              Life Member of the Football Writers&apos; Association (FWA)
            </li>
            <li>
              Covered football and cricket at the highest domestic and
              international levels since 1987
            </li>
            <li>
              Provided match reports, analysis, and editorial commentary for
              leading publications
            </li>
            <li>
              Known for incisive tactical analysis and narrative-driven sports
              writing
            </li>
          </ul>

          <h2>CUVA Sports</h2>
          <p>
            CUVA Sports is William&apos;s personal platform for publishing
            match reports, tactical analysis, and commentary on football and
            cricket. Free from editorial constraints, it offers honest,
            authoritative journalism shaped by decades of experience at the
            coalface of British sport.
          </p>

          <h2>Get in Touch</h2>
          <p>
            William welcomes press enquiries, interview requests, and
            collaboration opportunities. Visit the{" "}
            <a href="/contact">contact page</a> to reach out.
          </p>
        </div>
      </div>
    </div>
  );
}
