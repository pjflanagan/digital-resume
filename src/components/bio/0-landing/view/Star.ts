import { Color, Random } from 'src/helpers';

import { Body, BodyProp } from './Body';
import { TWO_PI } from './SpectrumBody';

const STAR = {
  RADIUS: { min: 0.0008, max: 0.002 }, // proportional to the viewport height
  OFFSET: {
    SPEED: 0.1,
    MAX_RADIUS: 20,
  },
  CENTER: {
    x: { min: -0.5, max: 1 },
    y: { min: 0.001, max: 0.999 },
  },
  SCROLL_SHIFT_RATE: 21,
};

type StarProp = BodyProp & {
  radius: number;
  color: Color;
};

class Star extends Body<StarProp> {
  protected createProp(): StarProp {
    const { W, H } = this.canvas;
    return {
      center: {
        x: Random.scaledProp(STAR.CENTER.x, W),
        y: Random.scaledProp(STAR.CENTER.y, H),
      },
      radius: Random.scaledProp(STAR.RADIUS, H),
      color: new Color(),
      offsetRadiusMax: STAR.OFFSET.MAX_RADIUS,
      offsetSpeed: STAR.OFFSET.SPEED,
      scrollShiftRate: STAR.SCROLL_SHIFT_RATE,
    };
  }

  draw() {
    const { radius, color } = this.prop;
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, radius, 0, TWO_PI, false);
    this.ctx.fillStyle = color.toString();
    this.ctx.fill();
  }
}

export { Star };
