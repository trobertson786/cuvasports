interface BylineRowProps {
  author?: string;
  date: string;
  readingTime?: string;
  /** "Reported from the ground" provenance flag. */
  fromTheGround?: boolean;
  /** The report page brackets the row with 1px rules; cards do not. */
  bracketed?: boolean;
  className?: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    .toUpperCase();
}

/**
 * Bylines are first-class typographic objects here, not a metadata footnote:
 * on an independent title the byline is most of what the reader is trusting.
 */
export default function BylineRow({
  author = "William Powell",
  date,
  readingTime,
  fromTheGround = false,
  bracketed = false,
  className = "",
}: BylineRowProps) {
  const sep = (
    <span className="byline-sep" aria-hidden="true">
      ·
    </span>
  );

  return (
    <div
      className={`byline-row ${
        bracketed ? "border-y border-cuva-rule py-3" : ""
      } ${className}`}
    >
      <span className="byline-name">{author}</span>
      {sep}
      <time className="byline-date" dateTime={date}>
        {formatDate(date)}
      </time>
      {readingTime ? (
        <>
          {sep}
          <span className="byline-read">{readingTime}</span>
        </>
      ) : null}
      {fromTheGround ? (
        <>
          {sep}
          <span className="byline-flag">Reported from the ground</span>
        </>
      ) : null}
    </div>
  );
}
