import { useRef, useState, useEffect } from "react";
import { GatsbyImage } from "gatsby-plugin-image";

import { FrameHolder } from "src/elements";
import { FindImage } from "src/content";
import type { ImageQueryData } from "src/content";
import { useReveal } from 'src/hooks';

// TODO: import { BillCypher } from "./bill-cypher"; ?
import * as Style from "./Photo.module.scss";
import clsx from "clsx";

type PhotoProps = {
  data: ImageQueryData;
  photo: string;
};

const Photo = ({ data, photo }: PhotoProps) => {

  const ref = useRef<HTMLDivElement>(null);
  const isScrollRevealed = useReveal({ ref, gap: 280 });
  const [isRevealed, setIsRevealed] = useState(true);

  const className = clsx(Style.photoFrameHolder, {
    [Style.reveal]: isScrollRevealed && isRevealed,
  });
  const imageData = FindImage({ data, image: photo });

  /* eslint-disable react-hooks/set-state-in-effect -- intentional: re-triggers the reveal animation */
  useEffect(() => {
    // when the hover photo changes re-reveal
    setIsRevealed(false);
    setTimeout(() => {
      setIsRevealed(true);
    }, 10);
  }, [photo]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div className={Style.personalPhoto} ref={ref}>
      {imageData && (
        <GatsbyImage
          image={imageData.childImageSharp.gatsbyImageData}
          alt={"Peter James Flanagan Headshot"}
          className={Style.image} />
      )}
      <FrameHolder className={className} />
    </div>
  );
}


export { Photo };
