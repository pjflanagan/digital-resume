import React from "react";

import { Canvas } from "../../elements";

import { View } from "./view";
import Styles from "./style.module.scss";

// SlideSplash

class SlideSplash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scroll: 0,
    };

    this.handleScroll = this.handleScroll.bind(this);
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

  render() {
    const { scroll } = this.state;
    const textScroll = -scroll / 6;
    const canvasScroll = scroll / 2;
    return (
      <div className={Styles.splash}>
        <div
          className={Styles.titleContainer}
          style={{
            transform: `translateY(${textScroll}px)`,
          }}
        >
          <div className={Styles.name}>Peter James Flanagan</div>
          <div className={Styles.description}>
            Circuit-navigating Cyberspace
          </div>
        </div>
        <Canvas
          className={Styles.canvas}
          view={new View()}
          style={{
            transform: `translateY(${canvasScroll}px)`,
          }}
        />
      </div>
    );
  }
}

export { SlideSplash };
