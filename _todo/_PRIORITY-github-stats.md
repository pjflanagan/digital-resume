# GitHub Data

Pull live-ish GitHub stats into the site somewhere. Commit heatmap, repo count,
commit count, whatever ends up looking good. This is a "cool visually" idea,
not a resume necessity — treat it like a bonus slide/widget, not core content.

## Where it could live

- **New mini-slide** between Skills and Contact, or bolted onto the bottom of
  Experience — a "3.5 GitHub" strip with a heatmap + a few stat tiles.
- **Inside Skills** — skills are already a "here's my stack" section, stats
  could sit next to it as evidence instead of just self-reported progress bars.
- **Splash/landing micro-graphic** — a tiny heatmap swatch as background
  texture, not literal data, just vibes. Lower effort, lower payoff.
- **Footer** — small "N commits this year" ticker. Low visual weight, easy to
  slot in without a new section.

Leaning toward a small standalone slide — heatmap is the fun part and it
deserves room, stat counts (repo count / commit count / streak) work well as
2-3 tiles next to it. See `dataviz` skill for how to make the heatmap/tiles
look like one system instead of a bolted-on widget.

## The hard constraint: this site has no server

Gatsby static export on Netlify (see `netlify.toml`). Content already fetches
from `raw.githubusercontent.com` at runtime instead of a build step — same
trick applies here, no backend needed for the data itself. Options ranked by
fit:

### Option A — client fetches GitHub REST API directly (simplest)
`fetch('https://api.github.com/users/pjflanagan/events')` /
`/repos?per_page=100` etc. straight from the browser, same pattern as
`fetchContentFile` in `src/content/fetchContent.ts`.

- Repo count, language breakdown, stars: trivial, one `/users/:user/repos` call.
- Commit count / heatmap: **not directly available**. GitHub's REST API has no
  "commits per day across all repos" endpoint. The contribution calendar is
  GraphQL-only (`contributionsCollection`) and requires an authenticated token
  — can't call it from a public browser bundle without exposing a PAT.
- Unauthenticated REST is rate-limited to 60 req/hr per IP — fine for a
  low-traffic personal site, but shared across all visitors from the same IP
  (offices, VPNs) could hit it.

Good for repo/stars/language stats. Not good enough alone for the heatmap.

### Option B — scheduled snapshot into `content/` (recommended)
A GitHub Action (or Netlify scheduled function) runs on a cron (daily is
plenty), calls the GraphQL API with a PAT stored as a secret, and commits a
generated `content/7.0-github.json` (contribution calendar, repo count, commit
count) to the repo — same place Decap-managed content already lives.

- Site just does `fetchContentFile('7.0-github.json')`, identical pattern to
  everything else in `fetchContentFile`, no new fetch strategy to build.
- No client-side token exposure, no rate-limit risk for visitors.
- Content-only commit, so per the `netlify.toml` `ignore` rule this **won't**
  trigger a Netlify rebuild — need to double check the diff-ignore pattern
  still treats `content/7.0-github.json` as content (it should, same dir).
- Slight staleness (up to a day old) — acceptable for a heatmap/stat display,
  nobody needs it real-time.
- New moving part: a GitHub Action + a PAT secret to maintain.

### Option C — Netlify serverless function, called at request time
A function under `netlify/functions/` holds the PAT server-side, proxies the
GraphQL call, browser calls the function instead of GitHub directly.

- Always fresh, no stale snapshot.
- Introduces a real backend dependency where currently there is none — new
  infra to reason about (cold starts, function limits, another place secrets
  live). Bigger lift than A or B for a decorative widget.

## Recommendation

Option B: scheduled GitHub Action writes a JSON snapshot into `content/`,
site reads it the same way it reads everything else. Keeps the "static site,
no server" property intact, reuses existing content-fetch plumbing, and a
once-a-day heatmap refresh is more than fresh enough.

## Open questions

- [ ] Which repos count — just public, or does this need to fake-include
      private ones (heatmap would look sparse with only public work)?
- [ ] Heatmap visual: full GitHub-style grid, or a stylized/dithered version
      to match the site's aesthetic (see `_todo/personal-slide-dithering.md`)?
- [ ] Does this deserve full-time real estate on desktop but collapse to just
      the stat tiles on mobile (see `_todo/mobile-and-tablet-sizing.md`)?
