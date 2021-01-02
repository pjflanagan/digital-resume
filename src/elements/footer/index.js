import React from "react";

import FooterText from "../../content/footer.json";

import { Text } from "../text";
import Style from "./style.module.scss";

const Footer = () => {
  return (
    <div className={Style.footer}>
      {FooterText.map((linkText, i) => (
        <div className={Style.textHolder} key={i} links={linkText.links}>
          <Text>{linkText.text}</Text>
        </div>
      ))}
    </div>
  );
};

export { Footer };
