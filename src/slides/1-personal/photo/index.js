import React from "react";

import { BillCypher } from "./bill-cypher";
import { FrameHolder, Reveal } from "../../../elements";
import "./style.scss";

const FRAME_STYLE = {
  position: "relative",
  width: "80%",
  height: "80%",
  left: "10%",
  top: "10%",
}

class Photo extends Reveal {
  render() {
    const className = this.state.isRevealed ? "" : "hidden";
    return (
      <div className={`personal-photo ${className}`} ref={this.ref}>
        <BillCypher />
        <FrameHolder style={FRAME_STYLE} />
      </div>
    );
  }
}

export { Photo };
