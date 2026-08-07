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
    role: "FWA Life Member · Sports Journalist since 1987",
    bio: "William Powell has covered football and cricket at the highest level for nearly four decades. A Life Member of the Football Writers' Association, his writing combines deep tactical knowledge with the narrative flair of the best sports journalism.",
    image: "/images/william-powell.jpg",
  },
  {
    // TODO (before publication): placeholder copy written by the site build,
    // not by or about Darrion. Theo and William to replace `role` and `bio`
    // with wording Darrion approves, and add a headshot at
    // /public/images/darrion-watson.jpg, before this goes live. Deliberately
    // contains no employer, qualification or accrediting body, since none has
    // been confirmed and an accreditor may check any claim made here.
    name: "Darrion Watson",
    role: "Contributing Football Reporter",
    bio: "Darrion Watson is a freelance football journalist who contributes match reports to CUVA Sports.",
  },
];

export function getAuthor(name?: string): Author | undefined {
  if (!name) return undefined;
  return authors.find((a) => a.name === name);
}

export { authors };
