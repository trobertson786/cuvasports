interface FWABadgeProps {
  size?: "sm" | "md";
}

export default function FWABadge({ size = "md" }: FWABadgeProps) {
  const isSmall = size === "sm";

  return (
    <span
      className={`inline-flex items-center gap-1 ${
        isSmall ? "text-[10px]" : "text-xs"
      }`}
    >
      <svg
        className={isSmall ? "w-3 h-3" : "w-4 h-4"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          className="text-apex"
        />
      </svg>
      <span className="font-ui font-semibold uppercase tracking-wider text-apex">
        FWA Life Member
      </span>
    </span>
  );
}
