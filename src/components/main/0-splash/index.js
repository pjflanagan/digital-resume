import React from "react";
import * as Scroll from "react-scroll";

import { Canvas, LabeledButton, TextPageCenter } from "../../../elements";
import { Main } from "../../../content";

import { View } from "./view";
import Style from "./style.module.scss";

const scroller = Scroll.scroller;

// SlideSplash

class SlideSplash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scroll: 0,
    };

    this.elems = {
      prompt: Main.splash.prompts[0] // Math.floor(Math.random() * Main.splash.prompts.length)
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.clickToScroll = this.clickToScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(e) {
    this.setState({
      scroll: window.scrollY,
    });
  }

  clickToScroll() {
    scroller.scrollTo("slides", {
      duration: 1500,
      smooth: true,
      offset: -64, // Scrolls to element + 50 pixels down the page
    });
  }

  render() {
    const { scroll } = this.state;
    const textScroll = -scroll / 5;
    const canvasScroll = scroll / 2;
    const opacity = 1.0 - scroll / 1000.0;
    return (
      <div className={Style.splash}>
        <TextPageCenter
          className={Style.titleContainer}
          style={{
            transform: `translateY(${textScroll}px)`,
          }}
          headline={Main.splash.title}
          blurb={Main.splash.subtitle}
        />
        <div
          className={Style.buttonHolder}
          style={{ filter: `opacity(${opacity})` }}
        >
          <LabeledButton
            icon="down-arrow"
            trackerLabel="Splash.clickToScroll"
            onClick={this.clickToScroll}
          >
            {this.elems.prompt}
          </LabeledButton>
        </div>
        <Canvas
          className={Style.canvas}
          view={View}
          style={{
            transform: `translateY(${canvasScroll}px)`,
          }}
        />
      </div>
    );
  }
}

export { SlideSplash };
