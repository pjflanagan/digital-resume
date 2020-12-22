import React from "react";

import {
  TextAccent,
  TextHeading,
  TextInlineLink,
  Text,
} from "../../../elements";
import { Links, Slides } from "../../../data";

import Style from "./style.module.scss";

const Body = ({ photoLinkCallback }) => (
  <div className={Style.body}>
    <TextAccent>{Slides.personal.accent}</TextAccent>
    <TextHeading>
      <span
        role="button"
        tabIndex={0}
        onMouseOver={() => photoLinkCallback("personal-photo.jpg")}
        onFocus={() => photoLinkCallback("personal-photo.jpg")}
      >
        {Slides.personal.title}
      </span>
    </TextHeading>
    {/* TODO: parse bio */}
    <Text className={Style.bio}>
      I'm a full-stack software engineer living in New York. I fell in love with
      web development at a young age and have been playing with it ever since. I
      enjoy making useful, deliberatley designed, and fun web tools.
    </Text>
    <Text className={`${Style.bio} ${Style.additional}`}>
      Outside of coding, I'm an avid{" "}
      <TextInlineLink
        href={Links.rollerblade}
        onMouseOver={() => photoLinkCallback("personal-roller-blade.jpg")}
        onFocus={() => photoLinkCallback("personal-roller-blade.jpg")}
      >
        rollerblader
      </TextInlineLink>
      , a novice{" "}
      <TextInlineLink
        onMouseOver={() => photoLinkCallback("personal-rock-climbing.jpg")}
        onFocus={() => photoLinkCallback("personal-rock-climbing.jpg")}
      >
        rock climber
      </TextInlineLink>
      , and an eager Mandarin student.
    </Text>
  </div>
);

export { Body };
