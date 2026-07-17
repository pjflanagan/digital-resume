import { Color, Random } from 'src/helpers';

import { SHIP_CENTER, SHIP_LAYER } from './constants';
import { SpectrumBody, SpectrumBodyProp } from './SpectrumBody';

const MOON = {
  RADIUS: { min: 0.02, max: 0.06 }, // proportional to the shorter viewport side
  COLORS: 3,
  // green is reserved for the portal, so moons are always blue/yellow/purple/orange/red
  EXCLUDE_HUE: { min: 70, max: 170 },
  OFFSET: {
    SPEED: 0.1,
    MAX_RADIUS: 40,
  },
  CENTER_X_MIN: -0.25, // proportional to the viewport width
  SCROLL_SHIFT_RATE: 14,
};

// never green, since that's reserved for the portal
function nonGreenColor(): Color {
  return Color.randomExcludingHue(MOON.EXCLUDE_HUE.min, MOON.EXCLUDE_HUE.max);
}

class Moon extends SpectrumBody {
  protected createProp(): SpectrumBodyProp {
    const { shorterSide, W, H } = this.canvas;
    const color = nonGreenColor().setOpacity(0.9);
    const toColor = nonGreenColor().setOpacity(0.9);

    const radius = Random.scaledProp(MOON.RADIUS, shorterSide);
    // foreground moons spawn clear of the ship
    const minX = this.layer > SHIP_LAYER ? SHIP_CENTER.x * W + radius * 3 : MOON.CENTER_X_MIN * W;

    const colorSpectrum = color.makeSpectrum(toColor, MOON.COLORS);
    Random.insertRandom(colorSpectrum, nonGreenColor().setOpacity(0.7));

    return {
      center: {
        x: Random.int(minX, W - radius * 2),
        y: Random.int(0, H),
      },
      radius,
      colorSpectrum,
      offsetRadiusMax: MOON.OFFSET.MAX_RADIUS,
      offsetSpeed: MOON.OFFSET.SPEED,
      scrollShiftRate: MOON.SCROLL_SHIFT_RATE,
    };
  }
}

export { Moon };
