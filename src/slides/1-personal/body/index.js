import React from "react";

import {
  TextAccent,
  TextHeading,
  TextInlineLink,
  Text,
} from "../../../elements";

import Style from "./style.module.scss";

const Body = ({ photoLinkCallback }) => (
  <div className={Style.body}>
    <TextAccent>Hi, my name is</TextAccent>
    <TextHeading>
      <span
        onMouseOver={() => photoLinkCallback("personal-photo.jpg")}
        onFocus={() => photoLinkCallback("personal-photo.jpg")}
      >
        Peter James Flanagan
      </span>
    </TextHeading>
    <Text className={Style.bio}>
      I'm a full-stack software engineer living in New York. I fell in love with
      web development at a young age and have been having playing with it ever
      since. I enjoy making useful, deliberatley designed, and fun web tools.
    </Text>
    <Text className={`${Style.bio} ${Style.additional}`}>
      Outside of coding, I'm an avid{" "}
      <TextInlineLink
        href="//instagram.com/roller.babe"
        onMouseOver={() => photoLinkCallback("personal-roller-blade.jpg")}
        onFocus={() => photoLinkCallback("personal-roller-blade.jpg")}
      >
        rollerblader
      </TextInlineLink>
      , a novice{" "}
      <a
        onMouseOver={() => photoLinkCallback("personal-rock-climbing.jpg")}
        onFocus={() => photoLinkCallback("personal-rock-climbing.jpg")}
      >
        rock climber
      </a>
      , and an eager Mandarin student.
    </Text>
  </div>
);

export { Body };
