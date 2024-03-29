import React from "react";
import { graphql } from "gatsby";
// TODO: FIXME: TODO: FIXME: Helmet for social media share images and other stuff
// I think some of my stuff is getting to be worth me sharing, so lets make it shareable

import "src/theme/theme.scss";

import { PostComponent } from 'src/components/blog';

const PagePost = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <PostComponent frontmatter={frontmatter}>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </PostComponent>
  );
};

export default PagePost;

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        date(formatString: "MMMM YYYY")
        title
        image
        blurb
        github
        website
      }
    }
  }
`