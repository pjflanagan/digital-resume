import React, { FC, useRef } from "react";
import classNames from 'classnames';

import { useReveal } from 'hooks';

import * as Style from "./style.module.scss";

type ProgressBarProps = {
  className: string;
  progress: number;
  name: string;
}

const ProgressBar: FC<ProgressBarProps> = ({
  className: classNameProp,
  progress: progressProp,
  name
}) => {

  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 28, edge: 'bottom' });
  const progress = isRevealed ? progressProp : 0;

  const className = classNames(Style.bar, {
    [classNameProp]: classNameProp
  });

  return (
    <div className={className} ref={ref}>
      <div className={Style.name}>
        {name}
        <span
          className={Style.line}
          style={{ width: `${progress / 6}%` }}
        />
      </div>
      <div
        className={Style.loader}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export { ProgressBar };
