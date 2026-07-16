I wrote feedback on all these changes in blockquotes.
Do the ones I said to do then respond to my questions.

---

1. LandingBody.tsx:21-26 — unthrottled scroll listener (biggest issue)
Uses useWindowScroll() from react-use, which fires setState on every single scroll pixel event, re-rendering the top-level landing component constantly while scrolling. Fix: track scroll in a ref and apply the transform directly via requestAnimationFrame, bypassing React state entirely for this.

> Good, do this.

2. Wave.tsx:70,88-98 — animating height (layout-triggering) every 64ms across ~30-90 bars
Forces reflow every frame while hovering contact links. Also uses setInterval instead of requestAnimationFrame, so it's not synced to paint and can jank. Fix: switch to transform: scaleY() with transform-origin: bottom on a fixed-height bar — compositor-only, no reflow.

> Good, do this.

3. BillCypher.tsx:40-43 — positions via margin instead of transform
margin: ${top}% ${left}% triggers layout on every update. Fix: use transform: translate(...) alongside the existing rotate(...).

> Bill is currently unused but do this anyway.

4. Org.tsx:46-61 — setInterval (100ms) per component for bullet reveal
With multiple org entries revealing near-simultaneously on scroll, several concurrent JS timers fire redundant re-renders. Fix: replace with a pure CSS staggered animation-delay per bullet — eliminates the JS timers entirely.

> Good, do this.

5. elements/image/Image.tsx:13-16 — plain <img>, not next/image 
No width/height/sizes, no automatic responsive srcset or webp/avif conversion, no CLS protection. Lower urgency but a real LCP/CLS win for the headshot/avatar images.

> But this is Gatsby not Nextjs, are you sure?

6. useScrambleText.ts:63-87 — independent 50ms setInterval per scrambled-text instance
If several scramble-text elements are visible at once, they run uncoordinated timers. Minor, but could be consolidated onto a shared rAF driver.

> Probably don't do this.

What's already solid: the canvas animation in SlideLanding (single rAF loop, debounced resize, proper cleanup), useReveal.ts (IntersectionObserver, unobserves after reveal), and list rendering (stable keys, no virtualization needed given list sizes).

