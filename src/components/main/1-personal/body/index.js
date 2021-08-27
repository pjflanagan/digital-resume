import React, { useState } from "react";

import {
  TextAccent,
  TextHeading,
  Text,
  TextType,
  ParseTextForLinks,
} from "src/elements";
import { Main } from "src/content";

import Style from "./style.module.scss";

const Body = ({ photoLinkCallback }) => {

  const [language, setLanguage] = useState('english');

  const linkHover = (actions) => {
    actions.forEach(({ action, param }) => {
      switch (action) {
        case "image":
          photoLinkCallback(param);
          break;
        case "text":
          setLanguage(param);
          break;
        default:
          break;
      }
    });
  }

  const { accent, link_text, title_text } = Main.personal;
  return (
    <div className={Style.body}>
      <TextAccent>
        {/* TODO: TextType should be a wrapper for <Text> rather than inside,
        then we can type through links and multiple elements, like Accent then Heading,
        ensure that ParseText returns items that can be wrapped by TypeText */}
        <TextType speed={120} revealed={true}>
          {accent[language]}
        </TextType>
      </TextAccent>
      <TextHeading>
        {ParseTextForLinks(title_text.text, title_text.links, linkHover)}
      </TextHeading>
      <Text className={Style.bio} links={link_text.links}>
        {link_text.text[0]}
      </Text>
      <Text
        className={`${Style.bio} ${Style.additional}`}
        links={link_text.links}
        callback={linkHover}
      >
        {link_text.text[1]}
      </Text>
    </div>
  );
}

export { Body };
