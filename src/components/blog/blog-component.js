import React from "react";

import { BlogContainer, BlogListItem } from "./subcomponents";

const BlogComponent = ({ posts }) => {
  return (
    <BlogContainer>
      {
        posts.map((post) => (
          <BlogListItem key={post.id} post={post} />
        ))
      }
    </BlogContainer>
  );
}

export { BlogComponent };
