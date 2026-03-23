import Image from "next/image";
import Link from "next/link";

export default function AuthorBio() {
  return (
    <div className="bg-surface-container rounded-lg p-6 flex flex-col sm:flex-row gap-5 items-start transition-all duration-300">
      <Link href="/about" className="flex-shrink-0">
        <Image
          src="/images/william-powell.jpg"
          alt="William Powell"
          width={80}
          height={80}
          className="w-20 h-20 rounded-full object-cover"
        />
      </Link>
      <div>
        <h3 className="font-heading text-lg font-bold text-on-surface">
          <Link href="/about" className="hover:text-primary transition-colors">
            William Powell
          </Link>
        </h3>
        <p className="font-ui text-sm text-apex font-medium mb-2">
          FWA Life Member &middot; Sports Journalist since 1987
        </p>
        <p className="text-sm text-on-surface-muted leading-relaxed">
          William Powell has covered football and cricket at the highest level
          for nearly four decades. A Life Member of the Football Writers&apos;
          Association, his writing combines deep tactical knowledge with the
          narrative flair of the best sports journalism.
        </p>
      </div>
    </div>
  );
}
