import * as React from "react";
import "./style.scss";
import {
  SlideSplash,
  SlidePersonal,
  SlideExperience,
  SlideProjects,
  SlideContact,
} from "../slides";
import { Cover } from "../elements";
import { graphql } from "gatsby";

// markup
class IndexPage extends React.Component {
  render() {
    // TODO: all data should come through graphql
    const { data } = this.props;
    return (
      <div className="container">
        <Cover />
        <SlideSplash />
        <div className="slides">
          <SlidePersonal />
          <SlideExperience data={data} />
          <SlideProjects data={data} />
          <SlideContact data={data} />
        </div>
      </div>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query MyQuery {
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
