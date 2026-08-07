import Image from "next/image";
import Link from "next/link";
import { getAuthor } from "@/lib/authors";

interface AuthorBioProps {
  /** Article frontmatter author. Defaults to the founding contributor. */
  author?: string;
}

export default function AuthorBio({ author = "William Powell" }: AuthorBioProps) {
  const person = getAuthor(author);

  // An unrecognised byline gets no biography rather than someone else's.
  if (!person) return null;

  return (
    <div className="bg-surface-container rounded-lg p-6 flex flex-col sm:flex-row gap-5 items-start transition-all duration-300">
      <Link href="/about" className="flex-shrink-0">
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="font-heading w-20 h-20 rounded-full bg-surface-high text-on-surface flex items-center justify-center text-2xl font-bold"
          >
            {person.name.charAt(0)}
          </span>
        )}
      </Link>
      <div>
        <h3 className="font-heading text-lg font-bold text-on-surface">
          <Link href="/about" className="target-44 inline-flex items-center transition-colors hover:text-cuva-link">
            {person.name}
          </Link>
        </h3>
        <p className="font-ui text-sm text-apex font-medium mb-2">
          {person.role}
        </p>
        <p className="text-sm text-on-surface-muted leading-relaxed">
          {person.bio}
        </p>
      </div>
    </div>
  );
}
