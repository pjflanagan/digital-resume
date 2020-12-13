
import React from 'react'
import Img from "gatsby-image";

import { Reveal } from '../../../elements'
import { FindImage } from '../../../data'

import Style from './style.module.scss'

class FeaturedProject extends Reveal {
  render() {
    const { name, link, description, image, data } = this.props;
    const imageData = FindImage({ data, image });
    return (
      <div className={Style.featuredProject} ref={this.ref}>
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={name}
          className={Style.projectImage}
        />
        <div className={Style.info}>
          <a href={`//${link}`} target="_blank" rel="noreferrer">
            <h2 className={Style.name}>{ name }</h2>
            <span className={Style.arrow}></span>
          </a>
          <p className={Style.description}>{ description }</p>
        </div>
      </div>
    )
  }
}

export { FeaturedProject }