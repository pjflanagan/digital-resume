
# Reason Why Wont Do

- Links have many different hover effects and I'd like to add even more.
- We added highlighting to the Decap editor preview for when a link is invalid, so it's less likely to mess up.

---

# Easier content linking (markdown?)

## The pain today

Prose and links live in two places. Paragraph text holds `<key>` tokens
(e.g. `<rockclimber>`), and a separate `links` array holds the display text,
optional `href`, and optional `callbackParam` hover actions. Editing a phrase
means touching both, and the display text isn't visible in the paragraph.

Special cases that any replacement must handle (personal section):
- links with hover actions but **no href** (rock climber, SCUBA diver)
- links with **both** an href and hover actions (rollerblader, Mandarin student)
- `titleText` with a text-swap action (`text: english` / `text: mandarin`)

## Option 1 — markdown links + title-attribute convention (recommended)

Standard markdown links carry an optional title: `[text](href "title")`.
Encode hover actions in the title; use `#` as the href when there's no real link.

```
Outside of coding, I'm an avid [rollerblader](//instagram.com/roller.babe "image:personal-roller-blade.jpg"),
novice [rock climber](# "image:personal-rock-climbing.jpg"), and
[Mandarin student](//flanny.app/study-mandarin "text:mandarin, image:personal-mandarin.jpg").
```

- The `links` arrays disappear from the JSON entirely; everything reads in place.
- No markdown library needed: swap the `<key>` regex in
  `src/elements/text/ParseTextForLinks.tsx` for a markdown-link regex
  (`\[([^\]]+)\]\(([^)\s]*)(?:\s+"([^"]*)")?\)`) and parse the title into
  `LinkAction[]`. Same swap in `static/admin/preview.js` (`linkText` helper).
- Decap: paragraphs become plain `text` widgets; the nested links list fields go away.
- Degrades gracefully: any real markdown renderer shows the right text/href,
  title becomes a tooltip.
- `titleText` works too: `[Peter James Flanagan](# "image:personal-photo.jpg, text:english")`.

Caveat: the title syntax is stringly-typed — a typo like `img:` fails silently.
Make the parser warn (especially in the CMS preview, where it'd be caught immediately).

## Option 2 — pseudo-URL scheme

`[SCUBA diver](hover:image=personal-scuba.jpg)`

One less quoting layer, but it's no longer "just markdown": a real renderer
produces a dead `hover:` link, and combining a real href with actions needs
more invented syntax. Prefer option 1.

## Option 3 — full markdown widget

Use `react-markdown`/`marked` with a custom link renderer; same title
convention as option 1, plus bold/italic etc. and Decap's rich-text editing UI.
Costs a dependency, and Decap's rich-text mode doesn't expose the title field
well (you'd edit in raw-markdown mode anyway). Only worth it if other
formatting in the copy is actually wanted.
