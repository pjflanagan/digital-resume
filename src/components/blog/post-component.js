

import * as React from "react";

import { BlogContainer, FrontMatter } from "./subcomponents";

const PostComponent = ({
  children,
  frontmatter,
}) => {
  return (
    <BlogContainer image={frontmatter.image}>
      <FrontMatter frontmatter={frontmatter} />
      {children}
    </BlogContainer>
  );
}

export { PostComponent };
