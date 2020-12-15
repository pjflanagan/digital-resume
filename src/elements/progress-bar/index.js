import React from 'react'
import {Reveal} from '../reveal';
import Style from './style.module.scss'

class ProgressBar extends Reveal {
  render() {
    const { className } = this.props;
    const progress = (this.state.isRevealed) ? this.props.progress : 0;
    return (
      <div className={`${Style.bar} ${className}`} ref={this.ref}>
        <div className={Style.name}>
          { this.props.name }
          <span className={Style.line} style={{ width: `${progress/6}%` }}/>
        </div>
        <div className={Style.loader} style={{ width: `${progress}%` }}>
        </div>
      </div>
    )
  }
}

export { ProgressBar }