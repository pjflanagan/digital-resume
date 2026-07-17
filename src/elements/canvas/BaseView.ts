import { Point } from 'src/helpers';

const BACKGROUND_COLOR = '#06191f';
const RESIZE_DEBOUNCE_MS = 250;

// shared canvas bootstrapping: sizing, the animation loop, resize handling,
// and teardown. Concrete views implement setup()/drawFrame() and must call
// this.resize(); this.setup(); this.start(); at the end of their constructor.
abstract class BaseView {
  canvasElem: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  W!: number;
  H!: number;
  C!: Point;
  private animationReq: number | undefined;
  private resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor(canvasElem: HTMLCanvasElement) {
    this.canvasElem = canvasElem;
    this.ctx = canvasElem.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;

    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize);
  }

  abstract setup(): void;
  abstract drawFrame(): void;

  resize() {
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.C = {
      x: this.W / 2,
      y: this.H / 2,
    };
    this.canvasElem.width = this.W;
    this.canvasElem.height = this.H;
  }

  // debounced: wait until the user is done resizing before rebuilding the scene
  // on touch devices, ignore height-only changes: mobile browsers fire resize
  // when the address bar shows/hides on scroll, which shouldn't rebuild the scene
  onResize() {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice && window.innerWidth === this.W) return;
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resize();
      this.setup();
    }, RESIZE_DEBOUNCE_MS);
  }

  drawBackground() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.W, this.H);
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fill();
  }

  start() {
    this.animate();
  }

  animate() {
    this.drawFrame();
    this.animationReq = window.requestAnimationFrame(this.animate);
  }

  stop() {
    if (this.animationReq) {
      window.cancelAnimationFrame(this.animationReq);
    }
  }

  destroy() {
    this.stop();
    clearTimeout(this.resizeTimeout);
    window.removeEventListener('resize', this.onResize);
  }
}

export { BaseView };
