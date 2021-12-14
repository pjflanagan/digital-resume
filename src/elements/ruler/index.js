import React from "react";
import classNames from "classnames";

import * as Style from "./style.module.scss";

const Ruler = ({
  className: classNameProp
}) => (
  <div className={Style.rulerHolder}>
    <div className={classNames(Style.ruler, {
      [classNameProp]: classNameProp
    })}>
      {[...Array(10)].map((e, i) => (
        <div className={Style.cm} key={i}>
          <div className={Style.mm}></div>
          <div className={Style.mm}></div>
          <div className={Style.mm}></div>
          <div className={Style.mm}></div>
          <div className={Style.mm}></div>
          <div className={Style.mm}></div>
          <div className={Style.mm}></div>
          <div className={Style.mm}></div>
          <div className={Style.mm}></div>
        </div>
      ))}
      <div className={Style.cm}></div>
    </div>
  </div>
);

export { Ruler };
