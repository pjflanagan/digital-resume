import React from "react";
import Style from './style.module.scss'

const Ruler = () => (
  <div className={Style.ruler}>
    {
      [...Array(10)].map((e, i) => (
        <div className={Style.cm}>
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
      ))
    }
    <div className={Style.cm}></div>
  </div>
);

export { Ruler };
