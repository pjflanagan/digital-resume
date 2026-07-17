import { Random } from './random';

// COLOR --------------------------------------------------------------------------------------------

type ColorValues = {
  r: number;
  g: number;
  b: number;
  a: number;
};

class Color {
  r: number;
  g: number;
  b: number;
  a: number;

  // defaults to a random color
  constructor(color?: ColorValues) {
    const { r, g, b, a } = color ?? Color.randomValues();
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  private static randomValues(): ColorValues {
    return {
      r: Random.int(0, 255),
      g: Random.int(0, 255),
      b: Random.int(0, 255),
      a: Random.dec(0, 1),
    };
  }

  // a random color whose hue falls outside [excludeMinHue, excludeMaxHue] (degrees, 0-360)
  static randomExcludingHue(excludeMinHue: number, excludeMaxHue: number): Color {
    const excludedSpan = excludeMaxHue - excludeMinHue;
    let hue = Random.dec(0, 360 - excludedSpan);
    if (hue >= excludeMinHue) hue += excludedSpan;

    const { r, g, b } = Color.hslToRgb(hue, Random.dec(0.4, 1), Random.dec(0.3, 0.7));
    return new Color({ r, g, b, a: Random.dec(0, 1) });
  }

  private static hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    const [rp, gp, bp] =
      h < 60
        ? [c, x, 0]
        : h < 120
          ? [x, c, 0]
          : h < 180
            ? [0, c, x]
            : h < 240
              ? [0, x, c]
              : h < 300
                ? [x, 0, c]
                : [c, 0, x];

    return {
      r: Math.round((rp + m) * 255),
      g: Math.round((gp + m) * 255),
      b: Math.round((bp + m) * 255),
    };
  }

  setOpacity(a: number): Color {
    this.a = a;
    return this;
  }

  toString(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  toStringA(a: number): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
  }

  averageColor(c2: Color): Color {
    return new Color({
      r: (this.r + c2.r) / 2,
      g: (this.g + c2.g) / 2,
      b: (this.b + c2.b) / 2,
      a: (this.a + c2.a) / 2,
    });
  }

  makeSpectrum(c2: Color, colorCount: number): Color[] {
    const colors: Color[] = [this];
    const delta = {
      r: c2.r - this.r,
      g: c2.g - this.g,
      b: c2.b - this.b,
      a: c2.a - this.a,
    };
    for (let i = 1; i <= colorCount; ++i) {
      colors.push(
        new Color({
          r: this.r + (delta.r * i) / colorCount,
          g: this.g + (delta.g * i) / colorCount,
          b: this.b + (delta.b * i) / colorCount,
          a: this.a + (delta.a * i) / colorCount,
        })
      );
    }
    return colors;
  }
}

export { Color };
