import Link from "next/link";
import Image from "next/image";

/**
 * Replaces the scattered "FWA" badges with one substantial block.
 *
 * Every claim here is taken from the site's own About page: FWA Life
 * Member, sports journalist since 1987, Full Member and Archivist of the
 * Cricket Media Club since 1989, member of BSJA, AIPS and BAJ. Nothing is
 * added to it. The years-active figure is arithmetic on the 1987 date.
 *
 * Research on trust indicators is consistent that labels alone move
 * nothing - roughly half of readers never notice them. What moves trust is
 * the bundle: who the reporter is, what they are accredited by, and how
 * the reporting was done. Hence one block with substance rather than a
 * badge repeated in six places.
 */
export default function CredibilityBlock() {
  const yearsActive = new Date().getFullYear() - 1987;

  const credentials = [
    "Football Writers' Association, Life Member",
    "Cricket Media Club, Full Member and Archivist since 1989",
    "British Sports Journalists' Association",
    "Association Internationale de la Presse Sportive",
    "British Association of Journalists",
  ];

  return (
    <section className="on-navy bg-cuva-navy-800 text-white">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-14 min-[390px]:px-5 sm:px-6 lg:px-8 min-[1000px]:grid-cols-12">
        {/* Words before portrait below 1000px. At full mobile width a 3:4
            portrait is about 570px tall, so leading with it put the whole
            block's substance below the fold. `order` moves it without
            reordering the source, so the reading order is unchanged. */}
        <div className="order-2 min-[1000px]:order-1 min-[1000px]:col-span-3">
          <div className="relative hidden aspect-[3/4] w-full max-w-[300px] border-t-[3px] border-cuva-gold min-[1000px]:block">
            <Image
              src="/images/william-powell.jpg"
              alt="William Powell"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="order-1 min-[1000px]:order-2 min-[1000px]:col-span-5">
          <p className="mono-label text-cuva-gold">Who writes CUVA Sports</p>
          <h2 className="font-heading mt-3 text-balance text-[2rem] font-bold leading-tight text-white min-[430px]:text-[2.125rem] lg:text-[2.5rem]">
            William Powell
          </h2>
          <p className="font-prose mt-4 text-[1.125rem] leading-[1.6] text-white/85 md:text-[1.1875rem]">
            Reports are filed from the press box, not from a desk in front of a
            television. The photographs on this site are his own.
          </p>

          {/* Below 1000px the portrait runs at 132px beside the figures, set as
              a two-column list. The three figures used to wrap two-then-one on
              a phone, which read as a mistake rather than a set. */}
          <div className="mt-7 grid grid-cols-[132px_minmax(0,1fr)] items-start gap-4 min-[1000px]:block">
            <div className="relative aspect-[3/4] border-t-[3px] border-cuva-gold min-[1000px]:hidden">
              <Image
                src="/images/william-powell.jpg"
                alt="William Powell"
                fill
                sizes="132px"
                className="object-cover"
              />
            </div>

            <dl className="min-[1000px]:flex min-[1000px]:flex-wrap min-[1000px]:gap-10">
              {[
                { label: "Reporting since", figure: "1987" },
                { label: "Years active", figure: String(yearsActive) },
                { label: "Cricket Media Club since", figure: "1989" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-baseline justify-between gap-3 border-b border-white/25 py-2 min-[1000px]:flex-col min-[1000px]:items-start min-[1000px]:justify-start min-[1000px]:gap-0 min-[1000px]:border-b-0 min-[1000px]:py-0"
                >
                  <dt className="font-ui text-xs uppercase tracking-[0.06em] text-white/70 min-[1000px]:order-2 min-[1000px]:mt-1">
                    {stat.label}
                  </dt>
                  <dd className="figure-mono text-[1.25rem] font-semibold text-cuva-gold min-[1000px]:order-1 min-[1000px]:text-[1.75rem]">
                    {stat.figure}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <Link
            href="/about"
            className="font-ui target-44 mt-8 inline-flex items-center bg-cuva-gold px-5 text-[0.9375rem] font-semibold text-cuva-ink transition-colors hover:bg-white"
          >
            More about William
          </Link>
        </div>

        <div className="order-3 min-[1000px]:col-span-4 min-[1000px]:border-l min-[1000px]:border-white/25 min-[1000px]:pl-10">
          <p className="mono-label text-cuva-gold">Accreditation</p>
          <ul className="mt-4">
            {credentials.map((c) => (
              <li
                key={c}
                className="font-ui border-b border-white/20 py-3 text-[0.9375rem] text-white/85 last:border-b-0"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
