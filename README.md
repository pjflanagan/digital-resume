
[![Netlify Status](https://api.netlify.com/api/v1/badges/f93116cd-b061-4c62-b906-154e918bf7ee/deploy-status)](https://app.netlify.com/sites/pjflanagan/deploys)

# Digital Resume

A project portfolio at [pjflanagan.me](https://pjflanagan.me). Created with Gatsby, hosted on Netlify.

## Develop

```shell
npm run develop
```

## Structure

```
./content - the site copy (JSON, editable via Decap CMS)
./content/images - CMS-managed images (personal, experience, projects)
./static/admin - Decap CMS editor (served at /admin/)
./src
├── /components - page components
├── /content - content types, fetching, and React context
├── /elements - individual themed elements
├── /helpers - math, color, and random
├── /images
├── /pages - top level page components and styles (builds into site pages automatically)
└── html.js - top level page with custom header tags
```

## Content

Site copy lives in `content/*.json` and is edited through [Decap CMS](https://decapcms.org/) at [pjflanagan.me/admin/](https://pjflanagan.me/admin/). Content changes go live **without a redeploy**:

1. Saving in the editor commits the changed `content/*.json` directly to `main`.
2. Netlify's `ignore` rule in `netlify.toml` sees only `content/` changed and skips the build.
3. The deployed site fetches `content/*.json` from `raw.githubusercontent.com` on page load (`src/content/fetchContent.ts`), so the new copy appears within ~5 minutes (the raw GitHub cache). The build-time copy of the JSON is the initial render and the fallback if the fetch fails.

Any commit touching files outside `content/` triggers a normal Netlify deploy.

Images follow the same pattern: personal photos, company/school logos, and project screenshots live in `content/images/{personal,experience,projects}` and are loaded from raw GitHub at runtime (`contentImage()` in `src/content/fetchContent.ts`), so uploading an image through the CMS skips the rebuild too. Site chrome (icons, social cards, backgrounds, noise) stays in `static/img`. Content JSON may store either a bare filename (resolved against the section's folder) or a full URL (what the CMS image widget writes).

### Updating content

- **Via the CMS:** log in at `/admin/` with a GitHub account that has write access to this repo, edit, and publish. Each file has a custom preview (`static/admin/preview.js`) showing a rough render with clickable links and images.
- **By hand:** edit `content/*.json` directly and push. Keep the shapes in sync with `src/content/types.ts`, and mirror any shape changes in `static/admin/config.yml` so the CMS fields still match. Files are numbered by the order their section appears on the page (e.g. `2.1-jobs.json`). Note `2.3-skills.json` is wrapped as `{ "groups": [...] }` and `5.0-footer.json` as `{ "items": [...] }` because Decap requires an object at the file root.
- **Locally with the CMS UI:** uncomment `local_backend: true` in `static/admin/config.yml`, then run `npx decap-server` alongside `npm run develop` and open `http://localhost:8000/admin/`. Saves write to your working tree instead of committing to GitHub.

### One-time CMS setup

Decap uses the GitHub backend with Netlify as the OAuth provider (no Netlify Identity / git-gateway):

1. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: `https://app.netlify.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
2. On Netlify: **Site configuration → Access & security → OAuth → Install provider → GitHub**, paste the Client ID and Secret from step 1.

After that, `/admin/` login works for anyone with write access to the repo.
