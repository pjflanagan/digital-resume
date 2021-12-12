import React from "react";

import { BlogContainer, BlogListItem } from "./subcomponents";

const BlogComponent = ({ posts }) => {
  return (
    <BlogContainer>
      {
        // TODO: when there are enough posts, make this a three column page...
        posts.map((post) => (
          <BlogListItem key={post.id} post={post} />
        ))
      }
    </BlogContainer>
  );
}

export { BlogComponent };
