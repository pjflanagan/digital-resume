# Color variable renaming plan

Audit of `_variables.scss` against actual usage in every `.scss` file, done to
support renaming the color variables to a scheme of:

```
$<role>_<hue><n?>_<alpha?>
```

- **role** — `background` (surface fill), `display` (identity color used for
  text/icons/borders — the "resting" state), `accent` (interactive/hover
  variant of a color)
- **hue** — a plain color name (`yellow`, `cyan`, `darkBlue`, `teal`, `red`,
  `black`, `white`), with a trailing number only if there's more than one
  distinct shade of that hue (`darkBlue1`, `darkBlue2`)
- **alpha** — `_a<percent>`, omitted when opaque (short for alpha, not "transparency")

This doc is the "how to rename" reference — it is not itself the rename.
Nothing has been changed in `_variables.scss` yet. A few things below need a
decision from you before renaming can be mechanical (flagged with **DECISION**).

---

## 1. Role: is "display" really about text?

You asked "honestly are yellow and cyan accents?" — checking usage: `$accentYellow`
and `$accentCyan` are used as `color`, `border-color`, **and** `background`
(e.g. `Button.module.scss:116`, `ProgressBar.module.scss:103`, `Ruler.module.scss:58`,
`Stack.module.scss:147`, `Avatar.module.scss:30` all set yellow/cyan as a
`background`, not just text).

So "display" can't mean "only used in text" — it has to mean **"the resting/identity
color of this hue"**, regardless of which CSS property it lands on. "Accent" then
cleanly means **"the hover/interactive variant of that same hue"**, which matches
every `*Hover` variable in the file today (`accentYellowHover`, `accentCyanHover`,
`backgroundLightHover`, `accentRedHover`).

**DECISION:** confirm role = identity/resting (`display`) vs hover (`accent`),
independent of CSS property. Recommendation below assumes yes.

## 2. Hue inventory (canonical hex per hue)

| hue         | hex       | currently                                                                                                     |
| ----------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| `darkBlue1` | `#112a32` | `$backgroundDark`                                                                                             |
| `darkBlue2` | `#113f54` | `$backgroundDark2`                                                                                            |
| `teal`      | `#157270` | `$backgroundLight`                                                                                            |
| `yellow`    | `#e4f03c` | `$accentYellow`                                                                                               |
| `cyan`      | `#1fcfcc` | `$accentCyan`                                                                                                 |
| `orange`    | `#e4400f` | `$accentRed` **and** `$warnOrange` (identical hex — merged into one hue, see §2)                              |
| `black`     | `#1c1c1c` | `$black` **and** the base of `$backgroundDark3Transparent(2)` (`#1c1c1c` + alpha — same hue, not a teal/blue) |
| `white`     | `#fff`    | `$white`                                                                                                      |

**Resolved:** merge `$accentRed`/`$warnOrange` into a single hue, `orange`.
`$display_orange` (identity/warning use) and `$accent_orange` (hover). No
separate semantic alias.

## 3. Transparency tiers actually in use

Converting every alpha in the codebase (including 4-digit shorthand hex like
`#0008`) to a percent, then snapping to the nearest multiple of 10 (resolved:
increments of 10, snap don't invent exact tiers):

| alpha found | raw % | snapped tier | where                                                                                          |
| ----------- | ----- | ------------- | ----------------------------------------------------------------------------------------------- |
| `dd`        | 87%   | `a90`         | backgroundDark/backgroundDark2 transparents                                                    |
| `f0`        | 94%   | `a90`         | backgroundDark3Transparent                                                                     |
| `aa`        | 67%   | `a70`         | backgroundDark3Transparent2                                                                    |
| `88`        | 53%   | `a50`         | backgroundLightTransparent, accentYellow/CyanTransparent, whiteTransparent                     |
| `66`        | 40%   | `a40`         | hardcoded in Header.module.scss (see §4)                                                       |
| `44`        | 27%   | `a30`         | backgroundLightTransparent2, blackTransparent, accentYellow/CyanTransparent2                   |
| `33`        | 20%   | `a20`         | accentYellowTransparent2, accentCyanTransparent2                                               |
| `54`        | 33%   | `a30`         | warnLightTransparent (`#a0534854`) — see §4                                                     |

Note `dd`(87%) and `f0`(94%) both snap to `a90`, and `44`(27%)/`54`(33%) both
snap to `a30` — those pairs collapse into the same named variable, which is
the point of snapping (accept the tiny visual shift).

One-off inline box-shadow/overlay alphas on black/white (`#0002`, `#0004`,
`#0008`, `#0009`, `#000a`, `#fff0`, `#fff3`) also snap to the same `a10`
increments (`10/30/50/60/70/0/20`) but are left as literals rather than
promoted to named variables — they're one-off shadow tweaks, not reusable
brand colors.

## 4. Hardcoded colors found that bypass the variables entirely

| file:line                                                                                    | value                                                                                   | verdict                                                                                                                                                           |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `elements/button/Button.module.scss:105`                                                     | `#e4f03c`                                                                               | exact match for `$accentYellow` → replace with variable, no new color needed                                                                                      |
| `elements/splash/Splash.module.scss:7`                                                       | `#112a32`                                                                               | exact match for `$backgroundDark` → replace with variable                                                                                                         |
| `elements/header/Header.module.scss:12`                                                      | `#112a3266`                                                                             | `$backgroundDark` at 40% alpha → no existing variable at this tier; needs `$background_darkBlue1_a40` added                                                       |
| `components/bio/4-skills/Skills.module.scss:47`                                              | `#143545`                                                                               | **Resolved: reuse** `$backgroundDark2` (`#113f54`) — treat as the same shade, not a new one.                                                                     |
| `components/404/Page404.module.scss:7`                                                       | `#06191f`                                                                               | **Resolved: reuse** `$backgroundDark` (`darkBlue1`) — consolidate rather than add a one-off hue.                                                                  |
| `components/bio/4-skills/Skills.module.scss` warn card `#a0534854` (`$warnLightTransparent`) | base `#a05348` is a muted red, distinct from the merged `orange` (`#e4400f`)            | **Resolved (my call): reuse.** Treat as a tint of `$display_orange` rather than adding a dedicated muted-red hue for one usage — `$display_orange_a30`. It's the warning-card background, visually reads as "faded warning red" either way, and a whole extra hue for a single spot adds more system than the payoff justifies. |
| `components/bio/2-experience/SlideExperience.module.scss:41`                                 | `#121e25`                                                                               | inside a commented-out line (`// background: radial-gradient(...)`) — dead code, recommend deleting the comment rather than renaming                              |

Everything else that looked hardcoded (`#fff`, `#000`, and their shorthand
alpha variants) resolves cleanly to the `black`/`white` hues at one of the
tiers in §3.

## 5. Full rename table (final)

All decisions resolved — this is now mechanical.

| current name                                     | new name                       |
| ------------------------------------------------ | ------------------------------- |
| `$backgroundDark`                                 | `$background_darkBlue1`         |
| `$backgroundDarkTransparent`                      | `$background_darkBlue1_a90`      |
| _(new — also covers Header.module.scss, §4)_      | `$background_darkBlue1_a40`      |
| `$backgroundDark2` (also covers Skills.scss §4)   | `$background_darkBlue2`          |
| `$backgroundDark2Transparent`                     | `$background_darkBlue2_a90`      |
| `$backgroundDark3Transparent`                     | `$background_black_a90`          |
| `$backgroundDark3Transparent2`                    | `$background_black_a70`          |
| `$backgroundLight`                                | `$background_teal`              |
| `$backgroundLightTransparent`                     | `$background_teal_a50`          |
| `$backgroundLightTransparent2`                    | `$background_teal_a30`          |
| `$backgroundLightHover`                            | `$accent_teal`                  |
| `$accentYellow`                                    | `$display_yellow`               |
| `$accentYellowTransparent`                         | `$display_yellow_a50`           |
| `$accentYellowTransparent2`                        | `$display_yellow_a20`           |
| `$accentYellowHover`                                | `$accent_yellow`                |
| `$accentCyan`                                       | `$display_cyan`                 |
| `$accentCyanTransparent`                            | `$display_cyan_a50`             |
| `$accentCyanTransparent2`                           | `$display_cyan_a20`             |
| `$accentCyanHover`                                   | `$accent_cyan`                  |
| `$accentRed` + `$warnOrange` (merged)               | `$display_orange`               |
| `$accentRedHover`                                    | `$accent_orange`                |
| `$warnLightTransparent`                              | `$display_orange_a30`           |
| `$white`                                             | `$display_white`                |
| `$whiteTransparent`                                  | `$display_white_a50`            |
| `$black`                                             | `$display_black`                |
| `$blackTransparent`                                  | `$display_black_a30`            |

Also fold in from §4: `Page404.module.scss:7`'s `#06191f` → replace with
`$background_darkBlue1`; `Button.module.scss:105`'s `#e4f03c` → `$display_yellow`;
`Splash.module.scss:7`'s `#112a32` → `$background_darkBlue1`.

## 6. Decisions — all resolved

1. Role = resting-identity (`display`) vs hover (`accent`), independent of CSS property. ✅ (§1)
2. `$accentRed`/`$warnOrange` merged into one hue, `orange`. ✅ (§2)
3. Transparency tiers snapped to nearest increment of 10 (`a20`/`a30`/`a40`/`a50`/`a70`/`a90`). ✅ (§3)
4. `Skills.module.scss:47` `#143545` → reuse `$backgroundDark2`. ✅ (§4)
5. `Page404.module.scss:7` `#06191f` → reuse `$backgroundDark`. ✅ (§4)
6. `$warnLightTransparent`'s base `#a05348` → reuse `orange` as a tint (`$display_orange_a30`) rather than a new hue. ✅ (§4)
7. Black/white get the `display_` prefix like every other hue, no exception for neutrals. ✅ (§5)

The rename in §5 is ready to execute as a mechanical find-and-replace across
`_variables.scss` and every consuming file, plus the three hardcoded-hex
replacements called out above.
