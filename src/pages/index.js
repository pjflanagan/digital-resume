import * as React from "react";
import { graphql } from "gatsby";

import { MainComponent } from "../components/main";

import "./reset.scss";
import "./style.scss";

class PageIndex extends React.Component {
  render() {
    const { data } = this.props;
    return <MainComponent data={data} />;
  }
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
