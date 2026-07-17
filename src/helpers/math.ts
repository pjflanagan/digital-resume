// MATH --------------------------------------------------------------------------------------------

type Point = { x: number; y: number };

function distance(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

type EllipseCircleIntersectionProps = {
  eRadx: number;
  eRady: number;
  cRad: number;
};

type IntersectionPoint = Point & { phi: number; theta?: number };

function ellipseCircleIntersection({
  eRadx,
  eRady,
  cRad,
}: EllipseCircleIntersectionProps): IntersectionPoint[] {
  // https://www.analyzemath.com/EllipseProblems/ellipse_intersection.html
  const num = eRadx * eRadx - cRad * cRad;
  const denom = (eRadx * eRadx) / (eRady * eRady) - 1;
  const y = Math.sqrt(num / denom);
  const x = Math.sqrt(cRad * cRad - y * y);
  const values: IntersectionPoint[] = [
    { x, y, phi: Math.atan2(y, x) },
    { x: -x, y, phi: Math.atan2(y, -x) },
    { x, y: -y, phi: Math.atan2(-y, x) },
    { x: -x, y: -y, phi: Math.atan2(-y, -x) },
  ];
  // https://www.petercollingridge.co.uk/tutorials/computational-geometry/finding-angle-around-ellipse/
  values.forEach((v) => {
    v.theta = Math.atan((eRadx / eRady) * Math.tan(v.phi));
  });
  return values;
}

export { distance, ellipseCircleIntersection };
export type { Point };
