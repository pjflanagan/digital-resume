

import * as React from "react";

import {
  LabeledButton,
  TextTitle,
  Text,
  TextAccent,
} from 'src/elements';

import { BlogContainer } from "../container";
import * as Style from './style.module.scss';

const PostComponent = ({
  children,
  frontmatter,
}) => {
  return (
    <BlogContainer image={frontmatter.image}>
      <div className={Style.postContent}>
        <TextTitle>{frontmatter.title}</TextTitle>
        {frontmatter.blurb && <Text>{frontmatter.blurb}</Text>}
        <TextAccent>{frontmatter.date}</TextAccent>
        {
          (frontmatter.github || frontmatter.website) &&
          <div className={Style.frontmatterLinkHolder}>
            {
              frontmatter.github && <LabeledButton
                className={Style.button}
                icon="github"
                href={frontmatter.github}
              >Github</LabeledButton>
            }
            {
              frontmatter.website && <LabeledButton
                className={Style.button}
                icon="saturn"
                href={frontmatter.website}
              >Website</LabeledButton>
            }
          </div>
        }
        {children}
      </div>
    </BlogContainer>
  );
}

export { PostComponent };
