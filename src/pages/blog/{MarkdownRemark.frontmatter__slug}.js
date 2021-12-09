import React from "react";
import { graphql } from "gatsby";
// TODO: Helemet for social media share images and other stuff

import "../reset.scss";
import "../style.scss";

import { PostComponent } from 'src/components/blog';

const PagePost = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <PostComponent frontmatter={frontmatter}>
      {/* 
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
         */}
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
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`