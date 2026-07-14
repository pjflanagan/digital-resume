import { distance, Point, Random } from 'src/helpers';

import { SCROLL_BACKPEDAL } from './constants';
import type { View } from './View';

const LAYER_STRENGTH_VARIANCE = { min: 0.9, max: 1.1 };
const OFFSET_REACHED_DISTANCE = 4;

type BodyProp = {
  center: Point;
  offsetRadiusMax: number;
  offsetSpeed: number;
  scrollShiftRate: number;
};

// base class for everything drawn in the landing scene: drifts around its
// center and shifts with the mouse and scroll based on its parallax layer
abstract class Body<P extends BodyProp = BodyProp> {
  canvas: View;
  ctx: CanvasRenderingContext2D;
  id: string;
  layer: number;
  layerStrength: number;
  prop: P;
  pos: Point;
  protected offset: { x: number; y: number; to: Point };

  constructor(canvas: View, layer: number, id: number) {
    this.canvas = canvas;
    this.ctx = canvas.ctx;
    this.id = `${layer}-${id}`;
    this.layer = layer;

    this.prop = this.createProp();
    // deeper layers move less with the mouse/scroll than closer ones
    this.layerStrength = Random.decProp(LAYER_STRENGTH_VARIANCE) * (18 / (0.1 * layer + 0.8) + 4);

    this.pos = { ...this.prop.center };
    this.offset = { x: 0, y: 0, to: { x: 0, y: 0 } };
    this.setOffsetTo();
  }

  protected abstract createProp(): P;
  abstract draw(): void;

  move() {
    const mouseShift = this.getMouseShiftedCenter();
    const scrollShift = this.getScrollShiftedCenter();
    this.moveBody({
      x: mouseShift.x + scrollShift.x,
      y: mouseShift.y + scrollShift.y,
    });
  }

  protected setOffsetTo() {
    const angle = Random.dec(-Math.PI, Math.PI);
    const radius = Random.dec(0, this.prop.offsetRadiusMax);
    this.offset.to = {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  }

  protected hasReachedOffset() {
    return distance(this.offset, this.offset.to) < OFFSET_REACHED_DISTANCE;
  }

  protected getMouseShiftedCenter(): Point {
    const { angle, strength } = this.canvas;
    const { center } = this.prop;
    return {
      x: center.x + this.layerStrength * strength * Math.cos(angle),
      y: center.y + this.layerStrength * strength * Math.sin(angle),
    };
  }

  protected getScrollShiftedCenter(): Point {
    const { scrollPercent } = this.canvas;
    const { scrollShiftRate } = this.prop;
    const deltaPercent = scrollPercent - SCROLL_BACKPEDAL;
    return {
      x: deltaPercent > 0 ? deltaPercent * this.layerStrength * scrollShiftRate : 0,
      y: 0,
    };
  }

  protected moveBody(shift: Point) {
    // move to a point at a random radius and angle from center
    if (this.hasReachedOffset()) {
      this.setOffsetTo();
    }

    const { x, y, to } = this.offset;
    const offsetAngle = Math.atan2(to.y - y, to.x - x);
    this.offset.x = x + this.prop.offsetSpeed * Math.cos(offsetAngle);
    this.offset.y = y + this.prop.offsetSpeed * Math.sin(offsetAngle);

    this.pos = {
      x: shift.x + this.offset.x,
      y: shift.y + this.offset.y,
    };
  }
}

export { Body };
export type { BodyProp };
