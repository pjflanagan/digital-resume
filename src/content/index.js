
import Bio from './bio';

const FindImage = ({ data: { allFile: { edges } }, image }) => {
  const imageEdge = edges.find(({ node }) => node.base === image);
  if (!imageEdge) {
    console.error(`No image found for ${image}. Try checking the name and dragging it in and out of the folder to reset Gatsby.`);
    return;
  }
  return imageEdge.node;
}

export { FindImage, Bio };