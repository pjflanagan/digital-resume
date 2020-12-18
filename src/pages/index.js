import * as React from "react";
import { graphql } from "gatsby";
import * as Scroll from 'react-scroll';

import {
  SlideSplash,
  SlidePersonal,
  SlideExperience,
  SlideProjects,
  SlideContact,
} from "../slides";
import { Cover } from "../elements";

import "./style.scss";
import "./reset.scss";

const ScrollSlides = Scroll.Element;

// markup
class PageIndex extends React.Component {
  render() {
    // TODO: all data should come through graphql
    const { data } = this.props;
    return (
      <div className="container">
        <Cover />
        <SlideSplash />
        <ScrollSlides className="slides" name="slides">
          <SlidePersonal data={data} />
          <SlideExperience data={data} />
          <SlideProjects data={data} />
          <SlideContact data={data} />
        </ScrollSlides>
      </div>
    );
  }
}

export default PageIndex;

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
