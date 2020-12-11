import React from 'react';

import { SVGIcon } from "../icon";

import Links from "./links.json";
import './style.scss'

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
  const { name } = props;
  const linkID = name.toLowerCase();
  console.log(Links);
  return (
    <a className="labeled-button" rel="noreferrer" target="_blank" href={Links[linkID]}>
      <SVGIcon icon={linkID} />
      <div class="name">{name}</div>
    </a>
  );
};

export { RoundButton, LabeledButton };
