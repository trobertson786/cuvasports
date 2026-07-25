# CUVA Sports

Football and cricket journalism by William Powell, FWA Life Member and sports writer since 1987.

Live at **[cuvasports.com](https://cuvasports.com)**. Next.js App Router, TypeScript, Tailwind,
MDX articles, deployed on Vercel from `main`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # always green before publishing
```

## Where things live

| Path | What's in it |
|---|---|
| `content/articles/` | Every article, one MDX file named `YYYY-MM-DD-slug.mdx`. The filename is the URL slug. |
| `content/matchday.json` | Ticker, results and fixtures data. |
| `src/app/` | Routes. `/`, `/reports`, `/football`, `/cricket`, `/about`, `/contact`, plus feed, sitemap and OG image. |
| `src/components/` | UI. `src/components/brand/` holds the logo system. |
| `src/lib/` | Article loading, metadata, taxonomy, translations. |
| `public/images/` | Images referenced by articles. |
| `public/brand/` | Generated favicons and brand assets. Rebuild with `node scripts/build-brand-assets.mjs`. |
| `scripts/` | One-off and build-time scripts. |
| `docs/` | How to publish, the brand guide, plans, screenshots. |
| `assets/` | Local-only media libraries. Not committed, not deployed. |

## Read next

- [`docs/PUBLISHING.md`](docs/PUBLISHING.md) — how to write and publish an article
- [`docs/brand/README.md`](docs/brand/README.md) — the logo system and where each lockup goes
- [`CLAUDE.md`](CLAUDE.md) — article conventions, frontmatter schema, house style
