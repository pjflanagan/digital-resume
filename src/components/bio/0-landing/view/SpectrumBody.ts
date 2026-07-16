import { Color, Random } from 'src/helpers';

import { Body, BodyProp } from './Body';
import type { View } from './View';

const TWO_PI = 2 * Math.PI;

const COLOR = {
  ANGULAR_VELOCITY: { min: 0.001, max: 0.003 },
  RESIZE_FREQUENCY: { min: 0.1, max: 0.3 },
  DISTANCE_FROM_CENTER: { min: 1 / 4, max: 1 / 3 },
  OVERLAY_OPACITY_INSIDE: 0.2,
  OVERLAY_OPACITY_OUTSIDE: 0.8,
};

const TRAIL = {
  OPACITY_OUTSIDE: 0.08,
  OPACITY_INSIDE: 0.01,
  COLOR_STOP: 0.25,
};

type SpectrumBodyProp = BodyProp & {
  radius: number;
  colorSpectrum: Color[];
};

// a round body painted with a drifting color spectrum and a horizontal trail
// (planets and moons)
abstract class SpectrumBody<P extends SpectrumBodyProp = SpectrumBodyProp> extends Body<P> {
  protected colorProp: { angularVelocity: number; resizeFrequency: number };
  protected colorPos: { angle: number; distanceFromCenter: number; smallRadius: number };

  constructor(canvas: View, layer: number, id: number) {
    super(canvas, layer, id);

    const dir = Random.bool() ? 1 : -1;
    this.colorProp = {
      angularVelocity: dir * Random.decProp(COLOR.ANGULAR_VELOCITY),
      resizeFrequency: Random.decProp(COLOR.RESIZE_FREQUENCY),
    };
    // color is relative to the actual center
    this.colorPos = {
      angle: Random.dec(-Math.PI, Math.PI),
      distanceFromCenter: Random.scaledProp(COLOR.DISTANCE_FROM_CENTER, this.prop.radius),
      smallRadius: 0,
    };
  }

  move() {
    super.move();
    this.moveColors();
  }

  draw() {
    this.drawTrail();
    this.drawSpectrum();
  }

  protected moveColors() {
    const { radius } = this.prop;
    this.colorPos.angle += this.colorProp.angularVelocity * this.canvas.frameScale;
    const oscillationAngle = Math.PI * this.colorProp.resizeFrequency * this.colorPos.angle;
    const oscillation = 0.5 * Math.sin(oscillationAngle) + 1;
    const min = radius * COLOR.DISTANCE_FROM_CENTER.min;
    const max = radius * COLOR.DISTANCE_FROM_CENTER.max;
    this.colorPos.smallRadius = min + oscillation * max;
    this.colorPos.distanceFromCenter =
      radius * (1 - COLOR.DISTANCE_FROM_CENTER.min) - this.colorPos.smallRadius;
  }

  protected drawSpectrum() {
    const { colorSpectrum, radius } = this.prop;
    const { colorPos, pos } = this;
    const colorDelta = {
      x: colorPos.distanceFromCenter * Math.cos(colorPos.angle),
      y: colorPos.distanceFromCenter * Math.sin(colorPos.angle),
      r: radius - colorPos.smallRadius,
    };
    for (let i = 0; i < colorSpectrum.length; ++i) {
      this.ctx.beginPath();
      this.ctx.arc(
        pos.x - (colorDelta.x * i) / colorSpectrum.length,
        pos.y - (colorDelta.y * i) / colorSpectrum.length,
        radius - (colorDelta.r * i) / colorSpectrum.length,
        -Math.PI,
        Math.PI,
        false
      );
      this.ctx.fillStyle = colorSpectrum[i].toString();
      this.ctx.fill();
    }

    // overlay
    const grd = this.ctx.createRadialGradient(
      pos.x - colorDelta.x,
      pos.y - colorDelta.y,
      0,
      pos.x - colorDelta.x,
      pos.y - colorDelta.y,
      radius
    );
    const overlayColor = colorSpectrum[colorSpectrum.length - 1];
    grd.addColorStop(0, overlayColor.toStringA(COLOR.OVERLAY_OPACITY_INSIDE));
    grd.addColorStop(1, overlayColor.toStringA(COLOR.OVERLAY_OPACITY_OUTSIDE));
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, radius, 0, TWO_PI, false);
    this.ctx.fillStyle = grd;
    this.ctx.fill();
  }

  protected drawTrail() {
    const { radius, colorSpectrum } = this.prop;
    const { x, y } = this.pos;
    const grd = this.ctx.createLinearGradient(x, y - radius, x, y + radius);
    grd.addColorStop(0, colorSpectrum[0].toStringA(TRAIL.OPACITY_OUTSIDE));
    grd.addColorStop(TRAIL.COLOR_STOP, colorSpectrum[0].toStringA(TRAIL.OPACITY_INSIDE));
    grd.addColorStop(1 - TRAIL.COLOR_STOP, colorSpectrum[0].toStringA(TRAIL.OPACITY_INSIDE));
    grd.addColorStop(1, colorSpectrum[0].toStringA(TRAIL.OPACITY_OUTSIDE));
    this.ctx.beginPath();
    this.ctx.rect(x, y - radius, this.canvas.W * 2, 2 * radius);
    this.ctx.fillStyle = grd;
    this.ctx.fill();
  }
}

export { SpectrumBody, TWO_PI };
export type { SpectrumBodyProp };
