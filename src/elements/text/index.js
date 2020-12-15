import React from 'react'

import Style from './style.module.scss'

const AccentText = (props) => {
  return (
    <p className={`${Style.accentText} ${props.className}`} style={props.style}>
      { props.children }
    </p>
  );
}

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

export { AccentText, InlineLink }