# Refactoring & Code Smells

> **Status (July 2026): all sections applied.** Remaining by choice: the inline
> TODO triage items at the end of section 3 (ring math, Gatsby `Link` in buttons,
> button width) and the useReveal → react-intersection-observer swap tracked in
> MODERNIZATION.md.

An audit of cleanup candidates, code smells, and anti-patterns as of July 2026
(post-modernization: everything is TS, Gatsby 5.16, Sass module classes).
Ordered roughly by value-for-effort within each section.

---

## 1. Bugs / correctness issues hiding as smells

### 1.1 `Bio.tsx` — `useEffect` with no dependency array
`src/components/bio/Bio.tsx:29` — the splash-screen effect runs on **every render**
and schedules a new `setTimeout` each time (never cleaned up). Should be
`useEffect(() => { const t = setTimeout(...); return () => clearTimeout(t); }, [])`.

### 1.2 Landing `View` never removes window listeners and leaks per-mount
`src/components/bio/0-landing/view/View.ts:54-62` — `mousemove` and `scroll`
listeners are added in the constructor and never removed. Combined with 1.3
below, hot-reload/dev navigation stacks Views forever. Add a `destroy()` that
removes listeners and cancels the animation frame, and call it from `Canvas`.

### 1.3 `Canvas.tsx` constructs the view and throws it away
`src/elements/canvas/Canvas.tsx:19-22` — `new props.view(canvasElem)` with no
reference kept, no cleanup returned from the effect, and an
`eslint-disable-next-line` suppressing the exhaustive-deps warning. Both `View`
classes already have a `stop()` method that is never called. Fix:

```ts
useEffect(() => {
  const view = canvasRef.current && new props.view(canvasRef.current);
  return () => view?.stop(); // and view?.destroy() per 1.2
}, [props.view]);
```

Requires `CanvasView` to declare `stop()` instead of returning `unknown`.

### 1.4 Neither canvas handles window resize
Both `View` classes snapshot `window.innerWidth/innerHeight` in the constructor.
Rotating a phone or resizing the browser leaves a wrongly-sized canvas.

### 1.5 `Card.fetch()` treats any HTTP response as success
`src/components/bio/4-contact/card/Card.tsx:125-138` — `fetch` only rejects on
network failure; a 404/500 from Netlify still shows "Sent". Check `res.ok`.
Also: the `setTimeout` in `success()` (line 162) is not cleared on unmount, and
the existing TODO about rendering `findError('submit')` still stands — a submit
error is currently invisible to the user.

### 1.6 `ParseTextForLinks` drops text after an unmatched link key
`src/elements/text/ParseTextForLinks.tsx:38-41` — when `links.find` misses, the
`return` inside `forEach` skips pushing anything, silently swallowing content.
Also `text.substr` (line 60) is deprecated (`slice`), and the trailing-text
logic (`lastIndexOf('>')`) breaks if the text legitimately contains `>`.

### 1.7 `Random.shuffle` mutates its argument but is used as if pure
`src/helpers/random.ts` — `shuffle` sorts in place *and* returns the array.
Callers like `Color.randomSimilar` are fine today, but the dual contract is a
trap. Either copy first (`[...array]`) or rename to `shuffleInPlace`.

### 1.8 Keyboard "buttons" fire on every keydown
`LabeledButtonAction`, `CircleButtonAction`, `Stack` layers, and `StackNav`
attach the click handler directly to `onKeyDown` with `role="button"`. Tab,
Shift, arrows — anything — triggers the action, and `e.preventDefault()` eats
the keystroke. Use a real `<button>` (free keyboard semantics) or gate on
`e.key === 'Enter' || e.key === ' '`. This also relates to the TODO item
"tab through the whole site seamlessly".

---

## 2. Anti-patterns / architecture

### 2.1 Remaining class components → hooks
Three class components are left, all straightforward conversions:
- `Card` (`4-contact/card/Card.tsx`) — the big one. As a function component the
  constructor bind-fest (lines 92-97) disappears, the `as unknown as CardState`
  cast in `onChange` (line 106) goes away (use one `useState` per field or a
  reducer), and validation state gets simpler.
- `Wave` (`4-contact/wave/Wave.tsx`) — the `componentDidUpdate` interval
  start/stop becomes a single `useEffect(..., [on])` with cleanup. Note it also
  mutates `this.state.wave` in place (`wave.pop()/unshift`) before `setState`,
  which is a React anti-pattern.
- `CircleButtonAction` (`button/CircleButton.tsx`) — its sibling
  `LabeledButtonAction` is already a function component doing the identical
  thing; converting makes the two files symmetric.

### 2.2 `Button.tsx` prop-forking with casts
`src/elements/button/Button.tsx` — `ButtonProps = Partial<ActionProps> &
Partial<LinkedProps>` then `props as ActionProps` casts defeat the type system:
you can pass neither `onClick` nor `href` and it compiles. Use a discriminated
union (`{ onClick } | { href }`) and let TS narrow — the casts and the
runtime `if` both get safer for free.

### 2.3 Stringly-typed icons
`SVGIcon` takes `icon: string` and silently renders `<span />` on a typo.
`ICONS` is a static record — export `type IconName = keyof typeof ICONS` and
use it in `SVGIcon`, `ButtonCommonProps`, `FormButtonProps`, and content types
(`ContactLink.icon`). Typos become compile errors.

### 2.4 Landing `View.ts` (774 lines) — split and de-duplicate
`src/components/bio/0-landing/view/View.ts`:
- One file holds `View`, `Space`, `Body`, `Planet`, `Moon`, `Star`, `Ship`.
  Split into `view/` files (`View.ts`, `Body.ts`, `Planet.ts`, …) — the section
  banner comments are already begging for it.
- `move()` is copy-pasted identically in `Planet`, `Moon`, and `Star`
  (lines 457-466, 564-572, 608-615). Hoist into `Body` as the default and let
  `Ship` override.
- `setup()` builds star/moon layers with five copy-pasted loops (lines 73-109).
  Replace with a small layer table: `[{ count: VIEW_STARS, make: Star }, …]`.
- `BodyProp`/`BodyState` are "god types": every field for every subclass
  (`rings`, `exhaustLength`, `colorSpectrum`…) lives on the shared type, and
  `{} as BodyProp` (line 234) fakes initialization — any forgotten field is a
  runtime `undefined`, not a compile error. Make each subclass own its extra
  props, or at minimum initialize with real defaults.
- Constant style is inconsistent: `PLANET` is a nested config object, while
  `MOON_*`/`STAR_*`/`SHIP_*` are flat consts. Pick one (the nested object reads
  better).
- The base class references subclass constants (`SHIP_BACKPEDAL`,
  `SHIP_CENTER` inside `Body.getScrollShiftedCenter` / `Moon.setup`) —
  upward coupling that will break if the file is split naively; promote those
  to shared view constants.

### 2.5 The two `View` classes share no code
`404/view/View.ts` duplicates the landing view's canvas bootstrapping, `Space`
background (same `#06191f` literal), and animate/stop loop. Extract a small
`BaseView` (sizing, rAF loop, stop/destroy) both extend. Also: the 404
`drawFrame` pushes a new `Particle` **every frame** and filters the array each
frame — fine at this scale, but a spawn interval would be more intentional.

### 2.6 `SlideExperience.tsx` — repeated `<Org>` prop plumbing
Four nearly identical `.map()` blocks spreading Job/School fields one by one.
Extract `<OrgList orgs={...} />` or map Job/School → OrgProps in one adapter
function; the school variant (`time={school.class}`, `position={school.degree}`)
makes the duplication worth killing before the next content shape change.

### 2.7 `Body.tsx` (1-personal) — indexing an object literal to dispatch
`src/components/bio/1-personal/body/Body.tsx:15-22` — building an object of
lambdas and indexing it with `action as 'image' | 'text'` is clever but unsafe
(an unknown action throws `undefined is not a function`). A plain `switch`
with a typed `action` union on `ContentLink.callbackParam` is clearer and safe.
The `'english' | 'mandarin'` union is also declared twice — extract a
`type Language` and reuse (content in `Bio.personal.accent` should key off it).

### 2.8 `Random.prop` guesses int-vs-dec from the range values
`src/helpers/random.ts` — `prop` returns an int when both bounds are integers,
a decimal otherwise. `{min: 1, max: 2}` and `{min: 1, max: 2.0001}` behave
completely differently. Make the caller choose (`Random.intProp` /
`Random.decProp`) or add an explicit flag. Also `prop2` is an opaque name —
`scaledProp` or similar.

---

## 3. Smaller cleanups

- **`ProgressBar.tsx:24-26`** — `clsx(Style.bar, {...(classNameProp ? {...} : {})})`
  is just `clsx(Style.bar, classNameProp)`.
- **Template-string class concatenation** — `Org.tsx` (line 84:
  `` `${Style.orgExtra} ${getClassName(...)}` ``) and `LabeledButtonForm`
  (`` `${Style.labeledButton} ${Style.buttonReset}` ``) should use `clsx` like
  the rest of the codebase.
- **Array-index `key={i}`** everywhere (`Card` links, `Org` descriptions,
  `SlideExperience` orgs, `Wave` bars). Mostly static content so it works, but
  orgs/projects have stable `name`s — use them.
- **`Text.tsx`** — `TextTitle/TextSection/TextHeading/TextSubHeading` are four
  copies of the same component differing only in tag; one
  `makeHeading('h1')`-style factory (or a `Heading level={n}` component)
  removes the repetition. Also `mono=true` default on `TextAccent` (line 55)
  is missing spaces around `=` — prettier appears not to have run on it.
- **`useReveal`** — the comment admits the double behavior ("only update once…
  otherwise make a useIntersecting hook"): it unobserves on first intersection
  but the state can still flicker false→true→(never false again). Fine, but
  `observer.disconnect()` in cleanup is simpler than `unobserve(el)`, and the
  TODO file already plans to replace this with `react-intersection-observer`.
- **`Org.tsx` reveal cascade** — `setTimeout` inside `useEffect` keyed on
  `bulletPointRevealIndex` re-runs an un-cleaned timeout per bullet. Works, but
  a single `setInterval` with cleanup (or CSS `animation-delay` per bullet,
  no JS at all) is simpler and unmount-safe.
- **`Card.pickPlaceholder`** — reimplements random selection; add
  `Random.fromArray` to `src/helpers/random.ts` and reuse (the same pattern
  exists for splash prompts).
- **`Color` class** — `r/g/b/a` use `!:` definite-assignment because the
  constructor branches; assign defaults directly or make `random()` a static
  factory (`Color.random()`) so the fields can be plain required params.
- **`encode` in `helpers/index.ts`** — `URLSearchParams(data).toString()` does
  this natively; also a barrel file is an odd home for a real function — move
  it or delete it.
- **`FormText` vs `FormMessage`** — near-duplicates differing only in
  `<input>` vs `<textarea>`; the label/error wrapper could be one shared
  `FormFieldWrapper`.
- **Dead code / stale comments** — commented-out `this.drawFrame()` in landing
  `View.start()` (line 121), `// this.bodies.pop()` in 404 view, `//A(1-(.05*i))`
  remnant in `drawSpectrum`, misleading copy-pasted `// planet is in the center`
  comments on `Star`/`Ship` setup, and the `VIEW_SHIP_LAYER = 5` comment
  restating the constant.
- **Naming consistency** — two different files named `Body.tsx` (0-landing and
  1-personal) plus the canvas `Body` class; two `View.ts` files. Consider
  `PersonalBody`/`LandingBody` or rely on folders but rename the canvas base
  class (e.g. `CelestialBody`) to reduce grep pain.
- **`snake_case` in content keys** — `link_text`, `title_text` in
  `src/content/bio/index.ts` vs camelCase everywhere else.
- **Existing inline TODOs worth triaging** (grep `TODO:` in src): ring math in
  `View.drawRing`, submit-error rendering in `Card`, Gatsby `Link` in
  `LabeledButtonLinked`, button width in `Button.tsx`.

---

## Suggested order of attack

1. Quick correctness fixes: 1.1 Bio effect, 1.5 `res.ok`, 1.8 keyboard handlers.
2. Canvas lifecycle: 1.2 + 1.3 + 1.4 together (one PR, touches `Canvas` + both Views).
3. Class → function conversions (2.1), then Button union types + icon types (2.2, 2.3).
4. Landing `View.ts` split/de-dupe (2.4, 2.5) — biggest job, purely internal.
5. Sweep section 3 as drive-bys while touching each file.
