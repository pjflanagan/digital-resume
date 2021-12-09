import React, { useRef } from "react";
import PropTypes from "prop-types";

import { useReveal } from 'src/hooks';

import * as Style from "./style.module.scss";

const ProgressBar = ({ className, progress: progressProp, name }) => {

  const ref = useRef(null);
  const isRevealed = useReveal({ ref, gap: 28, edge: 'bottom' });
  const progress = isRevealed ? progressProp : 0;

  return (
    <div className={`${Style.bar} ${className}`} ref={ref}>
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
