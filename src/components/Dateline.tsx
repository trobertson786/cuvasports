export default function Dateline() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="border-b border-surface-high">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs font-ui text-ink-mute">
        <span className="hidden sm:block">Football &amp; Cricket Journalism</span>
        <span className="font-medium text-ink">{today} — London Edition</span>
        <span className="hidden sm:block">FWA Accredited · Est. 1987</span>
      </div>
    </div>
  );
}
