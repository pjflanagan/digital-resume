
import React from 'react'

import { Reveal } from '../../../../elements'

class FeaturedProject extends Reveal {
  render() {
    const { name, link, description, image } = this.props;
    return (
      <div class="project featured" ref={this.ref}>
        <div class="project-image"
          style={{ backgroundImage: `url(../../../../static/img/project/${image})` }}
        ></div>
        <div class="info">
          <a href={`//${link}`} target="_blank" rel="noreferrer">
            <h2 class="name">{ name }</h2>
            <span class="arrow"></span>
          </a>
          <p class="description">{ description }</p>
        </div>
      </div>
    )
  }
}

export { FeaturedProject }