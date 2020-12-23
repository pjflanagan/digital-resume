import React from "react";

import Style from "./style.module.scss";
import { Text, TextInlineLink } from "../text";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.textHolder}>
        <Text>
          Website by Peter James Flanagan, available on{" "}
          <TextInlineLink href="https://github.com/pjflanagan/digital-resume">
            Github
          </TextInlineLink>
          .
        </Text>
      </div>
      <div className={Style.textHolder}>
        <Text>
          Icons by{" "}
          <TextInlineLink href="https://www.flaticon.com/authors/pixel-perfect">
            Pixel Perfect
          </TextInlineLink>
          {", "}
          <TextInlineLink href="https://www.flaticon.com/authors/freepik">
            Freepik
          </TextInlineLink>
          {" and "}
          <TextInlineLink href="https://www.flaticon.com/authors/smashicons">
            Smashicons
          </TextInlineLink>{" "}
          from{" "}
          <TextInlineLink href="https://www.flaticon.com/">
            Flaticon
          </TextInlineLink>
          .
        </Text>
      </div>
    </div>
  );
};

export { Footer };
