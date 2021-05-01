import React from "react";

import {
  CurveTopTop,
  CurveTopBottom,
  CurveBottomTop,
  CurveBottomBottom,
} from "./curves";
import { Photo } from "./photo";
import { Body } from "./body";

import Style from "./style.module.scss";

class SlidePersonal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: 'personal-photo.jpg'
    }

    this.changePhoto = this.changePhoto.bind(this);
  }

  changePhoto(photo) {
    this.setState({ photo });
  }

  render() {
    const { data } = this.props;
    const { photo } = this.state;
    return (
      <div className={Style.slidePersonal}>
        <CurveTopTop />
        <CurveTopBottom />
        <div className={Style.slidePersonalSideLeft}>
          <Photo photo={photo} data={data} />
        </div>
        <div className={Style.slidePersonalSideRight}>
          <Body photoLinkCallback={(newPhoto) => this.changePhoto(newPhoto)} />
        </div>
        <CurveBottomTop />
        <CurveBottomBottom />
      </div>
    );
  }
}

export { SlidePersonal };
