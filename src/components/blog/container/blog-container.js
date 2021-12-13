

import * as React from "react";
import classNames from "classnames";

import { Cover, Header, HeaderLink, Footer } from 'src/elements';

import { HeaderImage } from "./header-image";
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
        <HeaderLink href="/">Profile</HeaderLink>
        <HeaderLink samePage href="/blog">Blog</HeaderLink>
        <HeaderLink href="https://github.com/pjflanagan">Github</HeaderLink>
      </Header>
      {
        image && <HeaderImage src={image} />
      }
      <div className={className}>
        <div className={Style.blogContainerBack}>
          {children}
        </div>
      </div>
      <Footer className={Style.blogFooter} />
    </>
  );
}

export { BlogContainer };
