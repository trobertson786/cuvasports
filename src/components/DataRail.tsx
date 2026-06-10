import LeagueTable from "@/components/LeagueTable";
import RecentScores from "@/components/RecentScores";
import UpcomingFixtures from "@/components/UpcomingFixtures";

export default function DataRail() {
  return (
    <aside className="bg-ink text-on-ink rounded-lg overflow-hidden">
      {/* League Table */}
      <div className="p-4 border-b border-white/10">
        <h2 className="font-ui text-xs font-bold uppercase tracking-widest text-on-ink opacity-60 mb-3">
          League Table
        </h2>
        <LeagueTable />
      </div>

      {/* Recent Scores */}
      <div className="p-4 border-b border-white/10">
        <RecentScores />
      </div>

      {/* Upcoming Fixtures */}
      <div className="p-4">
        <UpcomingFixtures />
      </div>
    </aside>
  );
}
