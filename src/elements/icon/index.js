import React from "react";

import LINKEDIN_ICON from './linkedin';
import EMAIL_ICON from './email';
import GITHUB_ICON from './github';
import DOWN_ARROW_ICON from './down-arrow';
import MINUS_ICON from './minus';
import PLUS_ICON from './plus';
import SATURN_ICON from './saturn';
import SEND_ICON from './send';
import CHECK_ICON from './check';

const SVGIcon = ({ icon }) => (
  {
    linkedin: LINKEDIN_ICON,
    email: EMAIL_ICON,
    github: GITHUB_ICON,
    'down-arrow': DOWN_ARROW_ICON,
    minus: MINUS_ICON,
    plus: PLUS_ICON,
    saturn: SATURN_ICON,
    send: SEND_ICON,
    check: CHECK_ICON,
  }[icon] || <span />
);

export { SVGIcon };
