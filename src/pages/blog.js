import * as React from "react";
import { graphql } from "gatsby";

import { BlogComponent } from "src/components/blog";

import "./reset.scss";
import "./style.scss";

const PageBlog = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  const posts = edges
    .filter(post => post.node.frontmatter.title.length > 0)
    .map(({ node: post }) => post);
  return <BlogComponent posts={posts} />;
  // <h2>{post.frontmatter.date}</h2>
  // <div className="blog-post-preview" key={post.id}>
  // <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link> // from gatsby
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
          }
        }
      }
    }
  }
`