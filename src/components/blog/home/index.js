import React from "react";
import { Link } from 'gatsby';

import {
  TextTitle,
  Text,
  TextAccent
} from 'src/elements'

import { BlogContainer } from "../container";

import * as Style from './style.module.scss';

const BlogComponent = ({ posts }) => {
  return (
    <BlogContainer>
      <div className={Style.blogContent}>
        {
          posts.map(({ id, frontmatter }) => (
            <div className={Style.blogListItemHolder} key={id}>
              <Link to={`/blog/${frontmatter.slug}`}>
                <div className={Style.blogListItem}>
                  {
                    frontmatter.image && <div className={Style.image} style={{
                      backgroundImage: `url(${frontmatter.image})`
                    }} />
                  }
                  <TextTitle>{frontmatter.title}</TextTitle>
                  {
                    frontmatter.blurb && <Text>{frontmatter.blurb}</Text>
                  }
                  <TextAccent>{frontmatter.date}</TextAccent>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </BlogContainer>
  );
}

export { BlogComponent };
