import React from "react";
import * as Scroll from "react-scroll";

import { Cover, Footer } from "../../elements";

import { SlideSplash } from "./0-splash";
import { SlidePersonal } from "./1-personal";
import { SlideExperience } from "./2-experience";
import { SlideProjects } from "./3-projects";
import { SlideContact } from "./4-contact";
import "./style.scss";

const ScrollMain = Scroll.Element;

// markup
class MainComponent extends React.Component {
	render() {
		const { data } = this.props;
		return (
			<div className="container">
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
