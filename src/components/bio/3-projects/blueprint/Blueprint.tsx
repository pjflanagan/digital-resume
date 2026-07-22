import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';

import * as Style from './Blueprint.module.scss';

type BlueprintName =
  | 'tree-of-life'
  | 'golden-record';
  // | 'arc-reactor'
  // | 'dummy-plug'
  // | 'bender';

type BlueprintProps = {
  name: BlueprintName;
  className?: string;
  style?: CSSProperties;
};

// A large transparent decorative svg meant to bleed off the edge of a
// section's background, e.g. the projects blueprint slide. Rendered via
// CSS mask (rather than <img>) so its color can be set from CSS/theme.
// Size and position are left to the caller's style/className.
function Blueprint({ name, className, style }: BlueprintProps): ReactNode {
  const mergedStyle = {
    '--blueprint-src': `url(/img/blueprints/${name}.svg)`,
    ...style,
  } as CSSProperties;

  return <div className={clsx(Style.blueprint, className)} style={mergedStyle} />;
}

export { Blueprint };
export type { BlueprintName };
