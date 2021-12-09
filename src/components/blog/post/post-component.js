

import * as React from "react";

import { PostFrontmatterComponent } from "./post-frontmatter";

import * as Style from '../style.module.scss';

const PostComponent = ({
  children,
  frontmatter,
}) => {
  return (
    <div className={Style.blogContainer}>
      {/* TODO: blog general header */}
      <PostFrontmatterComponent frontmatter={frontmatter} />
      {children}
      {/* TODO: blog general footer */}
    </div>
  );
}

export { PostComponent };
