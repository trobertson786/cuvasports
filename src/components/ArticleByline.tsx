import Image from "next/image";
import FWABadge from "@/components/FWABadge";

interface ArticleBylineProps {
  author: string;
}

export default function ArticleByline({ author }: ArticleBylineProps) {
  return (
    <div className="flex flex-row items-center gap-4 py-4 my-6" style={{ borderTop: '1px solid rgba(183, 200, 225, 0.15)', borderBottom: '1px solid rgba(183, 200, 225, 0.15)' }}>
      <Image
        src="/images/william-powell-fwa.jpg"
        alt={author}
        width={56}
        height={56}
        className="h-14 w-14 rounded-full border-2 border-primary object-cover flex-shrink-0"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <span className="font-heading font-bold text-on-surface text-base leading-tight">
          {author}
        </span>
        <span className="text-sm text-gray-500 mt-0.5">
          FWA Life Member &bull; NUJ &amp; SJA Accredited &bull; Sports Journalist since 1987
        </span>
      </div>
      <div className="flex-shrink-0">
        <FWABadge size="md" />
      </div>
      <a
        href="https://x.com/WillsSportMedia"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="William Powell on X (Twitter)"
        className="flex-shrink-0 text-on-surface-muted hover:text-primary transition-colors"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </div>
  );
}
