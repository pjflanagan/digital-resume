import React from "react";

import FooterText from "../../content/footer.json";

import { Text, ParseTextForLinks } from "../text";
import Style from "./style.module.scss";

const Footer = () => {
  return (
    <div className={Style.footer}>
      {FooterText.map((linkText, i) => (
        <div className={Style.textHolder} key={i}>
          <Text>{ParseTextForLinks(linkText.text, linkText.links)}</Text>
        </div>
      ))}
    </div>
  );
};

export { Footer };
