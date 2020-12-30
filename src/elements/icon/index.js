import React from "react";

import LINKEDIN_ICON from './linkedin';
import EMAIL_ICON from './email';
import GITHUB_ICON from './github';
import DOWN_ARROW_ICON from './down-arrow';
import MINUS_ICON from './minus';
import PLUS_ICON from './plus';
import SATURN_ICON from './saturn';


const SVGIcon = (props) => {
  const { icon } = props;
  switch (icon) {
    case "linkedin":
      return LINKEDIN_ICON;
    case "email":
      return EMAIL_ICON;
    case "github":
      return GITHUB_ICON;
    case "down-arrow":
      return DOWN_ARROW_ICON;
    case "minus":
      return MINUS_ICON;
    case "plus":
      return PLUS_ICON;
    case "saturn":
      return SATURN_ICON;
    default:
      return <span />;
  }
};

export { SVGIcon };
