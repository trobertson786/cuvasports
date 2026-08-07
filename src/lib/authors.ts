/**
 * The people who write CUVA Sports.
 *
 * CUVA Sports is a multi-contributor outlet, so the author of a report is
 * whoever filed it, not a single hardcoded name. `author` in article
 * frontmatter is matched against `name` here. An unknown name falls back to
 * the byline text alone rather than printing someone else's biography, which
 * is why `getAuthor` returns `undefined` instead of a default person.
 *
 * `image` is optional on purpose: a contributor without a headshot on file
 * gets an initial rather than a stand-in photograph of somebody else.
 */
export interface Author {
  name: string;
  /** Short line under the name. Keep to claims the site can support. */
  role: string;
  bio: string;
  /** Public path under /public/images/. Omit when no headshot is on file. */
  image?: string;
}

const authors: Author[] = [
  {
    name: "William Powell",
    role: "Senior Editor · FWA Life Member · Sports Journalist since 1987",
    bio: "William Powell is CUVA Sports' senior editor and lead correspondent, covering football and cricket at the highest level for nearly four decades. A Life Member of the Football Writers' Association, his writing combines deep tactical knowledge with the narrative flair of the best sports journalism.",
    image: "/images/william-powell.jpg",
  },
  {
    // TODO (before publication): placeholder copy written by the site build,
    // not by or about Darrion. Theo and William to replace `role` and `bio`
    // with wording Darrion approves, and add a headshot at
    // /public/images/darrion-watson.jpg, before this goes live. Deliberately
    // contains no employer, qualification or accrediting body, since none has
    // been confirmed and an accreditor may check any claim made here. `role`
    // deliberately positions him as junior to William per Theo's instruction
    // (2026-08-07) that the site should read as a senior/junior newsroom
    // structure, not two equal correspondents.
    name: "Darrion Watson",
    role: "Junior Football Reporter",
    bio: "Darrion Watson is a football reporter contributing match reports to CUVA Sports, working under William Powell's editorial guidance as he builds his experience covering the English game.",
  },
];

export function getAuthor(name?: string): Author | undefined {
  if (!name) return undefined;
  return authors.find((a) => a.name === name);
}

export { authors };
