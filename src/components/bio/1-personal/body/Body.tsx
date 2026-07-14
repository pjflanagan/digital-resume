import { useState } from "react";

import {
  TextAccent,
  TextTitle,
  Text,
  TextType,
  ParseTextForLinks,
} from "src/elements";
import { Bio } from "src/content";

import * as Style from "./Body.module.scss";

type BodyProps = {
  photoLinkCallback: (photo: string) => void;
};

const Body = ({ photoLinkCallback }: BodyProps) => {

  const [language, setLanguage] = useState<'english' | 'mandarin'>('english');

  const linkHover = (actions?: { action: string; param: string }[]) => {
    actions?.forEach(({ action, param }) => (
      {
        image: () => photoLinkCallback(param),
        text: () => setLanguage(param as 'english' | 'mandarin'),
      }[action as 'image' | 'text']()
    ));
  }

  const { accent, link_text, title_text } = Bio.personal;
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
      <TextTitle>
        {ParseTextForLinks(title_text.text, title_text.links, linkHover)}
      </TextTitle>
      <Text links={link_text.links}>
        {link_text.text[0]}
      </Text>
      <Text
        className={Style.bioAdditional}
        links={link_text.links}
        callback={linkHover}
      >
        {link_text.text[1]}
      </Text>
    </div>
  );
}

export { Body };
