

import React from "react";
import { Link } from 'gatsby';

import { BlogContainer, FrontMatter } from "./subcomponents";

const BlogComponent = ({ posts }) => {
  return (
    <BlogContainer>
      {posts.map((post) => (
        <Link to={`/blog/${post.frontmatter.slug}`}>
          <FrontMatter
            key={post.id}
            frontmatter={post.frontmatter}
          />
        </Link>
      ))}
    </BlogContainer>
  );
}

export { BlogComponent };
