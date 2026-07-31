import { Random } from 'src/helpers';

import { Body, BodyProp } from './Body';
import type { View } from './View';

const MONOLITH = {
  // Spawn position range from screen boundaries
  SPAWN_MARGIN: { min: 80, max: 120 },

  // Sizing and proportions (Space Odyssey 1:4:9 scale proportions)
  SCALE: { min: 3.5, factor: 0.007 },
  RATIOS: { w: 4, h: 9, d: 1 },

  // Movement offset parameters
  OFFSET: {
    MAX_RADIUS: 15,
    SPEED: 0.08,
  },

  // Parallax scroll speed rate
  SCROLL_SHIFT_RATE: 8,

  // Scroll rotation coefficients for each axis (how much to rotate at 100% scroll)
  SCROLL_ROTATION: {
    X: Math.PI * 0.3,
    Y: Math.PI * 0.6,
    Z: Math.PI * 0.3,
  },

  // Passive rotation speeds over time per frame
  SPIN_SPEED: {
    X: 0.0005,
    Y: 0.0012,
    Z: 0.0003,
  },

  // 3D rendering parameters
  FOCAL_LENGTH: 300,
  LIGHT: { x: -0.5, y: -0.8, z: -1.0 },

  // Rendering colors and shading
  SHADING: {
    AMBIENT: 0.05,
    DIFFUSE: 0.45,
    BASE_GREY: 5,
    GREY_RANGE: 60,
  },
  STROKE: {
    COLOR: '100, 100, 100',
    BASE_OPACITY: 0.05,
    OPACITY_FACTOR: 0.2,
    WIDTH: 1,
  },
};

type MonolithProp = BodyProp & {
  w: number;
  h: number;
  d: number;
};

class Monolith extends Body<MonolithProp> {
  private spinAngleX: number;
  private spinAngleY: number;
  private spinAngleZ: number;

  constructor(canvas: View, layer: number, id: number) {
    super(canvas, layer, id);

    // Initial random rotation angles
    this.spinAngleX = Random.dec(-Math.PI, Math.PI);
    this.spinAngleY = Random.dec(-Math.PI, Math.PI);
    this.spinAngleZ = Random.dec(-Math.PI, Math.PI);
  }

  protected createProp(): MonolithProp {
    const { H, shorterSide } = this.canvas;

    // Pick top-left or bottom-left corner
    const isTop = Random.bool();
    const cx = Random.int(MONOLITH.SPAWN_MARGIN.min, MONOLITH.SPAWN_MARGIN.max);
    const cy = isTop
      ? Random.int(MONOLITH.SPAWN_MARGIN.min, MONOLITH.SPAWN_MARGIN.max)
      : H - Random.int(MONOLITH.SPAWN_MARGIN.min, MONOLITH.SPAWN_MARGIN.max);

    // 1:4:9 scale (Space Odyssey Monolith proportions)
    const scale = Math.max(MONOLITH.SCALE.min, shorterSide * MONOLITH.SCALE.factor);
    const w = MONOLITH.RATIOS.w * scale;  // width along X
    const h = MONOLITH.RATIOS.h * scale;  // height along Y
    const d = MONOLITH.RATIOS.d * scale;  // depth along Z

    return {
      center: { x: cx, y: cy },
      w,
      h,
      d,
      offsetRadiusMax: MONOLITH.OFFSET.MAX_RADIUS,
      offsetSpeed: MONOLITH.OFFSET.SPEED,
      scrollShiftRate: MONOLITH.SCROLL_SHIFT_RATE,
    };
  }

  move() {
    super.move();

    // Rotate the monolith over time
    const speedScale = this.canvas.frameScale;
    this.spinAngleX += MONOLITH.SPIN_SPEED.X * speedScale;
    this.spinAngleY += MONOLITH.SPIN_SPEED.Y * speedScale;
    this.spinAngleZ += MONOLITH.SPIN_SPEED.Z * speedScale;
  }

  private rotate3D(x: number, y: number, z: number, rx: number, ry: number, rz: number) {
    // Rotate around X-axis
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;
    const x1 = x;

    // Rotate around Y-axis
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const x2 = x1 * cosY + z1 * sinY;
    const z2 = -x1 * sinY + z1 * cosY;
    const y2 = y1;

    // Rotate around Z-axis
    const cosZ = Math.cos(rz);
    const sinZ = Math.sin(rz);
    const x3 = x2 * cosZ - y2 * sinZ;
    const y3 = x2 * sinZ + y2 * cosZ;
    const z3 = z2;

    return { x: x3, y: y3, z: z3 };
  }

  draw() {
    const { w, h, d } = this.prop;
    const { x, y } = this.pos;
    const { scrollPercent } = this.canvas;

    // Define 8 vertices for the cuboid centered at (0, 0, 0)
    const halfW = w / 2;
    const halfH = h / 2;
    const halfD = d / 2;

    const vertices = [
      { x: -halfW, y: -halfH, z: -halfD }, // 0: front-top-left
      { x:  halfW, y: -halfH, z: -halfD }, // 1: front-top-right
      { x:  halfW, y:  halfH, z: -halfD }, // 2: front-bottom-right
      { x: -halfW, y:  halfH, z: -halfD }, // 3: front-bottom-left
      { x: -halfW, y: -halfH, z:  halfD }, // 4: back-top-left
      { x:  halfW, y: -halfH, z:  halfD }, // 5: back-top-right
      { x:  halfW, y:  halfH, z:  halfD }, // 6: back-bottom-right
      { x: -halfW, y:  halfH, z:  halfD }, // 7: back-bottom-left
    ];

    // Calculate actual rotation angles including scroll-based rotation
    const rx = this.spinAngleX + MONOLITH.SCROLL_ROTATION.X * scrollPercent;
    const ry = this.spinAngleY + MONOLITH.SCROLL_ROTATION.Y * scrollPercent;
    const rz = this.spinAngleZ + MONOLITH.SCROLL_ROTATION.Z * scrollPercent;

    // Apply 3D rotations
    const rotated = vertices.map((v) =>
      this.rotate3D(v.x, v.y, v.z, rx, ry, rz)
    );

    // Project 3D vertices to 2D screen coordinates using perspective projection
    const focalLength = MONOLITH.FOCAL_LENGTH;
    const projected = rotated.map((v) => {
      const scale = focalLength / (focalLength + v.z);
      return {
        x: x + v.x * scale,
        y: y + v.y * scale,
      };
    });

    // Define the 6 faces with clockwise/counter-clockwise winding that matches outward normals
    const faces = [
      { indices: [0, 3, 2, 1], name: 'front' },
      { indices: [5, 6, 7, 4], name: 'back' },
      { indices: [4, 0, 1, 5], name: 'top' },
      { indices: [3, 7, 6, 2], name: 'bottom' },
      { indices: [4, 7, 3, 0], name: 'left' },
      { indices: [1, 2, 6, 5], name: 'right' },
    ];

    // Calculate face depth (for sorting) and face normal (for lighting)
    const facesWithDepth = faces.map((face) => {
      const { indices } = face;
      const v0 = rotated[indices[0]];
      const v1 = rotated[indices[1]];
      const v2 = rotated[indices[2]];

      // Average Z depth of face vertices
      const avgZ = (v0.z + rotated[indices[1]].z + rotated[indices[2]].z + rotated[indices[3]].z) / 4;

      // Vectors A->B and B->C on the face
      const ab = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z };
      const bc = { x: v2.x - v1.x, y: v2.y - v1.y, z: v2.z - v1.z };

      // Normal vector via cross product
      const normal = {
        x: ab.y * bc.z - ab.z * bc.y,
        y: ab.z * bc.x - ab.x * bc.z,
        z: ab.x * bc.y - ab.y * bc.x,
      };

      // Normalize the normal vector
      const len = Math.sqrt(normal.x * normal.x + normal.y * normal.y + normal.z * normal.z);
      if (len > 0) {
        normal.x /= len;
        normal.y /= len;
        normal.z /= len;
      }

      return {
        indices,
        avgZ,
        normal,
      };
    });

    // Sort faces from back to front (painter's algorithm)
    facesWithDepth.sort((a, b) => b.avgZ - a.avgZ);

    // Directional light source (normalized)
    const light = MONOLITH.LIGHT;
    const lLen = Math.sqrt(light.x * light.x + light.y * light.y + light.z * light.z);
    const L = { x: light.x / lLen, y: light.y / lLen, z: light.z / lLen };

    // Draw the sorted faces
    for (const face of facesWithDepth) {
      const { indices, normal } = face;

      // Compute shading intensity (ambient + diffuse dot product)
      const dot = normal.x * L.x + normal.y * L.y + normal.z * L.z;
      const ambient = MONOLITH.SHADING.AMBIENT;
      const diffuse = MONOLITH.SHADING.DIFFUSE * Math.max(0, dot);
      const factor = ambient + diffuse;

      // Black and grey colors
      const grey = Math.floor(MONOLITH.SHADING.BASE_GREY + factor * MONOLITH.SHADING.GREY_RANGE);
      const fillColor = `rgb(${grey}, ${grey}, ${grey})`;

      this.ctx.beginPath();
      this.ctx.moveTo(projected[indices[0]].x, projected[indices[0]].y);
      for (let i = 1; i < indices.length; ++i) {
        this.ctx.lineTo(projected[indices[i]].x, projected[indices[i]].y);
      }
      this.ctx.closePath();

      // Fill face
      this.ctx.fillStyle = fillColor;
      this.ctx.fill();

      // Stroke face outline for subtle 3D definition
      this.ctx.strokeStyle = `rgba(${MONOLITH.STROKE.COLOR}, ${MONOLITH.STROKE.BASE_OPACITY + factor * MONOLITH.STROKE.OPACITY_FACTOR})`;
      this.ctx.lineWidth = MONOLITH.STROKE.WIDTH;
      this.ctx.stroke();
    }
  }
}

export { Monolith };
