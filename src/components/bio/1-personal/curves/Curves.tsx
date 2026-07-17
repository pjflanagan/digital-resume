import * as Style from './Curves.module.scss';

// Each curve is a single lens-shaped path straddling the slide boundary:
// the upper and lower edges are the same curve one band apart, so the
// dark band renders as one element with no seam at the boundary.
function CurveTop() {
  return (
    <svg
      className={Style.topCurve}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
      M 0 0
      C 20 10, 80 10, 100 0
      L 100 10
      C 80 20, 20 20, 0 10
      Z
      "
      />
    </svg>
  );
}

function CurveBottom() {
  return (
    <svg
      className={Style.bottomCurve}
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
      M 0 10
      C 20 0, 80 0, 100 10
      L 100 20
      C 80 10, 20 10, 0 20
      Z
      "
      />
    </svg>
  );
}

export { CurveTop, CurveBottom };
