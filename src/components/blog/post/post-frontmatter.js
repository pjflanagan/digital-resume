

import * as React from "react";

import { TextAccent, TextHeading } from 'src/elements';

const PostFrontmatterComponent = ({
  frontmatter,
}) => {
  return (
    <>
      <TextHeading>{frontmatter.title}</TextHeading>
      <TextAccent>{frontmatter.date}</TextAccent>
    </>
  );
}

export { PostFrontmatterComponent };
