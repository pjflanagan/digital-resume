import React from "react";

import './style.scss'

const randomPosition = () => {
  const top = -40 + Math.random() * 50;
  const left = -40 + Math.random() * 80;
  const deg = Math.random() * 359;
  return {
    top, left, deg
  }
}

class BillCypher extends React.Component {
  constructor(props) {
    super(props);
    this.state = randomPosition();

    this.changePosition = this.changePosition.bind(this);
  }


  componentDidMount() {
    setInterval(this.changePosition, 2800);
  }

  changePosition() {
    this.setState(randomPosition())
  }

  render() {
    const { top, left, deg } = this.state;
    return (
      <div id="bill" style={{
        margin: `${top}% ${left}%`,
        transform: `rotate(${deg}deg)`
      }}>
        <div className="bill-body">
          <div className="hat"></div>
          <div className="triangle top-left"></div>
          <div className="triangle top-right"></div>
          <div className="triangle bottom-left-top"></div>
          <div className="triangle bottom-left-bottom"></div>
          <div className="triangle bottom-right-top"></div>
          <div className="triangle bottom-right-bottom"></div>
          <div className="rotater">
            <div className="eye"></div>
          </div>
          <div className="arm arm-left"></div>
          <div className="arm arm-right"></div>
          <div className="legs"></div>
        </div>
      </div>
    );
  }
}

export { BillCypher };
