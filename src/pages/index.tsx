import * as React from "react";
import { graphql, PageProps } from "gatsby";

import "src/theme/theme.scss";

import { BioComponent } from "src/components/bio/Bio";
import type { ImageQueryData } from "src/content";

const PageIndex = ({ data }: PageProps<ImageQueryData>) => {
  return <BioComponent data={data} />;
}

export default PageIndex;

export const query = graphql`query ImageQuery {
  allFile(
    filter: {extension: {regex: "/(jpg)|(png)/"}, sourceInstanceName: {eq: "bio"}}
  ) {
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
