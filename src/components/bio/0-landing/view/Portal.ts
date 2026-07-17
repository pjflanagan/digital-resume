import { Color, Random } from 'src/helpers';

import { SHIP_CENTER, SHIP_LAYER } from './constants';
import { SpectrumBody, SpectrumBodyProp } from './SpectrumBody';

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
};

// a green rick and morty style portal, drawn like a moon but at a fixed small size
class Portal extends SpectrumBody {
  protected createProp(): SpectrumBodyProp {
    const { shorterSide, W, H } = this.canvas;

    const radius = PORTAL.RADIUS * shorterSide;
    // foreground portals spawn clear of the ship
    const minX =
      this.layer > SHIP_LAYER ? SHIP_CENTER.x * W + radius * 3 : PORTAL.CENTER_X_MIN * W;

    const colorSpectrum = PORTAL.COLORS.map((rgb) => new Color({ ...rgb, a: 0.9 }));

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
}

export { Portal };
