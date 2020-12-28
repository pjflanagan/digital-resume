import * as React from "react";

import { Canvas } from "../../elements";
import Data404 from "../../content/404";

import { View } from "./view";
import Style from "./style.scss";

class Page404Content extends React.Component {
  render() {
    return (
      <div className={Style.content}>
        <div className={Style.title}>{Data404.title}</div>
        <div className={`${Style.plane} ${Style.top}`} />
        <div className={`${Style.plane} ${Style.bottom}`} />
        <Canvas className={Style.canvas} view={View} />
      </div>
    );
  }
}

export { Page404Content };
