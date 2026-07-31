import { Random } from 'src/helpers';

import { Body, BodyProp } from './Body';
import type { View } from './View';

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
    const cx = Random.int(80, 120);
    const cy = isTop ? Random.int(80, 120) : H - Random.int(80, 120);

    // 1:4:9 scale (Space Odyssey Monolith proportions)
    const scale = Math.max(3.5, shorterSide * 0.007);
    const w = 4 * scale;  // width along X
    const h = 9 * scale;  // height along Y
    const d = 1 * scale;  // depth along Z

    return {
      center: { x: cx, y: cy },
      w,
      h,
      d,
      offsetRadiusMax: 15,
      offsetSpeed: 0.08,
      scrollShiftRate: 8,
    };
  }

  move() {
    super.move();

    // Rotate the monolith over time
    const speedScale = this.canvas.frameScale;
    this.spinAngleX += 0.0005 * speedScale;
    this.spinAngleY += 0.0012 * speedScale;
    this.spinAngleZ += 0.0003 * speedScale;
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

    // Apply 3D rotations
    const rotated = vertices.map((v) =>
      this.rotate3D(v.x, v.y, v.z, this.spinAngleX, this.spinAngleY, this.spinAngleZ)
    );

    // Project 3D vertices to 2D screen coordinates using perspective projection
    const focalLength = 300;
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
    const light = { x: -0.5, y: -0.8, z: -1.0 };
    const lLen = Math.sqrt(light.x * light.x + light.y * light.y + light.z * light.z);
    const L = { x: light.x / lLen, y: light.y / lLen, z: light.z / lLen };

    // Draw the sorted faces
    for (const face of facesWithDepth) {
      const { indices, normal } = face;

      // Compute shading intensity (ambient + diffuse dot product)
      const dot = normal.x * L.x + normal.y * L.y + normal.z * L.z;
      const ambient = 0.05;
      const diffuse = 0.45 * Math.max(0, dot);
      const factor = ambient + diffuse;

      // Black and grey colors
      const grey = Math.floor(5 + factor * 60);
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
      this.ctx.strokeStyle = `rgba(100, 100, 100, ${0.05 + factor * 0.2})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
  }
}

export { Monolith };
