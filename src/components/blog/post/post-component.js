

import * as React from "react";

import { Cover } from 'src/elements';

import { PostFrontmatterComponent } from "./post-frontmatter";
import { PostHeaderImageComponent } from "./post-header-image";

import * as Style from '../style.module.scss';

const PostComponent = ({
  children,
  frontmatter,
}) => {
  return (
    <>
      <Cover />
      {/* TODO: blog general header */}
      <PostHeaderImageComponent src={frontmatter.image} />
      <div className={Style.blogContainer}>
        <div className={Style.blogContainerBack}>
          <div className={Style.blogContent}>
            <PostFrontmatterComponent frontmatter={frontmatter} />
            {children}
          </div>
        </div>
      </div>
      <div className={Style.blogFooter}>
        Footer
      </div>
      {/* TODO: blog general footer */}
    </>
  );
}

export { PostComponent };
