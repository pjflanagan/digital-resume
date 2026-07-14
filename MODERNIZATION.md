# Modernization Plan

> **Status (July 2026):** Phases 1–4 complete. Not done by choice: GitHub Actions CI,
> Dependabot, react-icons swap, and replacing useReveal with react-intersection-observer
> (the latter two change visuals/behavior and deserve their own pass).

Goal: bring the site up to current tooling (Node, Gatsby, TypeScript everywhere) and
restructure components away from the `index.js` + `style.module.scss` pattern.

Current state: Gatsby 5.11 / React 18 (already modern-ish), `.nvmrc` pins Node 18,
~40 components are still `.js`, styles are all named `style.module.scss`, and several
dependencies are deprecated or dead.

---

## Phase 1 — Toolchain & dependencies

1. **Node**: bump `.nvmrc` to `v22` (current LTS, matches what's installed locally:
   v22.12.0). Gatsby 5 supports Node ≥18, so 22 is safe.
2. **Gatsby**: update all `gatsby-*` packages from 5.11 to latest 5.14.x
   (`npm outdated` → minor bumps only, no breaking changes expected).
3. **Replace `node-sass` with `sass`** (Dart Sass). `node-sass` is deprecated and won't
   compile on Node 22. `gatsby-plugin-sass` uses `sass` by default when present.
   Fix any deprecation warnings (`@import` → `@use`/`@forward` in `src/theme/`).
4. **Remove `gatsby-image`** (deprecated v3 shim) — `gatsby-plugin-image` is already
   installed; migrate any remaining `<Img>` usages to `<GatsbyImage>`/`<StaticImage>`.
5. **TypeScript**: bump from 4.5 to ^5.x. Move `@types/*` and `typescript` from
   `dependencies` to `devDependencies`; drop `@types/jest` (no tests exist).
6. **Analytics**: `gatsby-plugin-google-analytics` uses Universal Analytics
   (`UA-66104630-1`), which Google shut down in 2023 — it's collecting nothing.
   Replace with `gatsby-plugin-google-gtag` + a GA4 measurement ID (or delete).
7. **Fonts**: `gatsby-plugin-google-fonts` is unmaintained. Self-host Ubuntu via
   `@fontsource/ubuntu` (better performance, no external request).
8. **Remove `gatsby-plugin-root-import`** — replace with `tsconfig.json` `paths`
   (already has `baseUrl: "src"`) plus built-in Gatsby 5 path support, or keep aliases
   via `gatsby-node` `onCreateWebpackConfig` (a few lines, no dep).
9. Delete stray `deno.lock` (npm is the package manager here).

## Phase 2 — TypeScript conversion

1. Rename config files: `gatsby-config.js` → `gatsby-config.ts`,
   `gatsby-node.js` → `gatsby-node.ts` (natively supported in Gatsby 5).
2. Convert `src/html.js`, `src/pages/*.js`, `src/helpers/*.js`, `src/hooks`,
   `src/content/**/*.js` to `.ts`/`.tsx`. Order: helpers → hooks → elements →
   components → pages (leaf-first keeps each step type-checkable).
3. Add shared types in `src/types/` for the JSON content (jobs, schools, projects,
   skills) so `resolveJsonModule` imports are strongly typed.
4. Tighten `tsconfig.json`: once conversion is done, drop `allowJs`, narrow `include`
   to `.ts`/`.tsx`, set `target: "es2022"`, add `"types": ["node"]`.
5. Add `"typecheck": "tsc --noEmit"` script and run it in CI.

## Phase 3 — File/naming restructure

Replace the `folder/index.js` + `style.module.scss` pattern with named files:

```
src/elements/button/
  index.js               →  Button.tsx
  circle-button.js       →  CircleButton.tsx
  labeled-button.js      →  LabeledButton.tsx
  style.module.scss      →  Button.module.scss
```

Rules:
- Component file is PascalCase and named after the component: `FeaturedProject.tsx`.
- Its stylesheet matches: `FeaturedProject.module.scss`.
- Keep a folder per component only when it has children/assets; single-file components
  can live flat (e.g. `src/elements/Footer/Footer.tsx` or just `src/elements/Footer.tsx`).
- Optionally keep a one-line `index.ts` barrel (`export * from './Button'`) so import
  paths stay short — or update all imports to the explicit file; pick one and be
  consistent. Recommendation: no barrels; explicit imports, since the codebase is small.
- Numbered section folders (`0-landing`, `1-personal`, …) are kept — the ordering is
  useful.
- Use `git mv` for every rename so history follows.

## Phase 4 — Suggested additional modernization

- **Linting/formatting**: add ESLint (flat config, `typescript-eslint`,
  `eslint-plugin-react-hooks`) and Prettier; add `lint` script.
- **CI**: GitHub Actions workflow running `typecheck`, `lint`, and `gatsby build`
  on PRs.
- **`gatsby-plugin-manifest` icons**: verify icon set; add `icons` array if needed.
- **Replace hand-rolled hooks with libraries** (per TODO): `react-intersection-observer`
  for `useReveal`; `react-use` is already installed — lean on it for scroll state.
- **Icons**: swap bespoke SVG icon components for `react-icons` (already on the TODO).
- **Head/SEO**: use Gatsby 5's built-in `Head` export API instead of manual `html.js`
  customization where possible; add per-page titles/meta.
- **classnames → clsx**: smaller, same API (optional).
- **Remove `gatsby-transformer-remark`** if nothing queries markdown anymore
  (blog was removed on this branch) — also re-check `gatsby-source-filesystem`
  and manifest options for blog leftovers.
- **Dependabot/Renovate** to keep deps current going forward.
- **Decision: staying on Gatsby.** The Next.js rewrite is off the table; this plan
  modernizes in place.

## Execution order & verification

Each phase is a separate PR. After each: `npm run build` + `npm run develop` smoke
test (landing animation, reveal effects, contact form, 404 page). Phase 3 is
mechanical but touchy — do it as one atomic PR of pure renames + import updates,
no logic changes, so the diff is reviewable.
