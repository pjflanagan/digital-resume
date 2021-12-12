

import * as React from "react";

import { TextAccent, TextHeading, Text } from 'src/elements';

const FrontMatter = ({
  frontmatter,
}) => {
  return (
    <>
      <TextHeading>{frontmatter.title}</TextHeading>
      {frontmatter.blurb && <Text>{frontmatter.blurb}</Text>}
      <TextAccent>{frontmatter.date}</TextAccent>
    </>
  );
}

export { FrontMatter };
