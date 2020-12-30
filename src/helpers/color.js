
import { Random } from './random';

// COLOR --------------------------------------------------------------------------------------------

class Color {
  constructor(color) {
    if (!!color) {
      const { r, g, b, a } = color;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    } else {
      this.random();
    }
  }

  random() {
    this.r = Random.int(0, 255);
    this.g = Random.int(0, 255);
    this.b = Random.int(0, 255);
    this.a = Random.dec(0, 1);
  }

  randomSimilar(distance) {
    const d1 = Random.dec(-1,1) * distance;
    const d2 = Random.dec(-1,1) * (distance - d1);
    const d3 = distance - (d1 + d2);
    const [ dr, dg, db ] = Random.shuffle([d1,d2,d3]);
    return new Color({
      r: this.r + dr,
      g: this.g + dg,
      b: this.b + db,
      a: this.a
    })
  }

  setOpacity(a) {
    this.a = a;
    return this;
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  toStringA(a) {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
  }

  averageColor(c2) {
    return new Color({
      r: (this.r + c2.r) / 2,
      g: (this.g + c2.g) / 2,
      b: (this.b + c2.b) / 2,
      a: (this.a + c2.a) / 2,
    });
  }

  makeSpectrum(c2, colorCount) {
    const colors = [this];
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