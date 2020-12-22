import React from "react";
import Img from "gatsby-image";
import { OutboundLink } from "gatsby-plugin-google-analytics"

import { Reveal, FrameHolder, Text } from "../../../elements";
import { FindImage } from "../../../data";

import { Arrow } from '../index.js';
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
          <OutboundLink href={`//${link}`} target="_blank" rel="noreferrer">
            <h2 className={Style.name}>
              {name}
              <Arrow />
            </h2>
          </OutboundLink>
          <Text>{description}</Text>
          <div className={Style.techStackHolder}>
            {tech.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export { FeaturedProject };
