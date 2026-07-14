import React from "react";

// Structural HTML only — page metadata lives in src/components/Seo.tsx via
// Gatsby's Head export API. This file exists to keep the custom viewport tag
// (user-scalable=0), which can't be set through the Head API.

type HTMLProps = {
  htmlAttributes: object;
  headComponents: React.ReactNode[];
  bodyAttributes: object;
  preBodyComponents: React.ReactNode[];
  body: string;
  postBodyComponents: React.ReactNode[];
};

export default function HTML(props: HTMLProps) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
        />
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
