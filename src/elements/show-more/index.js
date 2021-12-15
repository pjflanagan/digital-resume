import classNames from "classnames";
import React, { useState } from "react";

import { LabeledButton } from "src/elements";

import * as Style from "./style.module.scss";

const ShowMore = ({ children, trackerLabel }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const className = classNames(Style.showMore, {
    [Style.open]: isOpen
  });

  return (
    <div className={className}>
      <div className={Style.contentHolder}>{children}</div>
      <div className={Style.buttonHolder}>
        <LabeledButton
          onClick={toggle}
          icon="plus"
          trackerLabel={trackerLabel}
        >
          {'Show more'}
        </LabeledButton>
      </div>
    </div>
  );
}

export { ShowMore };
