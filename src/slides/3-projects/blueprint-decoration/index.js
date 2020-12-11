
import React from 'react'
import { Reveal } from '../../../elements'
import './style.scss'

class BlueprintDecoration extends Reveal {
  render() {
    const { num, invention } = this.props;
    const className = this.state.isRevealed ? '' : 'hidden';
    return (
      <div ref={this.ref} className={`slide-projects-decoration blueprint decoration-${num} ${className}`}>{invention}</div>
    )
  }
}

export { BlueprintDecoration }