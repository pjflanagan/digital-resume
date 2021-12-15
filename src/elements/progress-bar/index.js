import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from 'classnames';

import { useReveal } from 'src/hooks';

import * as Style from "./style.module.scss";

const ProgressBar = ({
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
        <span className={Style.line} style={{ width: `${progress / 6}%` }} />
      </div>
      <div className={Style.loader} style={{ width: `${progress}%` }}></div>
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export { ProgressBar };
