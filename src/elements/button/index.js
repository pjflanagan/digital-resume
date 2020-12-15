import React from 'react';

import { SVGIcon } from "../icon";

import Links from "./links.json";
import Style from './style.module.scss'

const RoundButton = (props) => {
  const { name } = props;
  const linkID = name.toLowerCase();
  return (
    <a target="_blank" rel="noreferrer" href={Links[linkID]}>
      <SVGIcon icon={linkID} />
    </a>
  );
};

const LabeledButton = (props) => {
  const { name, onMouseEnter, onMouseLeave } = props;
  const linkID = name.toLowerCase();
  return (
    <div className={Style.labeledButton}>
      <a
        rel="noreferrer" target="_blank"
        href={Links[linkID]}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <SVGIcon icon={linkID} />
        <div className={Style.name}>{name}</div>
      </a>
    </div>
  );
};

export { RoundButton, LabeledButton };
