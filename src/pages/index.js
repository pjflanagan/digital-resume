import * as React from "react";
import { graphql } from "gatsby";
import * as Scroll from "react-scroll";

import {
  SlideSplash,
  SlidePersonal,
  SlideExperience,
  SlideProjects,
  SlideContact,
} from "../components/main";
import { Cover, Footer } from "../elements";

import "./reset.scss";
import "./style.scss";

const ScrollMain = Scroll.Element;

// markup
class PageIndex extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div className="container">
        <Cover />
        <SlideSplash />
        <ScrollMain className="slides" name="slides">
          <SlidePersonal data={data} />
          <SlideExperience data={data} />
          <SlideProjects data={data} />
          <SlideContact data={data} />
          <Footer />
        </ScrollMain>
      </div>
    );
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
