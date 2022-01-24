
import React, { useRef, useState, useEffect } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import { FrameHolder } from "src/elements";
import { FindImage } from "src/content";
import { useReveal } from 'src/hooks';

// TODO: import { BillCypher } from "./bill-cypher"; ?
import * as Style from "./style.module.scss";
import classNames from "classnames";

const Photo = ({ data, photo }) => {

  const ref = useRef(null);
  const isScrollRevealed = useReveal({ ref, gap: 280 });
  const [isRevealed, setIsRevealed] = useState(true);

  const className = classNames(Style.photoFrameHolder, {
    [Style.reveal]: isScrollRevealed && isRevealed,
  });
  const imageData = FindImage({ data, image: photo });

  useEffect(() => {
    // when the hover photo changes re-reveal
    setIsRevealed(false);
    setTimeout(() => {
      setIsRevealed(true);
    }, 10);
  }, [photo]);

  return (
    <div className={Style.personalPhoto} ref={ref}>
      <GatsbyImage
        image={imageData.childImageSharp.gatsbyImageData}
        alt={"Peter James Flanagan Headshot"}
        className={Style.image} />
      <FrameHolder className={className} />
    </div>
  );
}


export { Photo };
