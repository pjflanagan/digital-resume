import * as React from "react";
import { graphql } from "gatsby";

import { MainComponent } from "src/components/main";

import "./reset.scss";
import "./style.scss";

const PageIndex = ({ data }) => {
  return <MainComponent data={data} />;
}

export default PageIndex;

export const query = graphql`
  query ImageQuery {
    allFile(filter: { extension: { regex: "/(jpg)|(png)/" } }) {
      edges {
        node {
          base
          childImageSharp {
            fluid {
              aspectRatio
              base64
              sizes
              src
              srcSet
            }
          }
        }
      }
    }
  }
`;
