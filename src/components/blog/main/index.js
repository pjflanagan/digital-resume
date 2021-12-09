

import React from "react";
import { Link } from 'gatsby';

import { PostFrontmatterComponent } from "../post";
import * as Style from '../style.module.scss';

const BlogComponent = ({ posts }) => {
  return (
    <div className={Style.blogContainer}>
      {/* TODO: blog general header */}
      {posts.map((post) => (
        <Link to={`/blog/${post.frontmatter.slug}`}>
          <PostFrontmatterComponent
            key={post.id}
            frontmatter={post.frontmatter}
          />
        </Link>
      ))}
      {/* TODO: blog general footer */}
    </div>
  );
}

export { BlogComponent };
