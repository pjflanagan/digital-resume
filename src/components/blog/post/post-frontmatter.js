

import * as React from "react";

import { TextAccent, TextHeading } from 'src/elements';

import * as Style from '../style.module.scss';

const PostFrontmatterComponent = ({
  frontmatter,
}) => {
  return (
    <div className={Style.postFrontmatter}>
      <TextHeading>{frontmatter.title}</TextHeading>
      <TextAccent>{frontmatter.date}</TextAccent>
    </div>
  );
}

export { PostFrontmatterComponent };
