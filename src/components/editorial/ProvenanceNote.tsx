interface ProvenanceNoteProps {
  /** Free text from frontmatter. Nothing renders without it. */
  note?: string;
}

/**
 * "How this report was made."
 *
 * Deliberately opt-in per article rather than boilerplate on the template.
 * The claim that a reporter attended a match and shot his own photographs
 * is an accreditation claim: printing it automatically on every report
 * would make it true of pieces where it is not, which is the one thing a
 * trust component must never do. Set `provenance` in frontmatter to show it.
 */
export default function ProvenanceNote({ note }: ProvenanceNoteProps) {
  if (!note?.trim()) return null;

  return (
    <aside className="my-10 grid grid-cols-[auto_minmax(0,1fr)] gap-6 border-y border-cuva-rule py-5">
      <p className="mono-label max-w-[190px] text-cuva-gold-ink">
        How this report was made
      </p>
      <p className="text-[0.875rem] leading-relaxed text-cuva-ink">{note}</p>
    </aside>
  );
}
