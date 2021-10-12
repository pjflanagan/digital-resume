import React from "react";
import PropTypes from "prop-types";

const DESCRIPTION = "Full-stack Web Developer";
const AUTHOR = "Peter James Flanagan";
const HANDLE = "@peterjflan";
const ROOT = "https://pjflanagan.me";
const IMG = `${ROOT}/img/social/social.png`;
const IMG_TW = `${ROOT}/img/social/social-tw.png`;
const FAVICON_32 = `${ROOT}/img/icon/favicon-32x32.png`;
const FAVICON_16 = `${ROOT}/img/icon/favicon-16x16.png`;

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
        />

        {/* TODO: this should be moved to a <Helmet> object to have it vary by page */}
        <title>{AUTHOR}</title>

        {/* Icon */}
        <link rel="icon" type="image/png" sizes="32x32" href={FAVICON_32} />
        <link rel="icon" type="image/png" sizes="16x16" href={FAVICON_16} />

        {/* Social */}
        <meta name="description" content={DESCRIPTION} />
        <meta name="author" content={AUTHOR} />
        <meta property="og:title" content={AUTHOR} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={ROOT} />
        <meta property="og:image" content={IMG} />

        {/* Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:image:secure_url" content={IMG} />

        {/* Twitter */}
        <meta name="twitter:title" content={AUTHOR} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={HANDLE} />
        <meta name="twitter:creator" content={HANDLE} />
        <meta name="twitter:image" content={IMG_TW} />

        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
