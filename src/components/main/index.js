import React from "react";
import * as Scroll from "react-scroll";

import { Cover, Footer, LoadingCover } from "../../elements";

import { SlideSplash } from "./0-splash";
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
    }, 1000);
  }

	render() {
    const { data } = this.props;
    const { isLoading } = this.state;
		return (
			<div className="container">
        <LoadingCover isLoading={isLoading} />
				<Cover />
				<SlideSplash />
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
