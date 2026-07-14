import clsx from "clsx";

import { Text } from "src/elements";
import type { LinkText } from "src/content/types";

import * as Style from "./Footer.module.scss";

type FooterProps = {
  className?: string;
  text: LinkText[];
};

const Footer = ({
  className: classNameProp,
  text
}: FooterProps) => {
  const className = clsx(Style.footer, classNameProp);
  return (
    <div className={className}>
      {text.map((linkText, i) => (
        <div className={Style.textHolder} key={i}>
          <Text links={linkText.links}>{linkText.text as string}</Text>
        </div>
      ))}
    </div>
  );
};

export { Footer };
