import React from "react";
import { Link } from 'gatsby';

import { FrontMatter } from "./post-frontmatter";
import * as Style from './style.module.scss';

const BlogListItem = ({ post }) => {
  const { frontmatter } = post;
  return (
    <div className={Style.blogListItemHolder}>
      <Link to={`/blog/${frontmatter.slug}`}>
        <div className={Style.blogListItem}>
          {frontmatter.image && <div className={Style.image} style={{
            backgroundImage: `url(${frontmatter.image})`
          }} />}
          <FrontMatter frontmatter={frontmatter} />
        </div>
      </Link>
    </div>
  );
}

export { BlogListItem };
