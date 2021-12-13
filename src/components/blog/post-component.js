

import * as React from "react";

import { LabeledButton } from 'src/elements';

import { BlogContainer, FrontMatter } from "./subcomponents";
import * as Style from './style.module.scss';

const PostComponent = ({
  children,
  frontmatter,
}) => {
  return (
    <BlogContainer image={frontmatter.image}>
      <FrontMatter frontmatter={frontmatter} />
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
    </BlogContainer>
  );
}

export { PostComponent };
