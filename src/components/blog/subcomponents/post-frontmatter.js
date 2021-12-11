

import * as React from "react";

import { TextAccent, TextHeading } from 'src/elements';

const FrontMatter = ({
  frontmatter,
}) => {
  return (
    <>
      <TextHeading>{frontmatter.title}</TextHeading>
      <TextAccent>{frontmatter.date}</TextAccent>
    </>
  );
}

export { FrontMatter };
