

const FindImage = ({ data: { allFile: { edges }}, image }) => {
  return edges.find(({ node }) => node.base === image ).node;
}

export { FindImage }