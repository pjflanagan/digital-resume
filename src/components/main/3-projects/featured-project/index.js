import React from "react";
import Img from "gatsby-image";

import { Reveal, FrameHolder, Text, TextLinkedHeader, TextLittle } from "../../../../elements";
import { FindImage } from "../../../../content";

import Style from "./style.module.scss";

class FeaturedProject extends Reveal {
  render() {
    const {
      data,
      project: { name, link, description, image, tech },
    } = this.props;
    const className = this.state.isRevealed ? "" : Style.hidden;
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
          <TextLinkedHeader href={link}>{name}</TextLinkedHeader>
          <Text>{description}</Text>
          <div className={Style.techStackHolder}>
            {tech.map((item) => (
              <TextLittle key={item}>{item}</TextLittle>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export { FeaturedProject };
