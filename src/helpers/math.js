

// MATH --------------------------------------------------------------------------------------------


const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));


// TODO: use these
// class LinearFormula {
//   constructor(min, max) {
//     this.m = (max.y - min.y) / (max.x - min.x);
//     this.b = min.y - (slope * min.x);
//   }

//   calc(x) {
//     return this.m * x + this.b;
//   }
// }

// class QuadraticFormula {
//   constructor(point, vertex) {
//     this.vertex = vertex;
//     this.a = point.y - vertex.y / Math.pow(point.x-vertex.x, 2)
//   }

//   calc(x) {
//     const { a, vertex } = this;
//     return a * Math.pow((x-vertex.x), 2) + vertex.y;
//   }
// }

const ellipseCircleIntersection = ({ eRadx, eRady, cRad }) => {
  // https://www.analyzemath.com/EllipseProblems/ellipse_intersection.html
  const num = (eRadx * eRadx) - (cRad * cRad);
  const denom = ((eRadx * eRadx) / (eRady * eRady)) - 1;
  const y = Math.sqrt(num/denom);
  const x = Math.sqrt(cRad * cRad - y * y);
  const values = [
    { x, y, phi: Math.atan2(y , x) },
    { x: -x, y, phi: Math.atan2(y , -x) },
    { x, y: -y, phi: Math.atan2(-y , x) },
    { x: -x, y: -y, phi: Math.atan2(-y , -x) }
  ];
  // https://www.petercollingridge.co.uk/tutorials/computational-geometry/finding-angle-around-ellipse/
  values.forEach(v => {
    v.theta = Math.atan(eRadx/eRady * Math.tan(v.phi))
  });
  return values;
}

export { distance, ellipseCircleIntersection };