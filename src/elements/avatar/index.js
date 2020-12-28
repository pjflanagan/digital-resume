import React from "react";
import Img from "gatsby-image";

import { FindImage } from "../../content";
import { Reveal } from "../reveal";

import Style from "./style.module.scss";

class Avatar extends Reveal {
  render() {
    const { data, image, name, background } = this.props;
    const className = this.state.isRevealed ? Style.reveal : "";
    const imageData = FindImage({ data, image });
    return (
      <div
        className={`${Style.avatarHolder} ${className}`}
        ref={this.ref}
      >
        <div 
          className={Style.avatarImageHolder}
          style={{ background: background }}
        >
          <Img
            fluid={imageData.childImageSharp.fluid}
            alt={name}
            className={Style.avatarImage}
          />
        </div>
        <div className={Style.avatarBack} />
      </div>
    );
  }
}

export { Avatar };
