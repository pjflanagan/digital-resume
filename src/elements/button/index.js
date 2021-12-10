import React from "react";

import { CircleButtonAction, CircleButtonLinked } from './circle-button';
import { LabeledButtonAction, LabeledButtonLinked } from './labeled-button';

// TODO: button make width contain to prevent text wrap

const LabeledButton = (props) => {
  if (!!props.onClick) {
    return (
      // onClick icon trackerLabel
      <LabeledButtonAction {...props} />
    );
  }
  return (
    // icon, onMouseEnter, onMouseLeave, href, sameWindow
    <LabeledButtonLinked {...props} />
  );
};

const CircleButton = (props) => {
  if (!!props.onClick) {
    return (
      // onClick icon trackerLabel
      <CircleButtonAction {...props} />
    );
  }
  return (
    // icon, onMouseEnter, onMouseLeave, href, sameWindow
    <CircleButtonLinked {...props} />
  );
};

export { LabeledButton, CircleButton };
