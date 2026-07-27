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

// Equal Earth projection (Šavrič et al. 2018), used to place a lat/lng crosshair
// on an Equal Earth world map image. Returns 0-1 fractions of the map's bounding
// box, x from west(0) to east(1), y from north(0) to south(1).
const EQUAL_EARTH_A1 = 1.340264;
const EQUAL_EARTH_A2 = -0.081106;
const EQUAL_EARTH_A3 = 0.000893;
const EQUAL_EARTH_A4 = 0.003796;
const EQUAL_EARTH_M = Math.sqrt(3) / 2;
// bounding extent of the projection, i.e. x(lat=0, lng=180) and y(lat=90)
const EQUAL_EARTH_X_MAX = 2.70681;
const EQUAL_EARTH_Y_MAX = 1.31756;

function equalEarthProject(lat: number, lng: number): Point {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const theta = Math.asin(EQUAL_EARTH_M * Math.sin(latRad));
  const theta2 = theta * theta;
  const theta6 = theta2 * theta2 * theta2;
  const theta8 = theta6 * theta2;

  const x =
    (2 * Math.sqrt(3) * lngRad * Math.cos(theta)) /
    (3 *
      (9 * EQUAL_EARTH_A4 * theta8 +
        7 * EQUAL_EARTH_A3 * theta6 +
        3 * EQUAL_EARTH_A2 * theta2 +
        EQUAL_EARTH_A1));
  const y =
    EQUAL_EARTH_A4 * theta8 * theta +
    EQUAL_EARTH_A3 * theta6 * theta +
    EQUAL_EARTH_A2 * theta2 * theta +
    EQUAL_EARTH_A1 * theta;

  return {
    x: 0.5 + x / (2 * EQUAL_EARTH_X_MAX),
    y: 0.5 - y / (2 * EQUAL_EARTH_Y_MAX),
  };
}

export { distance, ellipseCircleIntersection, equalEarthProject };
export type { Point };
