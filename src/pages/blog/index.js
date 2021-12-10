import * as React from "react";
import { graphql } from "gatsby";

import { BlogComponent } from "src/components/blog";

import "src/theme/theme.scss";

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
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            image
          }
        }
      }
    }
  }
`