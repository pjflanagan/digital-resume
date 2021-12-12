import * as React from "react";
import { graphql } from "gatsby";

import { BioComponent } from "src/components/bio";

import "src/theme/theme.scss";

const PageIndex = ({ data }) => {
  return <BioComponent data={data} />;
}

export default PageIndex;

export const query = graphql`query ImageQuery {
  allFile(filter: {extension: {regex: "/(jpg)|(png)/"}}) {
    edges {
      node {
        base
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
    }
  }
}
`;
