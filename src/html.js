import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
  const description = "Peter James Flanagan | Full-stack Web Developer";
  const author = "Peter James Flanagan";
  const handle = "@peterjflan";
  const root = "https://pjflanagan.me";
  const img = `${root}/img/social.png`;
  const fav = `${root}/img/icon/favicon.png`;

  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
        />

        <link rel="favicon" src={fav} />

        {/* TODO: this could be moved to a <Helmet> object to have it vary by page */}
        <title>{author}</title>

        {/* Social */}
        <meta name="description" content={description} />
        <meta name="author" content={author} />

        {/* Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={author} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={root} />
        <meta property="og:image" content={img} />
        <meta property="og:image:secure_url" content={img} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={author} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={img} />
        <meta name="twitter:site" content={handle} />

        {/* iOS */}
        {[57, 72, 114, 144].map((size) => (
          <link
            rel="apple-touch-icon"
            sizes={`${size}x${size}`}
            href={`/img/icon/icon-${size}.png`}
          />
        ))}

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
