import React from 'react'

import Style from './style.module.scss'

// TODO: rename TextAccent
const AccentText = (props) => {
  return (
    <p className={`${Style.accentText} ${props.className}`} style={props.style}>
      { props.children }
    </p>
  );
}

// TextHeading
const Heading = (props) => {
  return (
    <h1>
      { props.children }
    </h1>
  );
}

// TODO: TextSubHeading

// TextInlineLink
const InlineLink = (props) => {
  return (
    <a
      className={Style.inlineLink}
      href={props.href}
      target="_blank"
      rel="noreferrer"
    >
      { props.children }
    </a>
  )
}

export { AccentText, InlineLink, Heading }