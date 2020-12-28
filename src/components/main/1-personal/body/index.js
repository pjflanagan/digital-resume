import React from "react";

import {
  TextAccent,
  TextHeading,
  Text,
  ParseTextForLinks,
} from "../../../../elements";
import { Main } from "../../../../content";

import Style from "./style.module.scss";

const Body = ({ photoLinkCallback }) => {
  const { accent, title, link_text } = Main.personal;
  return (
    <div className={Style.body}>
      <TextAccent>{accent}</TextAccent>
      <TextHeading>
        <span
          role="button"
          tabIndex={0}
          onMouseOver={() => photoLinkCallback("personal-photo.jpg")}
          onFocus={() => photoLinkCallback("personal-photo.jpg")}
        >
          {title}
        </span>
      </TextHeading>
      <Text className={Style.bio}>
        {ParseTextForLinks(link_text.text[0], link_text.links)}
      </Text>
      <Text className={`${Style.bio} ${Style.additional}`}>
        {ParseTextForLinks(
          link_text.text[1],
          link_text.links,
          photoLinkCallback
        )}
      </Text>
    </div>
  );
};
export { Body };
