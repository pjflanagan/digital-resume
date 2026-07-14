import classNames from "classnames";
import React, { useState } from "react";

import { LabeledButton } from "src/elements";

import * as Style from "./ShowMore.module.scss";

type ShowMoreProps = {
  children?: React.ReactNode;
};

const ShowMore = ({ children }: ShowMoreProps) => {

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
        >
          {'Show more'}
        </LabeledButton>
      </div>
    </div>
  );
}

export { ShowMore };
