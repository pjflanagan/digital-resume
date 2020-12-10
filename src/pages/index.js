import * as React from "react";
import "./style.css";
import { SlideSplash, SlidePersonal } from "./slides";

// markup
const IndexPage = () => {
  return (
    <div>
      <SlideSplash />
      <SlidePersonal />
    </div>
  );
};

export default IndexPage;
