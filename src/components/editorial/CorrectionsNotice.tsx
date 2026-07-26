interface CorrectionsNoticeProps {
  /** ISO timestamp plus what changed, from frontmatter `updatedAt`. */
  updatedAt?: string;
  updateNote?: string;
  /** Text of a published correction, from frontmatter `correction`. */
  correction?: string;
  correctedAt?: string;
}

function stamp(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}, ${d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })} BST`;
}

/**
 * Corrections are published on the report they affect, not on a separate
 * page nobody reads. Three states: nothing, a quiet update, or a correction.
 * The correction state is never signalled by colour alone - it says
 * "Correction" in words.
 */
export default function CorrectionsNotice({
  updatedAt,
  updateNote,
  correction,
  correctedAt,
}: CorrectionsNoticeProps) {
  if (correction?.trim()) {
    return (
      <aside
        role="note"
        className="my-6 border-l-[3px] border-cuva-live bg-white px-5 py-4"
      >
        <p className="figure-mono text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-cuva-live">
          Correction{correctedAt ? ` · ${stamp(correctedAt)}` : ""}
        </p>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-cuva-ink">
          {correction}
        </p>
      </aside>
    );
  }

  if (updatedAt || updateNote?.trim()) {
    return (
      <aside role="note" className="my-6 border-l-[3px] border-cuva-rule px-5 py-3">
        <p className="text-[0.8125rem] leading-relaxed text-cuva-muted">
          <span className="figure-mono mr-2 uppercase tracking-[0.08em]">
            Updated
          </span>
          {stamp(updatedAt)}
          {updatedAt && updateNote ? ". " : ""}
          {updateNote}
        </p>
      </aside>
    );
  }

  return null;
}
