import { Color } from 'src/helpers';

import { Moon } from './Moon';
import { SpectrumBodyProp } from './SpectrumBody';

const PORTAL = {
  COLORS: 3,
  CORE: { r: 205, g: 255, b: 165, a: 0.95 },
  EDGE: { r: 40, g: 220, b: 60, a: 0.95 },
};

// a moon recolored to look like a green Rick and Morty portal
class Portal extends Moon {
  protected createProp(): SpectrumBodyProp {
    const prop = super.createProp();
    const core = new Color(PORTAL.CORE);
    const edge = new Color(PORTAL.EDGE);
    return { ...prop, colorSpectrum: core.makeSpectrum(edge, PORTAL.COLORS) };
  }
}

export { Portal };
