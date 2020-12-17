import React from "react";
import Img from "gatsby-image";

import { Reveal, FrameHolder } from "../../../elements";
import { FindImage } from "../../../data";

import Style from "./style.module.scss";

class FeaturedProject extends Reveal {
  render() {
    const { data, project: { name, link, description, image, tech } } = this.props;
    const className = this.state.isRevealed ? '' : Style.hidden;
    const imageData = FindImage({ data, image });
    return (
      <div className={`${Style.featuredProject} ${className}`} ref={this.ref}>
        <FrameHolder className={Style.projectImageFrame}>
          <Img
            fluid={imageData.childImageSharp.fluid}
            alt={name}
            className={Style.projectImage}
          />
        </FrameHolder>
        <div className={Style.info}>
          <a href={`//${link}`} target="_blank" rel="noreferrer">
            <h2 className={Style.name}>
              {name}
              <span className={Style.arrow}></span>
            </h2>
          </a>
          <p className={Style.description}>{description}</p>
          <div className={Style.techStackHolder}>
            {tech.map((item) => (
              <span>{item}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export { FeaturedProject };
