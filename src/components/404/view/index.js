import { Color } from "src/helpers";

class View {
  constructor(canvasElem) {
    this.ctx = canvasElem.getContext("2d", { alpha: false });

    // sizing (window)
    this.W = window.innerWidth;
    this.H = window.innerHeight;
    this.C = {
      x: this.W / 2,
      y: this.H / 2,
    };
    canvasElem.width = this.W;
    canvasElem.height = this.H;

    this.animate = this.animate.bind(this);

    this.setup();
    this.start();
  }

  setup() {
    // add things to bodies in order from bottom to top
    this.space = new Space(this);
    this.bodies = [];
    for (var i = 0; i < 20; ++i) this.bodies.push(new Particle(this));
  }

  drawFrame() {
    this.space.drawBackground();
    for (let i = 0; i < this.bodies.length; ++i) {
      this.bodies[i].move();
      this.bodies[i].draw();
    }
    this.bodies.push(new Particle(this));
    // this.bodies.pop();
    this.bodies = this.bodies.filter((b) => !b.isOutOfBounds());
  }

  start() {
    this.animate();

  }

  animate() {
    this.drawFrame();
    this.animationReq = window.requestAnimationFrame(this.animate);
  }

  stop() {
    if (!!this.animationReq) {
      window.cancelAnimationFrame(this.animationReq);
    }
  }
}

// TODO: point perspective animation of colors moving away from the center on the top and bottom

class Space {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.ctx;
  }

  drawBackground() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.canvas.W, this.canvas.H);
    this.ctx.fillStyle = "#06191f";
    this.ctx.fill();
  }
}

// Particle

class Particle {
  constructor(canvas) {
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

  scale(property, max) {
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

  isOutOfBounds() {
    return this.state.pos.y < 0 || this.state.pos.y > this.canvas.H;
  }
}

export { View };
