
import React, { useRef, useState, useEffect } from "react";
import Img from "gatsby-image";

import { FrameHolder } from "src/elements";
import { FindImage } from "src/content";
import { useReveal } from 'src/hooks';

// TODO: import { BillCypher } from "./bill-cypher"; ?
import * as Style from "./style.module.scss";

const Photo = ({ data, photo }) => {

  const ref = useRef(null);
  const isScrollRevealed = useReveal({ ref, gap: 280, edge: 'top' });
  const [isRevealed, setIsRevealed] = useState(true);

  const className = isScrollRevealed && isRevealed ? Style.reveal : "";
  const imageData = FindImage({ data, image: photo });

  useEffect(() => {
    // when the hover photo changes re-reveal
    setIsRevealed(false);
    setTimeout(() => {
      setIsRevealed(true);
    }, 10);
  }, [photo])

  return (
    <div className={Style.personalPhoto} ref={ref}>
      <Img
        fluid={imageData.childImageSharp.fluid}
        alt={"Peter James Flanagan Headshot"}
        className={Style.image}
      />
      <FrameHolder className={`${Style.photoFrameHolder} ${className}`} />
    </div>
  );
}


export { Photo };
