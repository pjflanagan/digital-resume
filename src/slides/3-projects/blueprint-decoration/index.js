import React from "react";
import { Reveal } from "../../../elements";
import Style from "./style.module.scss";

class BlueprintDecoration extends Reveal {
  render() {
    const { num, invention } = this.props;
    const className = this.state.isRevealed ? "" : Style.hidden;
    return (
      <div
        ref={this.ref}
        className={`
          ${Style.slideProjectsDecoration}
          ${Style.blueprint}
          ${Style[`decoration${num}`]}
          ${className}
        `}
      >
        {invention}
      </div>
    );
  }
}

export { BlueprintDecoration };
