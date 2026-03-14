export default function MatchdayBar() {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
            Results &amp; Fixtures
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
          {/* Leicester vs QPR — RESULT */}
          <div className="flex items-center gap-3">
            <span className="bg-navy text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
              Full Time
            </span>
            <span className="text-navy font-bold text-sm">Leicester 1</span>
            <span className="text-gray-300 text-xs">-</span>
            <span className="text-navy font-bold text-sm">3 QPR</span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
              Championship
            </span>
          </div>

          {/* Chelsea vs PSG — Tuesday */}
          <div className="flex items-center gap-3">
            <span className="bg-gold text-navy text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
              Tue 17 Mar — 8:00 PM
            </span>
            <span className="text-navy font-bold text-sm">Chelsea</span>
            <span className="text-gray-300 text-xs">vs</span>
            <span className="text-navy font-bold text-sm">PSG</span>
            <span className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
              Champions League
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
