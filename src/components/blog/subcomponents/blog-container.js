

import * as React from "react";
import classNames from "classnames";

import { Cover, Header, HeaderLink } from 'src/elements';

import { HeaderImage } from "./post-header-image";

import * as Style from './style.module.scss';

const BlogContainer = ({
  children,
  image,
}) => {

  const className = classNames(Style.blogContainer, {
    [Style.containerNoImage]: !image,
  });

  return (
    <>
      <Cover />
      <Header className={Style.blogHeader}>
        <HeaderLink href="/">Resume</HeaderLink>
        <HeaderLink samePage href="/blog">Blog</HeaderLink>
      </Header>
      {
        image && <HeaderImage src={image} />
      }
      <div className={className}>
        <div className={Style.blogContainerBack}>
          <div className={Style.blogContent}>
            {children}
          </div>
        </div>
      </div>
      <div className={Style.blogFooter}>
        Footer
      </div>
      {/* TODO: blog general footer */}
    </>
  );
}

export { BlogContainer };
