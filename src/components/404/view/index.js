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
    // this.space = new Space(this);
    // this.bodies = [];
  }

  drawFrame() {
    // this.space.drawBackground();
    // for (let i = 0; i < this.bodies.length; ++i) {
    //   this.bodies[i].move();
    //   this.bodies[i].draw();
    // }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  animate() {
    // this.drawFrame();
    this.animationReq = window.requestAnimationFrame(this.animate);
  }

  stop() {
    if (!!this.animationReq) {
      window.cancelAnimationFrame(this.animationReq);
    }
    this.isRunning = false;
  }
}

// TODO: point perspective animation of colors moving away from the center on the top and bottom

export { View };
