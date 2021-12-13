import * as React from "react";
import { graphql } from "gatsby";

import { BlogComponent } from "src/components/blog";

import "src/theme/theme.scss";

// NOTE: the blog is meant to be prose form stories about projects detailing
// why I wanted to make it, how I envisioned it, what technology I used 
// and challenges I overcame. While this might contain some information
// about how to use it, it is not a developer guide

// Out of scope
// - Detailed guide for installation or how to run
// - How to run tests, unless that is part of the technical story
// - DB Schema, unless that is part of the technical story
// - Links to build progress

const PageBlog = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  const posts = edges
    .filter(post => post.node.frontmatter.title.length > 0)
    .map(({ node }) => node);
  return <BlogComponent posts={posts} />;
}

export default PageBlog;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            slug
            date(formatString: "MMMM DD, YYYY")
            title
            image
            blurb
            github
            website
          }
        }
      }
    }
  }
`