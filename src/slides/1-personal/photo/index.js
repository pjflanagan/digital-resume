import React from "react";
import Img from "gatsby-image";

import { FrameHolder, Reveal } from "../../../elements";
import { FindImage } from '../../../data';

// import { BillCypher } from "./bill-cypher";
import Style from "./style.module.scss";

class Photo extends Reveal {
  render() {
    const { data } = this.props;
    const className = this.state.isRevealed ? Style.reveal : '';
    const imageData = FindImage({ data, image:'personal-photo.jpg' });
    return (
      <div className={Style.personalPhoto} ref={this.ref}>
        <Img
          fluid={imageData.childImageSharp.fluid}
          alt={'Peter James Flanagan Headshot'}
          className={Style.image}
        />
        {/* <BillCypher /> */}
        <FrameHolder className={`${Style.photoFrameHolder} ${className}`} />
      </div>
    );
  }
}

export { Photo };