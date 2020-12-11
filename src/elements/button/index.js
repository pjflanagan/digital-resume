import React from "React";

import { Icon } from "../icon";

import Links from "./links.json";
import './style.scss'

const RoundButton = (props) => {
  const { name } = props;
  const linkID = name.toLowerCase();
  return (
    <a target="_blank" href={Links[linkID]}>
      <Icon icon={linkID}></Icon>
    </a>
  );
};

const LabeledButton = (props) => {
  const { name } = props;
  const linkID = name.toLowerCase();
  console.log(Links);
  return (
    <a className="labeled-button" target="_blank" href={Links[linkID]}>
      <Icon icon={linkID}></Icon>
      <div class="name">{name}</div>
    </a>
  );
};

export { RoundButton, LabeledButton };
