
# Improve the Personal Slide

## Image Shaders

Think about shaders `npm i @paper-design/shaders-react`. If it isn't too resource intensive then this would be a cool way to animate the reveal and photo changes.

```ts
import { ImageDithering } from '@paper-design/shaders-react';

<ImageDithering
  width={1280}
  height={720}
  image="https://paper.design/flowers.webp"
  colorBack="#000c38"
  colorFront="#94ffaf"
  colorHighlight="#eaff94"
  originalColors={false}
  inverted={false}
  type="8x8"
  size={2}
  colorSteps={2}
  fit="cover"
/>

```

## Micro Graphics

Including Micro Graphics can be fun little details. Use symbols from things

- Minority Report: triangle police badge
- Marse Express?
- Horizon
- Alien - Company Logo
- Gravity Falls - Bill Cypher
- Vonnegut - Butthole Asterix
- Mars Express - triangle monster thing
- Fifth Element - fifth element symbol
- NGE - an angel or Nerv symbol

### TODO: sort
- The 5th Element symbol
- Neon Genisis Evangelion symbols and/or UI overlays
- Horizon? (symbols?)
- Alien? (Weilan-Yotani)