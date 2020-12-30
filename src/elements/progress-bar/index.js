import React from "react";
import PropTypes from "prop-types";

import { Reveal } from "../reveal";
import Style from "./style.module.scss";

class ProgressBar extends Reveal {
  render() {
    const { className, progress: progressProp, name } = this.props;
    const progress = this.state.isRevealed ? progressProp : 0;
    return (
      <div className={`${Style.bar} ${className}`} ref={this.ref}>
        <div className={Style.name}>
          {name}
          <span className={Style.line} style={{ width: `${progress / 6}%` }} />
        </div>
        <div className={Style.loader} style={{ width: `${progress}%` }}></div>
      </div>
    );
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export { ProgressBar };
