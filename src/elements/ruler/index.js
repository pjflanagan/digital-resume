import React from "react";
import Style from "./style.module.scss";

const Ruler = (props) => (
  <div className={Style.rulerHolder}>
    <div className={`${Style.ruler} ${props.className}`}>
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
