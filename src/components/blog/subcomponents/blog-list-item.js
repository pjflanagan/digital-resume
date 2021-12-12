import React from "react";
import { Link } from 'gatsby';

import { FrontMatter } from "./post-frontmatter";
import * as Style from './style.module.scss';

const BlogListItem = ({ post }) => {
  return (
    <div className={Style.blogListItemHolder}>
      <Link to={`/blog/${post.frontmatter.slug}`}>
        <div className={Style.blogListItem}>
          {post.frontmatter.image && <div className={Style.image} style={{
            backgroundImage: `url(${post.frontmatter.image})`
          }} />}
          <FrontMatter
            frontmatter={post.frontmatter}
          />
        </div>
      </Link>
    </div>
  );
}

export { BlogListItem };
