
import React from 'react'
import Img from "gatsby-image";

import { Reveal } from '../../../elements'
import { FindImage } from '../../../data'

class FeaturedProject extends Reveal {
  render() {
    const { name, link, description, image, data } = this.props;
    const imageData = FindImage({ data, image });
    return (
      <div className="project featured" ref={this.ref}>
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={name}
          className="project-image"
        />
        <div className="info">
          <a href={`//${link}`} target="_blank" rel="noreferrer">
            <h2 className="name">{ name }</h2>
            <span className="arrow"></span>
          </a>
          <p className="description">{ description }</p>
        </div>
      </div>
    )
  }
}

export { FeaturedProject }