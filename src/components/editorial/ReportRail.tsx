import ReadingProgress from "./ReadingProgress";
import ShareList from "./ShareList";

export interface RailSection {
  id: string;
  label: string;
}

interface ReportRailProps {
  title: string;
  slug: string;
  sections: RailSection[];
}

/**
 * Deliberately narrower than the handoff: the "At a glance" score card has
 * been dropped. It repeated the scorecard the reader passed a screen
 * earlier, and a sticky block that never changes over five screens of
 * scroll reads as furniture. What is left either moves (progress) or is
 * genuinely needed at any point in the article (contents, share).
 *
 * Hidden below 1180px, where its contents move inline.
 */
export default function ReportRail({ title, slug, sections }: ReportRailProps) {
  return (
    <aside className="hidden min-[1180px]:block">
      <div className="sticky top-6 border-l border-cuva-rule pl-7">
        <ReadingProgress variant="track" />

        {sections.length ? (
          <nav className="mt-8" aria-label="In this report">
            <p className="mono-label mb-1">In this report</p>
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="target-44 flex items-center w-full border-b border-cuva-rule text-[0.9375rem] text-cuva-ink hover:text-cuva-link hover:underline hover:underline-offset-[3px]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <ShareList title={title} slug={slug} className="mt-8" />
      </div>
    </aside>
  );
}
