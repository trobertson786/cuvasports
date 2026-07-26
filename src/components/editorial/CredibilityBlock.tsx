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
      <div className="mx-auto grid max-w-[1320px] gap-10 px-8 py-14 min-[1000px]:grid-cols-12">
        <div className="min-[1000px]:col-span-3">
          <div className="relative aspect-[3/4] w-full max-w-[300px] border-t-[3px] border-cuva-gold">
            <Image
              src="/images/william-powell.jpg"
              alt="William Powell"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-[1000px]:col-span-5">
          <p className="mono-label text-cuva-gold">Who writes CUVA Sports</p>
          <h2 className="font-heading mt-3 text-[2.5rem] font-bold leading-tight text-white">
            William Powell
          </h2>
          <p className="font-prose mt-4 text-[1.1875rem] leading-relaxed text-white/85">
            Reports are filed from the press box, not from a desk in front of a
            television. The photographs on this site are his own.
          </p>

          <div className="mt-7 flex flex-wrap gap-10">
            <div>
              <p className="figure-mono text-[1.75rem] font-semibold text-cuva-gold">
                1987
              </p>
              <p className="font-ui mt-1 text-xs uppercase tracking-[0.08em] text-white/60">
                Reporting since
              </p>
            </div>
            <div>
              <p className="figure-mono text-[1.75rem] font-semibold text-cuva-gold">
                {yearsActive}
              </p>
              <p className="font-ui mt-1 text-xs uppercase tracking-[0.08em] text-white/60">
                Years active
              </p>
            </div>
            <div>
              <p className="figure-mono text-[1.75rem] font-semibold text-cuva-gold">
                1989
              </p>
              <p className="font-ui mt-1 text-xs uppercase tracking-[0.08em] text-white/60">
                Cricket Media Club member since
              </p>
            </div>
          </div>

          <Link
            href="/about"
            className="font-ui target-44 mt-8 inline-flex items-center bg-cuva-gold px-5 text-[0.9375rem] font-semibold text-cuva-ink transition-colors hover:bg-white"
          >
            More about William
          </Link>
        </div>

        <div className="min-[1000px]:col-span-4 min-[1000px]:border-l min-[1000px]:border-white/25 min-[1000px]:pl-10">
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
