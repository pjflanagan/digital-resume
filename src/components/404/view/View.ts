import { BaseView } from 'src/elements';
import { Color, Point } from 'src/helpers';

const PARTICLE_COUNT = 20;

class View extends BaseView {
  bodies: Particle[] = [];

  constructor(canvasElem: HTMLCanvasElement) {
    super(canvasElem);
    this.resize();
    this.setup();
    this.start();
  }

  setup() {
    this.bodies = Array.from({ length: PARTICLE_COUNT }, () => new Particle(this));
  }

  drawFrame() {
    this.drawBackground();
    for (const body of this.bodies) {
      body.move();
      body.draw();
    }
    // spawn one particle per frame and drop the ones that left the screen
    this.bodies.push(new Particle(this));
    this.bodies = this.bodies.filter((b) => !b.isOutOfBounds());
  }
}

// TODO: point perspective animation of colors moving away from the center on the top and bottom

type ParticleState = {
  pos: Point;
  scale: number;
};

type ParticleProps = {
  speed: number;
  color: Color;
  to: Point;
  width: number;
  height: number;
};

class Particle {
  canvas: View;
  ctx: CanvasRenderingContext2D;
  state: ParticleState;
  props: ParticleProps;

  constructor(canvas: View) {
    this.canvas = canvas;
    this.ctx = canvas.ctx;

    const isUp = Math.random() > 0.5;
    const px = Math.random() * this.canvas.W;
    const color = new Color();

    this.state = {
      pos: {
        x: px,
        y: this.canvas.H / 2,
      },
      scale: 1,
    };
    this.props = {
      speed: 2,
      color: color.averageColor(new Color({ r: 31, g: 207, b: 204, a: 1 })),
      to: {
        x: 2 * px - this.canvas.W / 2,
        y: isUp ? 0 : this.canvas.H,
      },
      width: Math.random() * 10 + 8,
      height: Math.random() * 2 + 1,
    };
  }

  scale(property: number, max: number): number {
    const { H } = this.canvas;
    const {
      pos: { y },
    } = this.state;
    const scale = max * Math.abs(y - H / 2);
    return (property * scale) / (4 * H);
  }

  draw() {
    const {
      pos: { x, y },
    } = this.state;
    const { color, width, height } = this.props;

    const scaledWidth = this.scale(width, 72);

    this.ctx.beginPath();
    this.ctx.rect(x - scaledWidth / 2, y, scaledWidth, height);
    this.ctx.fillStyle = color.toStringA(0.3);
    this.ctx.fill();
  }

  move() {
    // scale as you move away to create z illusion
    const { to, speed } = this.props;
    const {
      pos: { x, y },
    } = this.state;

    const scaledSpeed = this.scale(speed, 14) + speed;

    const offsetAngle = Math.atan2(to.y - y, to.x - x);
    this.state.pos = {
      x: x + scaledSpeed * Math.cos(offsetAngle),
      y: y + scaledSpeed * Math.sin(offsetAngle),
    };
  }

  isOutOfBounds(): boolean {
    return this.state.pos.y < 0 || this.state.pos.y > this.canvas.H;
  }
}

export { View };
