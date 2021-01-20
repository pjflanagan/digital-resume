import React from "react";
import Img from "gatsby-image";

import { Text, TextLinkedHeader } from "../../../../elements";
import { FindImage } from "../../../../content";

import Style from "./style.module.scss";

class Project extends React.Component {
  render() {
    const {
      data,
      project: { name, link, description, image },
    } = this.props;
    const imageData = FindImage({ image, data });
    return (
      <div className={Style.project} ref={this.ref}>
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={name}
          className={Style.projectImage}
        />
        <div className={Style.info}>
          <TextLinkedHeader href={link}>{name}</TextLinkedHeader>
          <Text>{description}</Text>
        </div>
      </div>
    );
  }
}

export { Project };
