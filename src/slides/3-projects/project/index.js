
import React from 'react'
import Img from "gatsby-image";

import { Reveal } from '../../../elements'
import { FindImage } from '../../../data'

class Project extends Reveal {
  render() {
    const { name, link, description, image, data } = this.props;
    const imageData = FindImage({ image, data });
    return (
      <div className="project" ref={this.ref}>
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={name}
          classNameName="project-image"
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

export { Project }