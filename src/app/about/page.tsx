import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import { galleryImages } from "@/lib/gallery-images";
import { getAllArticles } from "@/lib/articles";

export const metadata = generatePageMetadata(
  "About",
  "CUVA Sports — independent football and cricket journalism, led by senior editor William Powell."
);

export default function AboutPage() {
  const latestArticle = getAllArticles()[0];
  // Journalists section is driven entirely by src/lib/authors.ts, in the
  // order defined there (William as senior editor first, Darrion second),
  // so this page and the per-article author bio cannot drift apart.

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-4xl font-bold text-on-surface mb-8">
        About CUVA Sports
      </h1>

      {/* About CUVA Sports */}
      <div className="prose-article mb-16">
        <p>
          CUVA Sports is an independent outlet immersed in English football
          and cricket, from wet Tuesday nights at non-league grounds to
          Premier League title races, European nights and Test match series.
          Coverage is built on being in the ground, not working from a
          highlights reel - match reports, tactical analysis and player
          assessments written by people who were actually there.
        </p>

        <h2>What We Cover</h2>
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
            <strong>Internationals</strong> - covering England, Wales,
            Northern Ireland, Scotland and the Republic of Ireland
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
            Our most recent piece:{" "}
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
          CUVA Sports exists to give its writers the freedom to cover the
          stories they care about, in their own voice, without editorial
          interference. Every article is written by our own journalists -
          no aggregation, no AI-generated content, no filler. Just honest
          sports journalism shaped by decades of experience. CUVA Sports is
          actively growing its contributor network of UK football and
          cricket writers, and building toward syndication partnerships
          that put independent match coverage in front of more readers.
        </p>

        <h2>Get in Touch</h2>
        <p>
          We welcome press enquiries, interview requests, and collaboration
          opportunities. Visit the{" "}
          <a href="/contact">contact page</a> to reach out.
        </p>
      </div>

      {/* Journalists: William (senior editor) first, Darrion (junior) second,
          in the order defined in src/lib/authors.ts. */}
      <section className="border-t border-surface-high pt-12">
        <h2 className="font-heading text-2xl font-bold text-on-surface mb-8">
          Journalists
        </h2>

        {/* William Powell */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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

          <div className="md:col-span-2 prose-article">
            <h3>William Powell</h3>
            <p className="font-ui text-sm text-apex font-medium">
              Senior Editor
            </p>
            <p>
              William Powell is CUVA Sports&apos; senior editor and lead
              football and cricket correspondent. After nearly four decades in
              press boxes and press rooms, his standard hasn&apos;t changed:
              not hot takes or clickbait, but proper journalism that puts
              readers in the ground, explains why a match unfolded the way it
              did, and treats them as the knowledgeable fans they are.
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
              His career has taken him from non-league grounds on wet Tuesday
              evenings to World Cup finals and Ashes series. Along the way,
              he&apos;s been honoured with Life Membership of the Football
              Writers&apos; Association, and is also a Full Member and
              Archivist of the Cricket Media Club, formerly the Cricket
              Writers&apos; Club, since 1989. Member of BSJA, AIPS, BAJ.
            </p>
          </div>
        </div>

        {/* Darrion Watson */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12 pt-12 border-t border-surface-high">
          <div className="md:col-span-1" />
          <div className="md:col-span-2 prose-article">
            <h3>Darrion Watson</h3>
            <p className="font-ui text-sm text-apex font-medium">
              Junior Football Reporter
            </p>
            <p>
              Darrion Watson is a football reporter contributing match
              reports to CUVA Sports, working under William Powell&apos;s
              editorial guidance as he builds his experience covering the
              English game.
            </p>
          </div>
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
