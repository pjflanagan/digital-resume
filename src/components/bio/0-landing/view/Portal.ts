import { Color, Random } from 'src/helpers';

import { SHIP_CENTER, SHIP_LAYER } from './constants';
import { SpectrumBody, SpectrumBodyProp } from './SpectrumBody';
import type { View } from './View';

const PORTAL = {
  RADIUS: 0.03, // proportional to the shorter viewport side, always this size
  COLORS: [
    { r: 16, g: 138, b: 13 },
    { r: 22, g: 198, b: 9 },
    { r: 176, g: 236, b: 18 },
  ],
  OFFSET: {
    SPEED: 0.1,
    MAX_RADIUS: 40,
  },
  CENTER_X_MIN: -0.25, // proportional to the viewport width
  SCROLL_SHIFT_RATE: 14,
  // swirls noticeably faster than moons/planets
  ANGULAR_VELOCITY: { min: 0.008, max: 0.014 },
  CYCLE: {
    // stays put and visible this long, then shrinks away and regrows elsewhere
    VISIBLE_MS: 10000,
    SHRINK_MS: 450,
    HIDDEN_MS: 3000,
    GROW_MS: 450,
  },
};

// a green Rick and Morty style portal, drawn like a moon but at a fixed small size;
// it periodically shrinks out of existence and grows back in at a new spot
class Portal extends SpectrumBody {
  private baseRadius = 0;
  private cycleMs = 0;
  private hasRelocated = true;

  constructor(canvas: View, layer: number, id: number) {
    super(canvas, layer, id);
    this.baseRadius = this.prop.radius;
    const dir = this.colorProp.angularVelocity < 0 ? -1 : 1;
    this.colorProp.angularVelocity = dir * Random.decProp(PORTAL.ANGULAR_VELOCITY);
  }

  protected createProp(): SpectrumBodyProp {
    const { shorterSide, W, H } = this.canvas;

    const radius = PORTAL.RADIUS * shorterSide;
    // foreground portals spawn clear of the ship
    const minX =
      this.layer > SHIP_LAYER ? SHIP_CENTER.x * W + radius * 3 : PORTAL.CENTER_X_MIN * W;

    const colorSpectrum = PORTAL.COLORS.map((rgb) => new Color({ ...rgb, a: 0.9 }));
    Random.insertRandom(colorSpectrum, new Color({ ...Random.fromArray(PORTAL.COLORS), a: 0.9 }));
    Random.insertRandom(colorSpectrum, new Color({ ...Random.fromArray(PORTAL.COLORS), a: 0.9 }));
    Random.insertRandom(colorSpectrum, new Color({ ...Random.fromArray(PORTAL.COLORS), a: 0.9 }));

    return {
      center: {
        x: Random.int(minX, W - radius * 2),
        y: Random.int(0, H),
      },
      radius,
      colorSpectrum,
      offsetRadiusMax: PORTAL.OFFSET.MAX_RADIUS,
      offsetSpeed: PORTAL.OFFSET.SPEED,
      scrollShiftRate: PORTAL.SCROLL_SHIFT_RATE,
    };
  }

  move() {
    this.updateCycle();
    super.move();
  }

  // shrinks to nothing, waits out of view, jumps to a new spot, then grows back
  private updateCycle() {
    const { VISIBLE_MS, SHRINK_MS, HIDDEN_MS, GROW_MS } = PORTAL.CYCLE;
    const shrinkEnd = VISIBLE_MS + SHRINK_MS;
    const hiddenEnd = shrinkEnd + HIDDEN_MS;
    const period = hiddenEnd + GROW_MS;

    this.cycleMs += (1000 / 60) * this.canvas.frameScale;
    if (this.cycleMs >= period) {
      this.cycleMs -= period;
      this.hasRelocated = false;
    }

    let scale = 1;
    if (this.cycleMs < VISIBLE_MS) {
      scale = 1;
    } else if (this.cycleMs < shrinkEnd) {
      scale = 1 - (this.cycleMs - VISIBLE_MS) / SHRINK_MS;
    } else if (this.cycleMs < hiddenEnd) {
      if (!this.hasRelocated) {
        this.relocate();
        this.hasRelocated = true;
      }
      scale = 0;
    } else {
      scale = (this.cycleMs - hiddenEnd) / GROW_MS;
    }
    this.prop.radius = this.baseRadius * Math.max(0, Math.min(1, scale));
  }

  private relocate() {
    const { W, H } = this.canvas;
    const radius = this.baseRadius;
    const minX =
      this.layer > SHIP_LAYER ? SHIP_CENTER.x * W + radius * 3 : PORTAL.CENTER_X_MIN * W;

    this.prop.center = {
      x: Random.int(minX, W - radius * 2),
      y: Random.int(0, H),
    };
    this.pos = { ...this.prop.center };
    this.setOffsetTo();
  }

  // no trail, unlike moons/planets
  draw() {
    this.drawSpectrum();
  }
}

export { Portal };
