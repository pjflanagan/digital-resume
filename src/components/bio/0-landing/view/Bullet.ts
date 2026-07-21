import { Point } from 'src/helpers';

import { BULLET_COLOR, BULLET_RADIUS, BULLET_SPEED } from './constants';
import type { View } from './View';

// small bullet fired from the ship's nose when the name in LandingBody is clicked
class Bullet {
  canvas: View;
  ctx: CanvasRenderingContext2D;
  pos: Point;

  constructor(canvas: View, origin: Point) {
    this.canvas = canvas;
    this.ctx = canvas.ctx;
    this.pos = { ...origin };
  }

  move() {
    this.pos = {
      x: this.pos.x - BULLET_SPEED * this.canvas.frameScale,
      y: this.pos.y,
    };
  }

  draw() {
    const side = BULLET_RADIUS * 2;
    this.ctx.fillStyle = BULLET_COLOR;
    this.ctx.fillRect(this.pos.x - BULLET_RADIUS, this.pos.y - BULLET_RADIUS, side, side);
  }

  isOffScreen() {
    return this.pos.x < -BULLET_RADIUS || this.pos.x > this.canvas.W + BULLET_RADIUS;
  }
}

export { Bullet };
