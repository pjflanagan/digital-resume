import React from "react";
import { OutboundLink } from "gatsby-plugin-google-analytics";

import Style from "./style.module.scss";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div>
        Icons made by{" "}
        <OutboundLink
          href="https://www.flaticon.com/authors/smashicons"
          title="Smashicons"
        >
          Smashicons
        </OutboundLink>{" "}
        from{" "}
        <OutboundLink href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </OutboundLink>
      </div>
      <div>
        Icons made by{" "}
        <OutboundLink
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
        >
          Freepik
        </OutboundLink>{" "}
        from{" "}
        <OutboundLink href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </OutboundLink>
      </div>
      <div>
        Icons made by{" "}
        <OutboundLink
          href="https://www.flaticon.com/authors/pixel-perfect"
          title="Pixel perfect"
        >
          Pixel perfect
        </OutboundLink>{" "}
        from{" "}
        <OutboundLink
          href="https://www.flaticon.com/"
          title="Flaticon"
        ></OutboundLink>
      </div>
    </div>
  );
};

export { Footer };
