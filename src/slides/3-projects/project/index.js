
import React from 'react'
import Img from "gatsby-image";

import { Reveal } from '../../../elements'
import { FindImage } from '../../../data'

class Project extends Reveal {
  render() {
    const { name, link, description, image, data } = this.props;
    const imageData = FindImage({ image, data });
    return (
      <div class="project" ref={this.ref}>
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={name}
          className="project-image"
        />
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

export { Project }