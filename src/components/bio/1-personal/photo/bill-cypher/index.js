import React from "react";

import * as Style from './style.module.scss'

const randomPosition = () => {
  const top = -40 + Math.random() * 50;
  const left = -40 + Math.random() * 80;
  const deg = Math.random() * 359;
  return {
    top, left, deg
  }
}

const randomInterval = () => Math.random() * 2800 + 2800;

class BillCypher extends React.Component {
  constructor(props) {
    super(props);
    this.state = randomPosition();

    this.changePosition = this.changePosition.bind(this);
  }


  componentDidMount() {
    this.changePosition();
  }

  changePosition() {
    this.setState(randomPosition());
    setTimeout(this.changePosition, randomInterval());
  }

  render() {
    const { top, left, deg } = this.state;
    return (
      <div className={Style.bill} style={{
        margin: `${top}% ${left}%`,
        transform: `rotate(${deg}deg)`
      }}>
        <div className={Style.billBody}>
          <div className={Style.hat}></div>
          <div className={`${Style.triangle} ${Style.topLeft}`}></div>
          <div className={`${Style.triangle} ${Style.topRight}`}></div>
          <div className={`${Style.triangle} ${Style.bottomLeftTop}`}></div>
          <div className={`${Style.triangle} ${Style.bottomLeftBottom}`}></div>
          <div className={`${Style.triangle} ${Style.bottomRightTop}`}></div>
          <div className={`${Style.triangle} ${Style.bottomRightBottom}`}></div>
          <div className={Style.rotater}>
            <div className={Style.eye}></div>
          </div>
          {/* <div className={`${Style.arm} ${Style.armLeft}`}></div>
          <div className={`${Style.arm} ${Style.armRight}`}></div> */}
          <div className={Style.legs}></div>
        </div>
      </div>
    );
  }
}

export { BillCypher };
