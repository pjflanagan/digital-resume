import { Point } from 'src/helpers';

import { Body, BodyProp } from './Body';
import { SCROLL_BACKPEDAL, SHIP_CENTER } from './constants';
import { TWO_PI } from './SpectrumBody';

const SHIP = {
  OFFSET: {
    SPEED: 0.3,
    MAX_RADIUS: 80,
  },
  COLORS: {
    EXHAUST_EDGE: '#1fcfcccc',
    EXHAUST_MIDDLE: '#1cbebc88',
    EXHAUST_PORT: '#555',
    FINS: '#777',
    WINDOWS: '#222',
    BODY: '#EEE',
    SHADOW: '#0004',
  },
  EXHAUST_LENGTH: 0.2, // proportional to the viewport width
};

type ShipProp = BodyProp & {
  exhaustLength: number;
};

class Ship extends Body<ShipProp> {
  protected createProp(): ShipProp {
    const { W, H } = this.canvas;
    return {
      center: {
        x: W * SHIP_CENTER.x,
        y: H * SHIP_CENTER.y,
      },
      offsetRadiusMax: SHIP.OFFSET.MAX_RADIUS,
      offsetSpeed: SHIP.OFFSET.SPEED,
      scrollShiftRate: 0, // unused: the ship has its own scroll behavior
      exhaustLength: SHIP.EXHAUST_LENGTH * W,
    };
  }

  // the ship backpedals a touch, then launches off to the left as you scroll
  protected getScrollShiftedCenter(): Point {
    const { scrollPercent, W } = this.canvas;
    return {
      x: Math.pow(scrollPercent - SCROLL_BACKPEDAL, 2) * -SHIP_CENTER.x * W * 4,
      y: scrollPercent * -200,
    };
  }

  draw() {
    this.drawExhaust();
    this.drawShip();
  }

  private drawExhaust() {
    const { pos } = this;
    const { scrollPercent, W, H } = this.canvas;
    const { exhaustLength } = this.prop;

    const lineLenX = -exhaustLength * (scrollPercent - SCROLL_BACKPEDAL) + exhaustLength;
    const inverseLenX = 2 * (exhaustLength - lineLenX);
    const exhaustEnd = Math.pow(scrollPercent, 2) * exhaustLength;
    const width = 5;
    const quadraticPointWidth = 5; // this can only be changed once the lineLen is 0

    const grd = this.ctx.createLinearGradient(0, 0, 0, H);
    grd.addColorStop(0, SHIP.COLORS.EXHAUST_EDGE);
    grd.addColorStop(0.5, SHIP.COLORS.EXHAUST_MIDDLE);
    grd.addColorStop(1, SHIP.COLORS.EXHAUST_EDGE);

    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y - width);
    this.ctx.lineTo(pos.x + lineLenX, pos.y - width);
    this.ctx.quadraticCurveTo(W - inverseLenX, pos.y - quadraticPointWidth, W - exhaustEnd, 0);
    this.ctx.lineTo(2 * W, 0);
    this.ctx.lineTo(2 * W, H);
    this.ctx.lineTo(W - exhaustEnd, H);
    this.ctx.quadraticCurveTo(
      W - inverseLenX,
      pos.y + quadraticPointWidth,
      pos.x + lineLenX,
      pos.y + width
    );
    this.ctx.lineTo(pos.x, pos.y + width);
    this.ctx.fillStyle = grd;
    this.ctx.fill();
  }

  private drawShip() {
    const { x, y } = this.pos;

    // exhaust port
    this.ctx.beginPath();
    this.ctx.moveTo(x + 35, y - 10);
    this.ctx.lineTo(x + 45, y - 5);
    this.ctx.lineTo(x + 45, y + 5);
    this.ctx.lineTo(x + 35, y + 10);
    this.ctx.fillStyle = SHIP.COLORS.EXHAUST_PORT;
    this.ctx.fill();

    // body
    this.ctx.beginPath();
    this.ctx.moveTo(x + 35, y - 10);
    this.ctx.quadraticCurveTo(x + 20, y - 30, x - 50, y);
    this.ctx.quadraticCurveTo(x + 20, y + 30, x + 35, y + 10);
    this.ctx.fillStyle = SHIP.COLORS.BODY;
    this.ctx.fill();

    // shadow
    this.ctx.beginPath();
    this.ctx.moveTo(x - 50, y);
    this.ctx.quadraticCurveTo(x + 20, y + 30, x + 35, y + 10);
    this.ctx.lineTo(x + 35, y - 10);
    this.ctx.quadraticCurveTo(x + 20, y + 24, x - 50, y);
    this.ctx.fillStyle = SHIP.COLORS.SHADOW;
    this.ctx.fill();

    // 3 windows
    this.ctx.beginPath();
    for (let i = 0; i < 3; ++i) {
      this.ctx.arc(x - 18 + i * 14, y, 4, 0, TWO_PI, false);
    }
    this.ctx.fillStyle = SHIP.COLORS.WINDOWS;
    this.ctx.fill();

    // fins
    this.ctx.beginPath();
    this.ctx.moveTo(x + 6, y - 14);
    this.ctx.lineTo(x + 30, y - 28);
    this.ctx.lineTo(x + 72, y - 30);
    this.ctx.lineTo(x + 34, y - 22);
    this.ctx.lineTo(x + 26, y - 10);
    this.ctx.quadraticCurveTo(x + 18, y - 14, x + 6, y - 14);
    this.ctx.moveTo(x + 6, y + 14);
    this.ctx.lineTo(x + 30, y + 28);
    this.ctx.lineTo(x + 72, y + 30);
    this.ctx.lineTo(x + 34, y + 22);
    this.ctx.lineTo(x + 26, y + 10);
    this.ctx.quadraticCurveTo(x + 18, y + 14, x + 6, y + 14);
    this.ctx.fillStyle = SHIP.COLORS.FINS;
    this.ctx.fill();
  }
}

export { Ship };
