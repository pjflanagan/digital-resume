import { BaseView } from 'src/elements';
import { distance, Point, Random, Range } from 'src/helpers';

import { Body } from './Body';
import { Moon } from './Moon';
import { Planet } from './Planet';
import { Ship } from './Ship';
import { Star } from './Star';
import {
  MOUSE_EASE,
  SCROLL_DEPTH,
  VIEW_BACKGROUND_MOONS,
  VIEW_FOREGROUND_MOONS,
  VIEW_STARS,
} from './constants';

type BodyConstructor = new (canvas: View, layer: number, id: number) => Body;

// bodies are drawn bottom to top; the array index is the parallax layer
// (keep the Ship at SHIP_LAYER — see constants.ts)
const LAYERS: { count: Range | number; body: BodyConstructor }[] = [
  { count: VIEW_STARS, body: Star },
  { count: VIEW_STARS, body: Star },
  { count: VIEW_BACKGROUND_MOONS, body: Moon },
  { count: VIEW_BACKGROUND_MOONS, body: Moon },
  { count: 1, body: Planet },
  { count: 1, body: Ship },
  { count: VIEW_FOREGROUND_MOONS, body: Moon },
  { count: VIEW_FOREGROUND_MOONS, body: Moon },
  { count: VIEW_STARS, body: Star },
];

class View extends BaseView {
  shorterSide = 0;
  diagonalHalf = 0;

  // user position
  angle = 0;
  strength = 0;
  scrollPercent = 0;

  // the real mouse position jumps the instant the cursor enters the window
  // (e.g. from off-screen at the edge), which would jolt angle/strength;
  // the virtual mouse eases toward it each frame instead
  mouseTarget: Point | null = null;
  virtualMouse: Point | null = null;

  // per-frame movement (offsets, spins, color drift) is written as "units per
  // frame" baselined at 60fps; frameScale rescales that by real elapsed time
  // so the animation runs at the same speed regardless of refresh rate
  frameScale = 1;
  private lastFrameTime: number | null = null;

  bodies: Body[] = [];

  constructor(canvasElem: HTMLCanvasElement) {
    super(canvasElem);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('scroll', this.onScroll);

    this.resize();
    this.setup();
    this.start();
  }

  resize() {
    super.resize();
    this.shorterSide = Math.min(this.W, this.H);
    this.diagonalHalf = distance({ x: 0, y: 0 }, { x: this.W, y: this.H }) / 2;
  }

  setup() {
    this.bodies = LAYERS.flatMap(({ count, body: BodyClass }, layer) => {
      const bodyCount = typeof count === 'number' ? count : Random.intProp(count);
      return Array.from({ length: bodyCount }, (_, i) => new BodyClass(this, layer, i));
    });
  }

  drawFrame() {
    this.updateFrameScale();
    this.updateVirtualMouse();
    this.drawBackground();
    for (const body of this.bodies) {
      body.move();
      body.draw();
    }
  }

  updateFrameScale() {
    const now = performance.now();
    // cap elapsed time so a backgrounded/throttled tab doesn't leap on return
    const dt = Math.min(this.lastFrameTime ? now - this.lastFrameTime : 1000 / 60, 100);
    this.lastFrameTime = now;
    this.frameScale = dt / (1000 / 60);
  }

  updateVirtualMouse() {
    if (!this.mouseTarget) return;

    // ease from wherever the virtual mouse already sits (defaults to center)
    // toward the real mouse, so a sudden jump in real position never jolts
    this.virtualMouse ??= { ...this.C };
    this.virtualMouse = {
      x: this.virtualMouse.x + (this.mouseTarget.x - this.virtualMouse.x) * MOUSE_EASE,
      y: this.virtualMouse.y + (this.mouseTarget.y - this.virtualMouse.y) * MOUSE_EASE,
    };

    this.angle = Math.atan2(this.virtualMouse.y - this.C.y, this.virtualMouse.x - this.C.x);
    this.strength = distance(this.C, this.virtualMouse) / this.diagonalHalf;
  }

  destroy() {
    super.destroy();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('scroll', this.onScroll);
  }

  onMouseMove(e: MouseEvent) {
    this.mouseTarget = { x: e.clientX, y: e.clientY };
  }

  onScroll() {
    this.scrollPercent = Math.min(window.scrollY / (this.H * SCROLL_DEPTH), 1);
  }
}

export { View };
