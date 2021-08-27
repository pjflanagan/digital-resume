import React, { useState } from "react";

import { LabeledButton } from "src/elements";

import Style from "./style.module.scss";

const ShowMore = ({ children, trackerLabel }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  const className = isOpen ? Style.open : "";

  return (
    <div className={`${Style.showMore} ${className}`}>
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
