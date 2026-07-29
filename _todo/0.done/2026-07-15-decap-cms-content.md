# Decap CMS with a build-free `content/` folder

Goal: edit site content through Decap CMS, store it in a top-level `content/` folder in this repo, **skip Netlify redeploys** when a commit only touches `content/`, and hydrate the site at runtime by fetching the content straight from the public GitHub repo.

This works because the content is not baked into the Gatsby build — the deployed JS fetches it from `raw.githubusercontent.com` on page load, so a content commit doesn't need a rebuild to show up.

## 1. Create the `content/` folder

Move CMS-managed data (currently hardcoded in `src/content/bio/index.ts`) into JSON files at the repo root:

```
content/
  bio.json
  work.json
  projects.json
```

JSON is the easiest format to both edit via Decap and fetch/parse at runtime. Keep the shapes identical to your existing TypeScript types so the components don't change.

## 2. Add Decap CMS

Decap is just two static files served by the site — no npm dependency or Gatsby plugin required.

`static/admin/index.html`:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Content Manager</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
```

`static/admin/config.yml`:

```yaml
backend:
  name: github
  repo: pjflanagan/digital-resume
  branch: main
  # Netlify acts as the OAuth provider (see step 3)
  base_url: https://api.netlify.com

# Decap commits directly to main; each save is one commit touching only content/
media_folder: content/images
public_folder: https://raw.githubusercontent.com/pjflanagan/digital-resume/main/content/images

collections:
  - name: site
    label: Site Content
    files:
      - name: bio
        label: Bio
        file: content/bio.json
        fields:
          - { name: name, label: Name, widget: string }
          - { name: title, label: Title, widget: string }
          - { name: about, label: About, widget: text }
          # ...mirror the rest of your bio type
      # add work/projects file entries the same way
```

After deploying, the editor lives at `https://<your-site>/admin/`.

## 3. Authentication (GitHub backend via Netlify OAuth)

Since the site is on Netlify, use Netlify as the OAuth provider for the `github` backend (do **not** use the deprecated Netlify Identity / git-gateway):

1. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: `https://app.netlify.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. On Netlify: **Site configuration → Access & security → OAuth → Install provider → GitHub**, paste the Client ID/Secret.

Log in at `/admin/` with your GitHub account. Only users with write access to the repo can save.

## 4. Skip Netlify builds for content-only commits

Netlify's build **ignore command** decides whether to build: exit code `0` = skip, `1` = build. Add to `netlify.toml` (create it at the repo root — the build settings currently live in the Netlify UI; moving `command`/`publish` here keeps everything in one place):

```toml
[build]
  command = "npm run build"
  publish = "public/"
  # Exit 0 (skip build) when nothing outside content/ changed
  ignore = "git diff --quiet $CACHED_COMMIT_REF $COMMIT_REF -- . ':(exclude)content'"
```

How it works: `git diff --quiet` exits 0 when there are no changes in the given paths. The pathspec `. ':(exclude)content'` means "everything except `content/`". So a push whose commits only touch `content/` produces no diff → exit 0 → Netlify cancels the build. Any change outside `content/` → exit 1 → normal deploy.

Note: `$CACHED_COMMIT_REF` compares against the last **deployed** commit, so a code change that was skipped earlier can't be lost — if a push mixes content and code, it builds.

## 5. Hydrate content at runtime from GitHub

Because the repo is public, raw files need no auth:

```ts
// src/content/fetchContent.ts
const CONTENT_BASE =
  'https://raw.githubusercontent.com/pjflanagan/digital-resume/main/content';

export async function fetchContent<T>(file: string): Promise<T> {
  const res = await fetch(`${CONTENT_BASE}/${file}`, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to fetch content/${file}: ${res.status}`);
  return res.json() as Promise<T>;
}
```

Use it in a component/hook:

```tsx
const [bio, setBio] = useState<Bio | null>(null);
useEffect(() => {
  fetchContent<Bio>('bio.json').then(setBio).catch(console.error);
}, []);
```

Recommendations:

- **Keep a fallback.** Import the current `content/*.json` at build time as the initial state, then replace it with the fetched copy. The page renders instantly (good for SEO/SSG) and self-updates if the fetched content is newer.
- **Caching:** `raw.githubusercontent.com` serves with `max-age=300`, so edits appear within ~5 minutes. If that's too slow, fetch via the GitHub contents API instead, or bust the cache with a query param.
- **Rate limits** don't apply to raw.githubusercontent.com in any meaningful way for a personal site.

## 6. Local editing (optional)

For editing content locally without OAuth, add `local_backend: true` to `config.yml`, run `npx decap-server` alongside `npm run develop`, and open `http://localhost:8000/admin/`.

## Flow summary

1. Edit at `/admin/` → Decap commits `content/*.json` to `main` on GitHub.
2. Netlify sees the push, runs the ignore command, finds only `content/` changed, **skips the build**.
3. Visitors' browsers fetch `content/*.json` from raw.githubusercontent.com and see the new content (within the ~5 min raw cache).
4. Code changes still deploy normally.
