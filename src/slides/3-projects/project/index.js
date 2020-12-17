import React from "react";
import Img from "gatsby-image";

import { FindImage } from "../../../data";

import Style from "./style.module.scss";

class Project extends React.Component {
  render() {
    const { data, project } = this.props;
    const { name, link, description, image } = project;
    const imageData = FindImage({ image, data });
    return (
      <div className={Style.project} ref={this.ref}>
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={name}
          className={Style.projectImage}
        />
        <div className={Style.info}>
          <a href={`//${link}`} target="_blank" rel="noreferrer">
            <h2 className={Style.name}>{name}</h2>
          </a>
          <p className={Style.description}>{description}</p>
        </div>
      </div>
    );
  }
}

export { Project };
