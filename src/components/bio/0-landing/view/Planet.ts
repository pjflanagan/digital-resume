import { Color, ellipseCircleIntersection, Random } from 'src/helpers';

import { SpectrumBody, SpectrumBodyProp } from './SpectrumBody';
import type { View } from './View';

const PLANET = {
  RADIUS: { min: 0.36, max: 0.42 }, // proportional to the shorter viewport side
  COLORS: 5,
  OFFSET: {
    SPEED: 0.1,
    MAX_RADIUS: 40,
  },
  SCROLL_SHIFT_RATE: 6,
  RING: {
    GAP: 30,
    RING_GAP: { min: 6, max: 12 },
    COUNT: { min: 14, max: 24 },
    START_ANGLE: { min: Math.PI / 6, max: (5 * Math.PI) / 6 },
    RATE: Math.PI / 1000,
    OPACITY: 0.8,
  },
};

type Ring = {
  color: Color;
  offsetY: number;
  lineWidth: number;
};

type PlanetProp = SpectrumBodyProp & {
  ringAngleCenter: number;
  rings: Ring[];
};

class Planet extends SpectrumBody<PlanetProp> {
  private ringAngle: number;
  private ringAngleInc: number;

  constructor(canvas: View, layer: number, id: number) {
    super(canvas, layer, id);
    this.ringAngle = this.prop.ringAngleCenter;
    this.ringAngleInc = 0;
  }

  protected createProp(): PlanetProp {
    const color = new Color().setOpacity(0.9);
    const toColor = new Color().setOpacity(0.9);
    const { C, shorterSide } = this.canvas;

    const colorSpectrum = color.makeSpectrum(toColor, PLANET.COLORS);
    Random.insertRandom(colorSpectrum, new Color());

    return {
      center: C, // the planet sits in the center of the viewport
      radius: Random.scaledProp(PLANET.RADIUS, shorterSide),
      colorSpectrum,
      offsetRadiusMax: PLANET.OFFSET.MAX_RADIUS,
      offsetSpeed: PLANET.OFFSET.SPEED,
      scrollShiftRate: PLANET.SCROLL_SHIFT_RATE,
      ringAngleCenter: Random.decProp(PLANET.RING.START_ANGLE),
      rings: Planet.createRings(),
    };
  }

  private static createRings(): Ring[] {
    const ringCount = Random.intProp(PLANET.RING.COUNT);
    const ringSpectrum = new Color().makeSpectrum(new Color(), ringCount);
    const ringGap = Random.intProp(PLANET.RING.RING_GAP);
    return ringSpectrum.map((color, i) => ({
      color,
      offsetY: i * ringGap + PLANET.RING.GAP,
      lineWidth: 1,
    }));
  }

  move() {
    super.move();
    this.moveRing();
  }

  private moveRing() {
    // wiggle the ring angle back and forth a little bit,
    // and tilt it as the page scrolls
    const { scrollPercent } = this.canvas;
    const scrollOffsetAngle = (-Math.PI / 6) * scrollPercent;
    this.ringAngleInc += PLANET.RING.RATE * this.canvas.frameScale;
    const wiggleAngle = Math.sin(this.ringAngleInc) * 0.2;
    this.ringAngle = wiggleAngle + scrollOffsetAngle + this.prop.ringAngleCenter;
  }

  draw() {
    super.draw();
    this.drawRing();
  }

  private drawRing() {
    const { scrollPercent } = this.canvas;
    const { radius, rings } = this.prop;
    const { x, y } = this.pos;
    const angle = this.ringAngle;

    // TODO: we also need to move the x,y radius to pass over the planet
    // if x is less than zero and then reset x to be abs(x) before we draw
    // to get it to flip to the other side we would draw intersection[2 and 3]?

    for (let i = 0; i < rings.length; ++i) {
      const ring = rings[i];

      // the ring ellipse flattens as the page scrolls
      const ringRadX = radius / 2 - 120 * scrollPercent + i;
      const ringRadY = radius + ring.offsetY;
      const intersection = ellipseCircleIntersection({
        eRadx: ringRadX,
        eRady: ringRadY,
        cRad: radius,
      });

      this.ctx.beginPath();
      this.ctx.ellipse(
        x,
        y,
        Math.abs(ringRadX),
        Math.abs(ringRadY),
        angle,
        intersection[0].theta ?? 0,
        intersection[1].theta ?? 0
      );
      this.ctx.strokeStyle = ring.color.toStringA(PLANET.RING.OPACITY);
      this.ctx.lineWidth = ring.lineWidth;
      this.ctx.stroke();
    }
  }
}

export { Planet };
