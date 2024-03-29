import * as React from "react";

import { LabeledButton, Canvas, Cover, TextPageCenter } from "src/elements";
import Data404 from "src/content/404";

import { View } from "./view";
import * as Style from "./style.module.scss";

const Page404Component = () => {
  return (
    <div className={Style.content}>
      <Cover />
      <TextPageCenter
        className={Style.titleContainer}
        headline={Data404.title}
        blurb={Data404.subtitle}
      />
      <div className={`${Style.plane} ${Style.top}`} />
      <div className={`${Style.plane} ${Style.bottom}`} />
      <div className={Style.buttonHolder}>
        <LabeledButton icon="saturn" trackerLabel="404.goBack" href="/" sameWindow={true}>
          {Data404.prompt}
        </LabeledButton>
      </div>
      <Canvas className={Style.canvas} view={View} />
      {/* <Footer /> */}
    </div>
  );
}

export { Page404Component };
