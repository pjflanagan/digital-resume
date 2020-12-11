import React from 'react'
import {Reveal} from '../reveal';
import './style.scss'

class ProgressBar extends Reveal {
  render() {
    const { isRevealed } = this.state;
    const progress = (isRevealed) ? this.props.progress : 0
    return (
      <div className="bar" ref={this.ref}>
        <div className="name">{ this.props.name }</div>
        <div className="loader" style={{ width: `${progress}%` }}></div>
      </div>
    )
  }
}

export { ProgressBar }