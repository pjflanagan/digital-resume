import React from "react";
import * as Scroll from "react-scroll";

import { Cover, Footer, Splash } from "../../elements";

import { SlideLanding } from "./0-landing";
import { SlidePersonal } from "./1-personal";
import { SlideExperience } from "./2-experience";
import { SlideProjects } from "./3-projects";
import { SlideContact } from "./4-contact";
import "./style.scss";

const ScrollMain = Scroll.Element;

class MainComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 400);
  }

  render() {
    const { data } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="container">
        <Splash isVisible={isLoading} />
        <Cover />
        <SlideLanding />
        <ScrollMain className="slides" name="slides">
          <SlidePersonal data={data} />
          <SlideExperience data={data} />
          <SlideProjects data={data} />
          <SlideContact data={data} />
          <Footer />
        </ScrollMain>
      </div>
    );
  }
}

export { MainComponent };
