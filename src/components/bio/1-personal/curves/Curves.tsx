import { ReactComponent as CurveTopSvg } from './curve-top.svg';
import { ReactComponent as CurveBottomSvg } from './curve-bottom.svg';

import * as Style from './Curves.module.scss';

type CurveProps = {
  position: 'top' | 'bottom'
};

export function Curve({ position }: CurveProps) {
  if (position === 'top') {
    return <CurveTopSvg className={Style.topCurve} />;
  }
  return <CurveBottomSvg className={Style.bottomCurve} />;
}

