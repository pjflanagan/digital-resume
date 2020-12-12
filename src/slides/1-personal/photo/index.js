import React from "react";

import { BillCypher } from "./bill-cypher";
import { FrameHolder, Reveal } from "../../../elements";
import Style from "./style.module.scss";

const FRAME_STYLE = {
  position: "relative",
  width: "80%",
  height: "80%",
  left: "10%",
  top: "10%",
}

class Photo extends Reveal {
  render() {
    const className = this.state.isRevealed ? '' : Style.hidden;
    return (
      <div className={`${Style.personalPhoto} ${className}`} ref={this.ref}>
        <BillCypher />
        <FrameHolder style={FRAME_STYLE} />
      </div>
    );
  }
}

export { Photo };
