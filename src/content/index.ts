import type { IGatsbyImageData } from 'gatsby-plugin-image';

import Bio from './bio';

type ImageNode = {
  base: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
};

type ImageQueryData = {
  allFile: {
    edges: { node: ImageNode }[];
  };
};

type FindImageProps = {
  data: ImageQueryData;
  image: string;
};

const FindImage = ({
  data: {
    allFile: { edges },
  },
  image,
}: FindImageProps): ImageNode | undefined => {
  const imageEdge = edges.find(({ node }) => node.base === image);
  if (!imageEdge) {
    console.error(
      `No image found for ${image}. Try checking the name and dragging it in and out of the folder to reset Gatsby.`
    );
    return;
  }
  return imageEdge.node;
};

export { FindImage, Bio };
export type { ImageNode, ImageQueryData };
export * from './types';
