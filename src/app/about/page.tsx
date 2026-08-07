import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { galleryImages } from "@/lib/gallery-images";
import { getAllArticles } from "@/lib/articles";
import { authors } from "@/lib/authors";

export const metadata = generatePageMetadata(
  "About",
  "William Powell — FWA Life Member and sports journalist since 1987."
);

export default function AboutPage() {
  const latestArticle = getAllArticles()[0];
  // William has the long-form biography above, so the list below covers the
  // other contributors rather than repeating him.
  const contributors = authors.filter((a) => a.name !== "William Powell");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-4xl font-bold text-on-surface mb-8">
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
          <div className="mt-4 rounded-lg overflow-hidden">
            <Image
              src="/images/william-powell-fwa.jpg"
              alt="William Powell receiving the Ivan Sharpe award at the Football Writers' Association ceremony"
              width={960}
              height={720}
              className="w-full h-auto object-contain rounded-lg"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="mt-4 space-y-2">
            <div className="bg-apex/10 rounded-lg px-4 py-3">
              <p className="font-ui text-sm font-semibold text-apex">
                FWA Life Member
              </p>
            </div>
            <div className="bg-surface-high rounded-lg px-4 py-3">
              <p className="font-ui text-sm font-semibold text-on-surface">Since 1987</p>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div className="md:col-span-2 prose-article">
          <p>
            After nearly four decades in press boxes and press rooms, I still
            believe that good sports writing matters. Not hot takes or clickbait,
            just proper journalism. The kind that puts you in the ground,
            explains why a match unfolded the way it did, and treats readers as
            the knowledgeable fans they are - that&apos;s the standard I bring
            to CUVA Sports as senior football and cricket correspondent.
          </p>

          {/* TODO (accreditation review - needs a human decision, do not guess):
              The paragraph below claims membership of "BSJA, AIPS, BAJ".
              src/components/ArticleByline.tsx instead claims "NUJ & SJA
              Accredited". The two sets of bodies conflict and an accreditor
              may check them against each other. Confirm with William which
              memberships are current and make all locations agree before this
              goes live. CredibilityBlock.tsx carries the same BSJA/AIPS/BAJ
              claim in expanded form and must be updated to match. */}
          <p>
            My career has taken me from non-league grounds on wet Tuesday
            evenings to World Cup finals and Ashes series. Along the way,
            I&apos;ve been honoured with Life Membership of the Football
            Writers&apos; Association - a recognition I&apos;m deeply proud of -
            and am also a Full Member and Archivist of the Cricket Media Club
            formerly the Cricket Writers&apos; Club since 1989. Member of BSJA,
            AIPS, BAJ.
          </p>

          <h2>What I Cover</h2>
          <ul>
            <li>
              <strong>Premier League</strong> - title races, relegation battles,
              and everything in between
            </li>
            <li>
              <strong>Championship</strong> - the most compelling division in
              English football
            </li>
            <li>
              <strong>League 1 and 2</strong> - the most compelling divisions in
              English football
            </li>
            <li>
              <strong>Champions League / Europa League / Europa Conference League</strong> -
              European nights under the lights
            </li>
            <li>
              <strong>Internationals</strong> - covered England, Wales, Northern
              Ireland, Scotland and the Republic of Ireland
            </li>
            <li>
              <strong>English &amp; International Cricket</strong> - Test
              matches, the County Championship, One Day matches, T20 matches and
              England&apos;s campaigns abroad
            </li>
          </ul>

          <h2>Latest</h2>
          {latestArticle && (
            <p>
              My most recent piece:{" "}
              <Link href={`/reports/${latestArticle.slug}`} className="text-apex hover:underline">
                {latestArticle.title}
              </Link>{" "}
              - published{" "}
              {new Date(latestArticle.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              .
            </p>
          )}

          <h2>Why CUVA Sports?</h2>
          <p>
            After years writing for other publications, CUVA Sports gives me the
            freedom to cover the stories I care about, in my own voice, without
            editorial interference. Every article is written by me and my
            colleagues, no aggregation, no AI-generated content, no filler. Just
            honest sports journalism shaped by decades of experience. CUVA
            Sports is actively growing its contributor network of UK football
            and cricket writers, and building toward syndication partnerships
            that put independent match coverage in front of more readers.
          </p>

          <h2>Get in Touch</h2>
          <p>
            I welcome press enquiries, interview requests, and collaboration
            opportunities. Visit the{" "}
            <a href="/contact">contact page</a> to reach out.
          </p>
        </div>
      </div>

      {/* Contributors. CUVA Sports is a multi-contributor outlet, so the
          people who file reports are listed here rather than implied. Driven
          by src/lib/authors.ts so this page and the per-article author bio
          cannot drift apart. */}
      <section className="mt-16 border-t border-surface-high pt-12">
        <h2 className="font-heading text-2xl font-bold text-on-surface mb-8">
          Contributors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contributors.map((person) => (
            <div key={person.name} className="prose-article">
              <h3>{person.name}</h3>
              <p className="font-ui text-sm text-apex font-medium">
                {person.role}
              </p>
              <p>{person.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Head of CUVA Sports & Production */}
      <section className="mt-16 border-t border-surface-high pt-12">
        <h2 className="font-heading text-2xl font-bold text-on-surface mb-8">
          Head of CUVA Sports &amp; Production
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/images/theodore-robertson.jpg"
                alt="Theodore Robertson"
                width={1130}
                height={1154}
                className="w-full h-auto object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
          <div className="md:col-span-2 prose-article">
            <h3>Theodore Robertson</h3>
            <p>
              Theodore Robertson leads CUVA Sports and its production, running
              the outlet day to day and building and maintaining the platform
              that brings William Powell&apos;s journalism, and that of CUVA
              Sports&apos; other contributors, to readers. Theodore built the
              site to give the outlet&apos;s writers the freedom to publish
              honest, unfiltered sports writing without the constraints of
              third-party platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery: From the Press Box */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-bold text-on-surface mb-6">
          From the Press Box
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {galleryImages.map((src, i) => (
            <div key={i} className="aspect-square relative rounded-lg overflow-hidden">
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
